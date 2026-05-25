package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactDTO;
import com.portfolio.backend.entity.Contact;
import com.portfolio.backend.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<Contact> submitContactMessage(@Valid @RequestBody ContactDTO contactDTO) {
        Contact contact = new Contact(
                contactDTO.getName(),
                contactDTO.getEmail(),
                contactDTO.getSubject(),
                contactDTO.getMessage()
        );
        Contact savedContact = contactService.saveContact(contact);
        return new ResponseEntity<>(savedContact, HttpStatus.CREATED);
    }
}
