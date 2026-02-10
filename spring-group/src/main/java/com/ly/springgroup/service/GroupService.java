package com.ly.springgroup.service;

import com.ly.springgroup.model.ChatGroup;

public interface GroupService {
    ChatGroup createGroup(String name, Long userId);
}
