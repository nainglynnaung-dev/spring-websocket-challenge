package com.ly.day_one_challenge.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final TutorialHandler tutorialHandler;

    public WebSocketConfig(TutorialHandler tutorialHandler) {
        this.tutorialHandler = tutorialHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        System.out.println("Hello");
        registry.addHandler(tutorialHandler, "/tutorial").setAllowedOrigins("*");
    }
}
