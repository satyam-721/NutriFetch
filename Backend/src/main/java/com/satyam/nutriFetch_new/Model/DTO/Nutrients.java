package com.satyam.nutriFetch_new.Model.DTO;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Nutrients {
    double protein;
    double carbs;
    double fat;
    double sugar;
    double sodium;
    double fiber;
    double saturatedFat;

    @Override
    public String toString() {
        return "{" +
                "protein=" + protein +
                ", carbs=" + carbs +
                ", fat=" + fat +
                ", sugar=" + sugar +
                ", sodium=" + sodium +
                ", fiber=" + fiber +
                ", saturatedFat=" + saturatedFat +
                '}';
    }
}
