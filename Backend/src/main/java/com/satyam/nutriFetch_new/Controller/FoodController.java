package com.satyam.nutriFetch_new.Controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.satyam.nutriFetch_new.Model.DTO.NutriAnalysis;
import com.satyam.nutriFetch_new.Model.Food;
import com.satyam.nutriFetch_new.Model.Product;
import com.satyam.nutriFetch_new.Repo.ProductRepo;
import com.satyam.nutriFetch_new.Service.AiServices;
import com.satyam.nutriFetch_new.Service.FoodService;
import com.satyam.nutriFetch_new.Service.ProfileAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
public class FoodController {

    String profile;

    NutriAnalysis nutriAnalysis = new NutriAnalysis();

    @Autowired
    private FoodService foodService;

    @Autowired
    private AiServices aiServices;

    @Autowired
    ProductRepo repo;

    @GetMapping("/food/{barcode}")
    public Food getFood(@PathVariable String barcode) throws JsonProcessingException {
        return foodService.getProductByBarcode(barcode);
    }

    @PostMapping("/food-log")
    public String saveFood( @RequestBody Product product){

        product.setTimestamp(LocalDateTime.now());
        System.out.println(product);
        repo.save(product);

        return "success";
    }
    @GetMapping("/products")
    public List<Product> fetchAllProducts(){
        return repo.findAll();
    }

    @PostMapping("/profile")
    public String profile(@RequestBody String profile){
        this.profile = profile;
        System.out.println(profile);
        return "Success";
    }

    @GetMapping("/profile/nutri")
    public NutriAnalysis getNutri(){



        nutriAnalysis = aiServices.analyzeProfile(profile);
        System.out.println(nutriAnalysis);


        return nutriAnalysis;
    }

    @GetMapping("/nutri")
    public NutriAnalysis getMaxNutri(){
        return nutriAnalysis;
    }

    @PostMapping("/productAnalyse")
    public String productAnalyse(@RequestBody String question){
        System.out.println(question);

        return aiServices.getAiAnswer(question+", \"log\":"+repo.findAll());


    }
}
