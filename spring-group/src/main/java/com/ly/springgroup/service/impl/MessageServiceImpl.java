package com.ly.springgroup.service.impl;

import com.ly.springgroup.model.Message;
import com.ly.springgroup.repository.GroupMemberRepository;
import com.ly.springgroup.repository.MessageRepository;
import com.ly.springgroup.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepo;
    private final GroupMemberRepository memberRepo;

    public Message saveMessage(Message message) {

        boolean isMember = memberRepo.existsByUserIdAndGroupId(
                message.getSender().getId(),
                message.getGroup().getId()
        );

        if (!isMember) throw new RuntimeException("Not group member");

        return messageRepo.save(message);
    }
}



