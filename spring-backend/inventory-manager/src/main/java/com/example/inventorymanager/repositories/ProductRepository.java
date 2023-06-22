package com.example.inventorymanager.repositories;

import com.example.inventorymanager.entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findAllByOrderByProductNameAsc();

    @Query("SELECT u FROM Inventory u WHERE LOWER(u.productName) LIKE %:query%")
    List<Inventory> findByQueryContaining(@Param("query") String query);
}
