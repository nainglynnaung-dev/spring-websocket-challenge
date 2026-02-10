package com.ly.springgroup.controller;

import com.ly.springgroup.model.ChatGroup;
import com.ly.springgroup.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ChatGroup create(@RequestParam String name,
                            @RequestParam Long userId) {
        return groupService.createGroup(name, userId);
    }
}
