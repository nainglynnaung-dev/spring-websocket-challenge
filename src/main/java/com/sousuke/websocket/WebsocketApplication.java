package com.sousuke.websocket;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WebsocketApplication {


    @Bean
    public ApplicationRunner run(){
        return r->{
            System.out.println("how are you");
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(WebsocketApplication.class, args);
    }

}
