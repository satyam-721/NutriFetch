package com.satyam.nutriFetch_new;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@SpringBootApplication
public class NutriFetchNewApplication {

	public static void main(String[] args) throws IOException {
        System.out.println(System.getenv("GOOGLE_API_KEY"));
        System.out.println(System.getProperty("java.net.preferIPv6Stack"));

//        URL url = new URL("https://world.openfoodfacts.net/api/v0/product/7622201756741.json");
//        HttpURLConnection con = (HttpURLConnection) url.openConnection();
//        con.setConnectTimeout(10000);
//        con.setReadTimeout(10000);
//
//        System.out.println(con.getResponseCode());

		SpringApplication.run(NutriFetchNewApplication.class, args);
	}

}
