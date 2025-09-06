package com.elira.elira.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elira.elira.dto.OrderRequest;
import com.elira.elira.model.CartItem;
import com.elira.elira.model.Order;
import com.elira.elira.model.OrderItem;
import com.elira.elira.model.Product;
import com.elira.elira.model.User;
import com.elira.elira.repository.CartItemRepository;
import com.elira.elira.repository.OrderItemRepository;
import com.elira.elira.repository.OrderRepository;
import com.elira.elira.repository.ProductRepository;
import com.elira.elira.repository.UserRepository;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order createOrder(Long userId, OrderRequest orderRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Create order
        Order order = new Order();
        order.setOrderId("ELIRA-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setUser(user);
        order.setAddress(orderRequest.getAddress());
        order.setExpectedDeliveryDate(LocalDateTime.now().plusDays(7)); // 7 days from now

        // Calculate total
        BigDecimal subtotal = BigDecimal.ZERO;
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            BigDecimal itemPrice = product.getSalePrice(); // Use sale price if available
            BigDecimal itemTotal = itemPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            subtotal = subtotal.add(itemTotal);
        }

        // Apply discount if coupon is provided (simplified logic)
        BigDecimal discount = BigDecimal.ZERO;
        if ("SAVE10".equalsIgnoreCase(orderRequest.getCouponCode())) {
            discount = subtotal.multiply(BigDecimal.valueOf(0.1)); // 10% discount
        }

        BigDecimal extraFees = BigDecimal.valueOf(99); // Fixed extra fee
        BigDecimal tax = BigDecimal.valueOf(5); // Fixed tax
        BigDecimal total = subtotal.add(extraFees).add(tax).subtract(discount);

        order.setTotalAmount(total);
        order = orderRepository.save(order);

        // Create order items
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getProduct().getSalePrice());
            orderItem.setSelectedSize(cartItem.getSelectedSize());
            orderItemRepository.save(orderItem);
        }

        // Clear cart after successful order
        cartItemRepository.deleteByUser(user);

        return order;
    }

    public List<Order> getUserOrders(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Page<Order> getUserOrders(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByCreatedAtDesc(user, pageable);
    }

    public Order getOrderById(Long userId, String orderId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to order");
        }

        return order;
    }

    public Order updateOrderStatus(String orderId, Order.OrderStatus status) {
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepository.save(order);
    }
}