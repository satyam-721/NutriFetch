package com.satyam.nutriFetch_new.Model;

import com.satyam.nutriFetch_new.Model.DTO.Alerts;
import com.satyam.nutriFetch_new.Model.DTO.Nutrients;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Food {
    String name;
    String brand;
    String barcode;
    int healthScore;
    double calories;
    String servingSize;

    @Embedded
    Nutrients nutrients;

    @ElementCollection
    List<Alerts> alerts;

    @ElementCollection
    private List<String> additives = new ArrayList<>(List.of("None"));

    @ElementCollection
    private List<String> allergens = new ArrayList<>(List.of("None"));

    @ElementCollection
    private List<String> ingredients = new ArrayList<>();



    @Override
    public String toString() {
        return "{" +
                "name='" + name + '\'' +
                ", brand='" + brand + '\'' +
                ", calories=" + calories +
                ", nutrients=" + nutrients +
                ", alerts=" + alerts +
                ", allergens=" + allergens +
                ", ingredients=" + ingredients +
                '}';
    }
}
