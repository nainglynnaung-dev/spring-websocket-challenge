package com.ly.websocketdaytwo.service;

import com.ly.websocketdaytwo.model.User;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class MemberStore {

    public static List<User> store=new LinkedList<>();

    public List<User> getMember(){
        return  store;
    }

    public void addMember(User member){
        store.add(member);
    }

    public void removeMember(User member){
        store.remove(member);
    }
}
