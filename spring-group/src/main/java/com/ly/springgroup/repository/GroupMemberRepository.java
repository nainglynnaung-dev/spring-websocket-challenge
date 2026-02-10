package com.ly.springgroup.repository;

import com.ly.springgroup.model.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
    boolean existsByUserIdAndGroupId(Long userId, Long groupId);
    List<GroupMember> findByGroupId(Long groupId);
}