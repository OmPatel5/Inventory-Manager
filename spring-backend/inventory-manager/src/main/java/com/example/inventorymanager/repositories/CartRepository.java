package com.example.inventorymanager.repositories;

import com.example.inventorymanager.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Iterable<Cart> findAllItemsByEmail(String email);
    Optional<Cart> findByProductIdAndEmail(Long id, String email);

    @Query("SELECT SUM(u.price) FROM Cart u WHERE u.email=?1")
    Long sumPriceByEmail(String email);

    @Query("SELECT SUM(u.quantity) FROM Cart u WHERE u.email=?1")
    Long sumQuantityByEmail(String email);

    @Transactional
    List<Cart> deleteByEmail(String email);
}
