package com.ly.daythree.controller;

import com.ly.daythree.model.GreetingRequest;
import com.ly.daythree.model.GreetingResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class GreetingController {

    @MessageMapping("/message")
    @SendTo("/topic/greeting")
    GreetingResponse greet(GreetingRequest request){
        String time=new SimpleDateFormat("HH:mm:ss").format(new Date());
        return new GreetingResponse("Hello "+request.name() + " - "+ time
        );
    }

    @MessageMapping("/private")
    @SendToUser("/topic/greeting")
    GreetingResponse greet_priate(GreetingRequest request, SimpMessageHeaderAccessor headerAccessor){
        if (!request.sessionId().isEmpty()){
            headerAccessor.setSessionId(request.sessionId());
        }
        String time= new SimpleDateFormat("HH:mm:ss").format(new Date());
        return new GreetingResponse(request.name() + " - "+time);
    }

    @MessageMapping("connected")
    @SendToUser("/topic/connected")
    String connect(SimpMessageHeaderAccessor headerAccessor){

        return "Connected with sessionId "+headerAccessor.getSessionId();

    }


}
