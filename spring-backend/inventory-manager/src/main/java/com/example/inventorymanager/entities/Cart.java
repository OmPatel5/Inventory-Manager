package com.example.inventorymanager.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Cart {

    @Id
    @GeneratedValue
    @Getter @Setter
    private Long cartId;

    @Column(name="PRODUCT_ID")
    @Getter
    @Setter
    private Long productId;

    @Column(name="PRODUCT_NAME")
    @Getter @Setter
    private String productName;


    @Column(name="COLOR")
    @Getter @Setter
    private String color;

    @Column(name="CATEGORY")
    @Getter @Setter
    private String category;

    @Column(name="PRICE")
    @Getter @Setter
    private double price;

    @Column(name="EMAIL")
    @Getter @Setter
    private String email;

    @Column(name="QUANTITY")
    @Getter @Setter
    private Integer quantity;


}
