package com.portfolio.backend.service.impl;

import com.portfolio.backend.entity.Contact;
import com.portfolio.backend.repository.ContactRepository;
import com.portfolio.backend.service.ContactService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    private static final Logger logger = LoggerFactory.getLogger(ContactServiceImpl.class);

    @Autowired
    private ContactRepository contactRepository;

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Override
    public Contact saveContact(Contact contact) {
        Contact savedContact = contactRepository.save(contact);
        logger.info("Saved contact message from: {}", contact.getEmail());
        
        // Attempt to send email notification
        try {
            if (mailSender != null) {
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setTo("muraliavinash99@gmail.com"); // Primary developer email
                mailMessage.setSubject("New Portfolio Message: " + contact.getSubject());
                mailMessage.setText("You received a new message on your 3D Portfolio:\n\n" +
                        "Name: " + contact.getName() + "\n" +
                        "Email: " + contact.getEmail() + "\n" +
                        "Subject: " + contact.getSubject() + "\n\n" +
                        "Message:\n" + contact.getMessage());
                mailSender.send(mailMessage);
                logger.info("Sent email notification for contact message.");
            } else {
                logger.warn("JavaMailSender not configured. Simulating email send (logged successfully).");
            }
        } catch (Exception e) {
            logger.error("Failed to send email notification: {}", e.getMessage());
            // We do not throw an exception here because we want the contact to be successfully saved 
            // and the API to return 200 OK.
        }
        
        return savedContact;
    }
}
