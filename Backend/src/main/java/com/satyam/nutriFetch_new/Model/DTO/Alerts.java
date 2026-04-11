package com.satyam.nutriFetch_new.Model.DTO;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Alerts {
    String level;
    String title;
    String description;

    @Override
    public String toString() {
        return
                  title.replaceAll("-quantity","")
                ;
    }
}
