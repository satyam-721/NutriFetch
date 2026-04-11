package com.satyam.nutriFetch_new.Model;

import com.satyam.nutriFetch_new.Model.DTO.Alerts;
import com.satyam.nutriFetch_new.Model.DTO.Nutrients;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Embedded
    Food food;

    private String mealType;
    private float quantity;
    private LocalDateTime timestamp;

    @Override

    public String toString() {
        return "{" +

                ", food=" + food +
                ", mealType='" + mealType + '\'' +
                ", quantity=" + quantity +

                '}';
    }
}
