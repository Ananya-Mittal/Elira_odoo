package com.elira.elira.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CartItemRequest {
    @NotNull
    private Long productId;

    @NotNull
    @Min(1)
    private Integer quantity = 1;

    private String selectedSize;

    // Constructors
    public CartItemRequest() {}

    public CartItemRequest(Long productId, Integer quantity, String selectedSize) {
        this.productId = productId;
        this.quantity = quantity;
        this.selectedSize = selectedSize;
    }

    // Getters and Setters
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getSelectedSize() { return selectedSize; }
    public void setSelectedSize(String selectedSize) { this.selectedSize = selectedSize; }
}