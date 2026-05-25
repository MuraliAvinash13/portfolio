package com.portfolio.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactDTO {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email address must be valid")
    private String email;

    @NotBlank(message = "Subject cannot be empty")
    @Size(max = 100, message = "Subject must be under 100 characters")
    private String subject;

    @NotBlank(message = "Message cannot be empty")
    @Size(max = 1000, message = "Message must be under 1000 characters")
    private String message;

    // Constructors
    public ContactDTO() {}

    public ContactDTO(String name, String email, String subject, String message) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
