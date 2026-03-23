package com.satyam.nutriFetch.Model.FoodLogs;

import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Nutrients {

    private int calories;
    private int protein;
    private int carbs;
    private int fats;
    private int sugar;
    private int sodium;
    private int fiber;
}