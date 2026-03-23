package com.satyam.nutriFetch.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.satyam.nutriFetch.Model.FoodLogs.Food;
import com.satyam.nutriFetch.Model.Product;
import com.satyam.nutriFetch.Repo.FoodRepo;
import com.satyam.nutriFetch.Repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final FoodAnalysisService service;

    public ProductService(FoodAnalysisService service) {
        this.service = service;
    }

    @Autowired
    ProductRepo repo;

    @Autowired
    FoodRepo foodRepo;

    public Product findById(String barcode) {
        return repo.findById(barcode).orElse(null);
    }

    public Product analyze(String barcode) {
        String url = "https://world.openfoodfacts.net/api/v2/product/"+barcode;
        String output = service.analyzeProduct(url);
//        System.out.println(output);
        output = output
                .replace("```json", "")
                .replace("```", "")
                .trim();
        ObjectMapper mapper = new ObjectMapper();

        try {
            return mapper.readValue(output, Product.class);
//            System.out.println(product.getName());
//            System.out.println(product.getBarcode());

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public Product save(Product analysedProduct) {

        return repo.save(analysedProduct);
    }

    public void saveLog(Food food) {
        foodRepo.save(food);
    }
}

