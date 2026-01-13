package com.sousuke.websocket.controller;

import com.sousuke.websocket.Greeting;
import com.sousuke.websocket.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greetingMessage(HelloMessage message) throws InterruptedException {
        Thread.sleep(1000);
        return new Greeting("Hello"+ HtmlUtils.htmlEscape(message.getName())+"!");
    }
}
