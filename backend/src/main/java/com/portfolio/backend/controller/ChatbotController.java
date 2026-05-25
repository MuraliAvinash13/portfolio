package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ChatRequest;
import com.portfolio.backend.dto.ChatResponse;
import com.portfolio.backend.service.ChatbotService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping
    public ResponseEntity<ChatResponse> chatWithAva(@Valid @RequestBody ChatRequest chatRequest) {
        String answer = chatbotService.generateResponse(chatRequest.getMessage());
        ChatResponse response = new ChatResponse(answer, "AVA");
        return ResponseEntity.ok(response);
    }
}
