package com.ly.springgroup.service.impl;

import com.ly.springgroup.model.ChatGroup;
import com.ly.springgroup.model.GroupMember;
import com.ly.springgroup.repository.ChatGroupRepository;
import com.ly.springgroup.repository.GroupMemberRepository;
import com.ly.springgroup.repository.MessageRepository;
import com.ly.springgroup.repository.UserRepository;
import com.ly.springgroup.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupMemberRepository memberRepository;
    private final UserRepository userRepository;
    private final ChatGroupRepository groupRepository;
    @Override
    public ChatGroup createGroup(String name, Long userId) {
        ChatGroup group = new ChatGroup();
        group.setName(name);
        groupRepository.save(group);

        GroupMember member = new GroupMember();
        member.setGroup(group);
        member.setUser(userRepository.findById(userId).get());
        memberRepository.save(member);

        return group;
    }
}
