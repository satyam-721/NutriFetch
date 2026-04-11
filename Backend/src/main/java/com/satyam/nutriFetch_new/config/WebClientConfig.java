package com.satyam.nutriFetch_new.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl("https://world.openfoodfacts.org/api/v0")
                .build();
    }



}





/*
*
* package com.satyam.nutriFetch_new.config;

import java.time.Duration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;

import io.netty.channel.ChannelOption;
import reactor.netty.http.client.HttpClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {

        HttpClient httpClient = HttpClient.create()
                .keepAlive(false) // 🔥 prevents stale connection reuse
                .responseTimeout(Duration.ofSeconds(5)) // 🔥 max wait for response
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000); // 🔥 connect timeout

        return WebClient.builder()
                .baseUrl("https://world.openfoodfacts.org/api/v2")
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
* */