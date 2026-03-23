package com.satyam.nutriFetch.Model.FoodLogs;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Food {

    @Id
    private String barcode;
    private String name;
    private String brand;

    @Embedded
    private Nutrients nutrients;

    @ElementCollection
    private List<String> ingredients;

    private int healthScore;

    @ElementCollection
    private List<Alert> alerts;


}