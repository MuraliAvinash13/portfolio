package com.portfolio.backend.dto;

import java.time.LocalDateTime;

public class ChatResponse {
    private String response;
    private String sender;
    private LocalDateTime timestamp;

    public ChatResponse() {}

    public ChatResponse(String response, String sender) {
        this.response = response;
        this.sender = sender;
        this.timestamp = LocalDateTime.now();
    }

    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
