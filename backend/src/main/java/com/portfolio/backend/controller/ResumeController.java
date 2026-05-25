package com.portfolio.backend.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadResume() {
        try {
            Resource resource = new ClassPathResource("resume.pdf");
            if (resource.exists()) {
                byte[] data = resource.getInputStream().readAllBytes();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDispositionFormData("attachment", "Mukhe_Murali_Avinash_Resume.pdf");
                return new ResponseEntity<>(data, headers, HttpStatus.OK);
            }
        } catch (IOException e) {
            // Log exception, proceed to fallback
        }

        // Fallback: Return a dynamic textual resume file if PDF file doesn't exist
        String fallbackResume = "MUKHE MURALI AVINASH\n" +
                "Java Full Stack Developer | MERN Stack Developer | AI Enthusiast\n" +
                "Email: muraliavinash99@gmail.com | CGPA: 8.3\n\n" +
                "EDUCATION:\n" +
                "- Computer Science & Engineering (CGPA: 8.3)\n\n" +
                "PROFESSIONAL EXPERIENCE:\n" +
                "- Edunet Foundation Internship (Web Architecture Development)\n" +
                "- QSpiders Java Full Stack Training (Java, Spring Boot, MySQL, React)\n\n" +
                "KEY PROJECTS:\n" +
                "- Blood Bank Management System (Spring Boot + React + MySQL)\n" +
                "- Pharmacy Ordering Management System (MERN Stack)\n" +
                "- Grayscale Image Colorization AI (Flask + PyTorch + React)\n" +
                "- 3D Space command Developer Portfolio (React Three Fiber + Spring Boot)\n\n" +
                "TECHNICAL SKILLS:\n" +
                "- Backend: Java, Spring Boot, Node.js, Express.js, MySQL, MongoDB\n" +
                "- Frontend: React.js, Vite, Three.js, React Three Fiber, GSAP, Framer Motion\n" +
                "- AI/ML: CNNs, GANs, Computer Vision, Python\n";

        byte[] fallbackData = fallbackResume.getBytes(StandardCharsets.UTF_8);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.setContentDispositionFormData("attachment", "Mukhe_Murali_Avinash_Resume.txt");
        return new ResponseEntity<>(fallbackData, headers, HttpStatus.OK);
    }
}
