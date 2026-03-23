package com.satyam.nutriFetch.Repo;

import com.satyam.nutriFetch.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, String> {
}
