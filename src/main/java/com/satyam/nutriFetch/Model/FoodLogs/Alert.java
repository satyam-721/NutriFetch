package com.satyam.nutriFetch.Model.FoodLogs;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Alert {


    private String type;

    private String message;

    private String severity;
}