package com.satyam.nutriFetch_new.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.satyam.nutriFetch_new.Model.DTO.NutriAnalysis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AiServices {

    @Autowired
    ProfileAnalysisService profileAnalysisService;

    @Autowired
    AIAnswerServices aiAnswerServices;

    public NutriAnalysis analyzeProfile(String profile){
        String output = profileAnalysisService.analyzeProfile(profile);
        output = output
                .replace("```json", "")
                .replace("```", "")
                .trim();

        ObjectMapper mapper = new ObjectMapper();

        try {
            return mapper.readValue(output, NutriAnalysis.class);
//            System.out.println(product.getName());
//            System.out.println(product.getBarcode());

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String getAiAnswer(String data){
        return aiAnswerServices.analyseData(data);
    }

}
