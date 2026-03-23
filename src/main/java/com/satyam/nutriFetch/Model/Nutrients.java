package com.satyam.nutriFetch.Model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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