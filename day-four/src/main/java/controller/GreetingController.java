package controller;

import com.example.demo.model.GreetingReq;
import com.example.demo.model.GreetingRes;
import org.springframework.messaging.handler.annotation.DestinationVariable;
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
    @SendTo("/topic/greetings")
    public GreetingRes greet_pub(GreetingReq greetingReq){
        String time=new SimpleDateFormat("HH:mm:ss").format(new Date());
        return new GreetingRes("Hello "+greetingReq.name() + " - "+time);

    }

    @MessageMapping("/message")
    @SendToUser("/topic/greetings")
    public GreetingRes greet_pri(GreetingReq greetingReq, SimpMessageHeaderAccessor headerAccessor){
        if (!headerAccessor.getSessionId().isEmpty()){
            headerAccessor.setSessionId(greetingReq.sessionId());
        }
        String time=new SimpleDateFormat("HH:mm:ss").format(new Date());
        return new GreetingRes("Hello "+greetingReq.name() +" - "+time);
    }

    @MessageMapping("/room_message/{room}")
    @SendTo("/topic/greetings/room/{room}")
    public GreetingRes greet_room(@DestinationVariable String room,GreetingReq g){
        String time=new SimpleDateFormat("HH:mm:ss").format(new Date());
        return new GreetingRes("Hello room: "+room + " : "+ g.name() + " - "+time);
    }

    @MessageMapping("/message/connected")
    @SendToUser("/topic/connected")
    String connected(SimpMessageHeaderAccessor headerAccessor){
        return "Connected with SessionId : "+headerAccessor.getSessionId();
    }
}
