package com.satyam.nutriFetch.Model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class Product {
    @Id
    String barcode;
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
