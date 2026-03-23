package com.satyam.nutriFetch.Repo;

import com.satyam.nutriFetch.Model.FoodLogs.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepo extends JpaRepository<Food,String> {
}
