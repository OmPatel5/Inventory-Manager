package com.example.inventorymanager.controllers;


import com.example.inventorymanager.entities.Cart;
import com.example.inventorymanager.entities.Inventory;
import com.example.inventorymanager.repositories.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

class Quantity {
    public int quantity;
}

@RestController
@RequestMapping("/inventory")
@CrossOrigin
public class InventoryController {
    private final ProductRepository productRepository;

    public InventoryController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public Iterable<Inventory> getAllProducts() {
        return this.productRepository.findAllByOrderByProductNameAsc();
    }

    @PostMapping("/createProduct")
    public Inventory createNewProduct(@RequestBody Inventory product) {
        return this.productRepository.save(product);
    }

    @PutMapping("/updateQuantity/{id}")
    public Inventory updateInventory(@PathVariable("id") Long id, @RequestBody Quantity quantity) {
        Optional<Inventory> productToUpdateOptional = this.productRepository.findById(id);

        if (productToUpdateOptional.isEmpty()) {
            return null;
        }

        Inventory productToUpdate = productToUpdateOptional.get();

        if (quantity.quantity - 1 < 0) {
            return productToUpdate;
        }

        productToUpdate.setQuantity(quantity.quantity - 1);

        return this.productRepository.save(productToUpdate);
    }

    @PutMapping("/addQuantity/{id}")
    public Inventory addQuantityToProduct(@PathVariable("id") Long id, @RequestBody Quantity quantity) {
        Optional<Inventory> productToUpdateOptional = this.productRepository.findById(id);

        if (productToUpdateOptional.isEmpty()) {
            return null;
        }

        Inventory productToUpdate = productToUpdateOptional.get();

        productToUpdate.setQuantity(quantity.quantity + productToUpdate.getQuantity());

        return this.productRepository.save(productToUpdate);
    }

    @GetMapping("/search")
    public List<Inventory> search(@RequestParam String query) {
        System.out.println(query);
        return this.productRepository.findByQueryContaining(query);
    }

    @PutMapping("/increaseQuantity/{id}")
    public Inventory increaseQuantity(@PathVariable("id") Long id) {
        Optional<Inventory> productToUpdateOptional = this.productRepository.findById(id);

        if (productToUpdateOptional.isEmpty()) {
            return null;
        }

        Inventory productToUpdate = productToUpdateOptional.get();

        productToUpdate.setQuantity(productToUpdate.getQuantity() + 1);

        return this.productRepository.save(productToUpdate);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public Inventory deleteProduct(@PathVariable("id") Long id) {
        Optional<Inventory> productToDeleteOptional = this.productRepository.findById(id);

        if (productToDeleteOptional.isEmpty()) {
            return null;
        }

        Inventory productToDelete = productToDeleteOptional.get();
        this.productRepository.delete(productToDelete);
        return productToDelete;
    }



}
