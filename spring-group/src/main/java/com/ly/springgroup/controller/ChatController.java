package com.ly.springgroup.controller;

import com.ly.springgroup.model.Message;
import com.ly.springgroup.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    @MessageMapping("/chat.send")
    public void sendMessage(Message message) {

        Message saved = messageService.saveMessage(message);

        messagingTemplate.convertAndSend(
                "/topic/group/" + saved.getGroup().getId(),
                saved
        );
    }
}
