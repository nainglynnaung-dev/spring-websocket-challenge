package com.ly.springgroup.repository;

import com.ly.springgroup.model.Message;
import com.ly.springgroup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByGroupIdOrderBySentAtAsc(Long groupId);

}
