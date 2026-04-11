package com.satyam.nutriFetch_new.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.satyam.nutriFetch_new.Model.DTO.Alerts;
import com.satyam.nutriFetch_new.Model.DTO.Nutrients;
import com.satyam.nutriFetch_new.Model.Food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FoodService {

    @Autowired
    private WebClient webClient;

    public Food getProductByBarcode(String bar) throws JsonProcessingException {
//        RestTemplate restTemplate = new RestTemplate();
//
//        String responseString = restTemplate.getForObject(
//                "https://world.openfoodfacts.org/api/v0/product/" + bar + ".json",
//                String.class
//        );


        String responseString = webClient.get()
                .uri("/product/" + bar + ".json")
                .retrieve()
                .bodyToMono(String.class)
                .block(); // blocking for simplicity

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(responseString);

        Food food = new Food();
        Nutrients nutrients = new Nutrients();

        JsonNode product = root.path("product");
        food.setName(product.path("product_name").asText("Unknown"));
        food.setBarcode( root.path("code").asText());
        JsonNode nutriments = product.path("nutriments");
        food.setCalories(nutriments.path("energy-kcal_100g").asDouble(0));
        nutrients.setSaturatedFat(nutriments.path("saturated-fat_100g").asDouble(0));
        nutrients.setProtein( nutriments.path("proteins_100g").asDouble(0));
        nutrients.setCarbs( nutriments.path("carbohydrates_100g").asDouble(0));
        nutrients.setFat( nutriments.path("fat_100g").asDouble(0));
        nutrients.setSugar( nutriments.path("sugars_100g").asDouble(0));
        nutrients.setSodium( nutriments.path("sodium_100g").asDouble(0));
        nutrients.setFiber( nutriments.path("fiber_100g").asDouble(0));
        food.setNutrients(nutrients);

        String healthGrade = product.path("nutriscore_grade").asText("unknown");
        if (healthGrade.equals("a")){
            food.setHealthScore(95);
        }
        else if (healthGrade.equals("b")){
            food.setHealthScore(80);
        }
        else if (healthGrade.equals("c")){
            food.setHealthScore(60);
        }
        else if (healthGrade.equals("d")){
            food.setHealthScore(40);
        }
        else {
            food.setHealthScore(20);
        }


        food.setAllergens(new ArrayList<>(Arrays.asList(product.path("allergens_from_ingredients").asText("Not available").split(",")))) ;
        food.setBrand(product.path("brands").asText("Unknown"));
        food.setServingSize(product.path("serving_quantity").asText("Unknown"));
        String ingredients = product.path("ingredients_text_with_allergens_en").asText("Not Found");
        String[] ingredientsArray = ingredients.split(",");
        food.setIngredients(new ArrayList<>(Arrays.asList(ingredientsArray)) );

        JsonNode tagsNode = product.path("nutrient_levels_tags");
        List<Alerts> alertsList = new ArrayList<>();

        if (tagsNode.isArray()) {
            for (JsonNode node : tagsNode) {

//                nutrientLevels.add(node.asText());
                Alerts alerts = new Alerts();
                alerts.setTitle(node.asText());
                alerts.setDescription(alerts.getTitle());
                if (alerts.getTitle().contains("high")){
                    if (alerts.getTitle().contains("saturated")){
                        alerts.setLevel("danger");
                    }
                    else {
                        alerts.setLevel("warning");
                    }
                }else{
                    alerts.setLevel("info");
                }

                alertsList.add(alerts);

            }
        }

        food.setAlerts(alertsList);




        return food;
    }



}
