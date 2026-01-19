package com.ly.websocketdaytwo.controller;

import com.ly.websocketdaytwo.model.Message;
import com.ly.websocketdaytwo.model.User;
import com.ly.websocketdaytwo.service.MemberStore;
import com.ly.websocketdaytwo.util.Action;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final MemberStore memberStore;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/user")
    public void getUsers(User user, SimpMessageHeaderAccessor headerAccessor){
        User newUse=new User(user.id(),user.username());
        headerAccessor.getSessionAttributes().put("user",newUse);
        memberStore.addMember(newUse);
        if (!memberStore.getMember().isEmpty()){
            simpMessagingTemplate.convertAndSend("/topic/users",newUse);
        }
        Message message=new Message(user,"",Action.JOINED,Instant.now());
        simpMessagingTemplate.convertAndSend("/topic/messages",message);
    }

    @EventListener
    public void handleSessionConnectEvent(SessionConnectEvent sessionConnectEvent){
        System.out.println("Session connect event");
    }

    @EventListener
    public void handleSessionDisconnectEvent(SessionDisconnectEvent sessionDisconnectEvent){
        System.out.println("Session Disconnect event");
        StompHeaderAccessor stompHeaderAccessor=StompHeaderAccessor.wrap(sessionDisconnectEvent.getMessage());

       Map<String,Object> sessionAttributes =stompHeaderAccessor.getSessionAttributes();
       if (sessionAttributes==null){
           return;
       }
       User user=(User)sessionAttributes.get("user");
       if(user==null){
           return;
       }
       memberStore.removeMember(user);
       simpMessagingTemplate.convertAndSend("/topic/users",memberStore.getMember());
        Message message=new Message(user,"", Action.LEFT, Instant.now());
        simpMessagingTemplate.convertAndSend("/topic/messages",message);
    }


}
