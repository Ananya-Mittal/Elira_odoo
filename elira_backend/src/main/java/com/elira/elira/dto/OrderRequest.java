package com.elira.elira.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class OrderRequest {
    @NotBlank
    @Size(max = 500)
    private String address;

    private String couponCode;

    // Constructors
    public OrderRequest() {}

    public OrderRequest(String address) {
        this.address = address;
    }

    // Getters and Setters
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCouponCode() { return couponCode; }
    public void setCouponCode(String couponCode) { this.couponCode = couponCode; }
}