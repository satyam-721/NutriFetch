package com.satyam.nutriFetch_new.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class NutriAnalysis {

    int calories = 2678;
    int protein = 105;
    int carbs = 429;
    int fat = 60;
    int fiber = 37;

    @Override
    public String toString() {
        return "{" +
                "calories=" + calories +
                ", protein=" + protein +
                ", carbs=" + carbs +
                ", fat=" + fat +
                ", fiber=" + fiber +
                '}';
    }
}
