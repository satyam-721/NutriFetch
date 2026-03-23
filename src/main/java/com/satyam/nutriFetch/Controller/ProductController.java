package com.satyam.nutriFetch.Controller;

import com.satyam.nutriFetch.Model.HelperModel;
import com.satyam.nutriFetch.Model.Product;
import com.satyam.nutriFetch.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/food")
public class ProductController {

    @Autowired
    ProductService productService;


    @PostMapping("/scan")
    public Product saveBarcode(@RequestBody HelperModel hm){
        System.out.println(hm);
        System.out.println("Method Called");
        System.out.println(hm.getBarcode());
        Product fetchedProduct = productService.findById(hm.getBarcode());

        if(fetchedProduct == null){

            Product analysedProduct = productService.analyze(hm.getBarcode());
            analysedProduct.setBarcode(hm.getBarcode());
            Product product =  productService.save(analysedProduct);
            System.out.println(product);
            return product;

        }else{
            System.out.println("Returned product from database");
            return fetchedProduct;
        }
    }

    @PostMapping("/log")
    public void foodLog(@RequestBody String foodId, @RequestBody String quantity){
        System.out.println(foodId);
        System.out.println(quantity);
    }







//    @GetMapping("/analyze")
//    public void analyze() {
//        String output = service.analyzeProduct();
//        System.out.println(output);
//        output = output
//                .replace("```json", "")
//                .replace("```", "")
//                .trim();
//        ObjectMapper mapper = new ObjectMapper();
//
//        try {
//            Product product = mapper.readValue(output, Product.class);
//            System.out.println(product.getName());
//            System.out.println(product.getBarcode());
//
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e);
//        }
//    }
}
