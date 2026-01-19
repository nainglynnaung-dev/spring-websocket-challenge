package com.ly.websocketdaytwo.model;

import com.ly.websocketdaytwo.util.Action;

import java.sql.Timestamp;
import java.time.Instant;

public record Message(User user, String comment, Action action, Instant timestamp) {
}
