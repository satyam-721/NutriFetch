package com.satyam.nutriFetch_new.Repo;

import com.satyam.nutriFetch_new.Model.Food;
import com.satyam.nutriFetch_new.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ProductRepo extends JpaRepository<Product,Long> {
}
