package com.ly.springgroup.repository;

import com.ly.springgroup.model.ChatGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatGroupRepository extends JpaRepository<ChatGroup, Long> {
}
