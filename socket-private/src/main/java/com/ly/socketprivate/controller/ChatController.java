package com.ly.socketprivate.controller;

import com.ly.socketprivate.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public ChatController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/chat.sendToUser")
    @SendToUser("/queue/messages")
    public ChatMessage sendMessage(ChatMessage chatMessage, Principal principal){
        chatMessage.setSender(principal.getName());
//        simpMessagingTemplate.convertAndSendToUser(chatMessage.getRecipient(),"/queue/messages",chatMessage);
        return chatMessage;
    }
}
