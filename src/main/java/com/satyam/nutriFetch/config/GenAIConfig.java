package com.satyam.nutriFetch.config;

import com.google.genai.Client;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GenAIConfig {

    @Bean
    public Client genAIClient() {
        return new Client(); // API key picked from env
    }
}