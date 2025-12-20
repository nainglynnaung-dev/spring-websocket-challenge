package com.sousuke.websocket.config;

import org.springframework.web.socket.*;

public class Tutorial implements WebSocketHandler {
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
           session.sendMessage(new TextMessage("Started "+(String) message.getPayload()));

           Thread.sleep(1000);
           session.sendMessage(new TextMessage("Ended"+(String) message.getPayload()));
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {

    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
