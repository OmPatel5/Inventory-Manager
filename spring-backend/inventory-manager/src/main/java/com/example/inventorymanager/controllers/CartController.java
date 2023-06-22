package com.example.inventorymanager.controllers;


import com.example.inventorymanager.entities.Cart;
import com.example.inventorymanager.entities.Inventory;
import com.example.inventorymanager.repositories.CartRepository;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

class CartProduct {
    public int quantity;

}

class Email {
    public String email;
}
@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {
    private final CartRepository cartRepository;

    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }


    @GetMapping("/{email}")
    public Iterable<Cart> getAllProductsInCart(@PathVariable("email") String email) {
        return this.cartRepository.findAllItemsByEmail(email);
    }

    @GetMapping("/product/{id}/{email}")
    public Optional<Cart> getProductByIdAndEmail(@PathVariable("id") Long id, @PathVariable("email") String email) {
        return this.cartRepository.findByProductIdAndEmail(id, email);
    }

    @PostMapping("/addToCart/{quantity}")
    public Cart addToCart(@RequestBody Cart item) {

        if (item.getQuantity() < 0) {
            return item;
        }

        return this.cartRepository.save(item);
    }

    @PutMapping("/updateQuantity/{id}/{email}/{inventoryQuantity}")
    public Cart updateProductQuantity(@PathVariable("id") Long id, @PathVariable("email") String email, @PathVariable("inventoryQuantity") int inventoryQuantity, @RequestBody CartProduct product) {
        Optional<Cart> productToUpdateOptional = this.cartRepository.findByProductIdAndEmail(id, email);

        if (productToUpdateOptional.isEmpty()) {
            return null;
        }

        Cart productToUpdate = productToUpdateOptional.get();


        if (inventoryQuantity == 0) {
            return productToUpdate;
        }

        productToUpdate.setQuantity(product.quantity + 1);
        productToUpdate.setPrice(productToUpdate.getQuantity() * (productToUpdate.getPrice() / (productToUpdate.getQuantity() - 1)));

        return this.cartRepository.save(productToUpdate);
    }

    @DeleteMapping("/removeFromCart/{id}")
    public Cart removeFromCart(@PathVariable("id") Long id) {
        Optional<Cart> productToRemoveOptional = this.cartRepository.findById(id);

        if (productToRemoveOptional.isEmpty()) {
            return null;
        }

        Cart productToRemove = productToRemoveOptional.get();
        this.cartRepository.delete(productToRemove);
        return productToRemove;
    }

    @GetMapping("/total/{email}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Long total(@PathVariable("email") String email) {
        if (ObjectUtils.isEmpty(this.cartRepository.sumPriceByEmail(email))) {
            return 0L;
        }
        return this.cartRepository.sumPriceByEmail(email);

    }

    @GetMapping("/itemCount/{email}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Long itemCount(@PathVariable("email") String email) {
        if (ObjectUtils.isEmpty(this.cartRepository.sumQuantityByEmail(email))) {
            return 0L;
        }
        return this.cartRepository.sumQuantityByEmail(email);
    }

    @DeleteMapping("/deleteCart/{email}")
    public List<Cart> deleteByEmail(@PathVariable("email") String email) {
        return this.cartRepository.deleteByEmail(email);
    }





}
