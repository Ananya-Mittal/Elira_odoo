package com.elira.elira.service;

import com.elira.elira.dto.*;
import com.elira.elira.model.Seller;
import com.elira.elira.model.User;
import com.elira.elira.repository.SellerRepository;
import com.elira.elira.repository.UserRepository;
import com.elira.elira.security.JwtUtils;
import com.elira.elira.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SellerRepository sellerRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        return new JwtResponse(jwt,
                userPrincipal.getId(),
                userPrincipal.getEmail(),
                userPrincipal.getFirstName(),
                userPrincipal.getLastName(),
                userPrincipal.getAuthorities().iterator().next().getAuthority());
    }

    public ApiResponse registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ApiResponse(false, "Error: Email is already taken!");
        }

        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
            return new ApiResponse(false, "Error: Passwords do not match!");
        }

        if (!signUpRequest.getAgreeTerms()) {
            return new ApiResponse(false, "Error: You must agree to the terms and conditions!");
        }

        // Split name into first and last name
        String[] nameParts = signUpRequest.getName().trim().split("\\s+");
        String firstName = nameParts[0];
        String lastName = nameParts.length > 1 ? String.join(" ", java.util.Arrays.copyOfRange(nameParts, 1, nameParts.length)) : "";

        // Create new user
        User user = new User(firstName, lastName, signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        return new ApiResponse(true, "User registered successfully!");
    }

    public ApiResponse registerSeller(SellerSignupRequest signUpRequest) {
        if (sellerRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ApiResponse(false, "Error: Email is already taken!");
        }

        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
            return new ApiResponse(false, "Error: Passwords do not match!");
        }

        if (!signUpRequest.getAcceptTerms()) {
            return new ApiResponse(false, "Error: You must accept the terms and conditions!");
        }

        // Create new seller
        Seller seller = new Seller();
        seller.setBusinessName(signUpRequest.getBusinessName());
        seller.setFirstName(signUpRequest.getFirstName());
        seller.setLastName(signUpRequest.getLastName());
        seller.setEmail(signUpRequest.getEmail());
        seller.setPassword(encoder.encode(signUpRequest.getPassword()));
        seller.setPhone(signUpRequest.getPhone());
        seller.setBusinessType(signUpRequest.getBusinessType());

        sellerRepository.save(seller);

        return new ApiResponse(true, "Seller registered successfully!");
    }
}
