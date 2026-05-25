package com.portfolio.backend.service.impl;

import com.portfolio.backend.service.ChatbotService;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class ChatbotServiceImpl implements ChatbotService {

    @Override
    public String generateResponse(String message) {
        if (message == null || message.trim().isEmpty()) {
            return "Greetings! I am AVA (Avinash Virtual Assistant). How can I assist you today? You can ask about my projects, skills, internship experience, or academic background!";
        }

        String query = message.toLowerCase(Locale.ROOT).trim();

        if (query.contains("hello") || query.contains("hi") || query.contains("hey") || query.contains("greet")) {
            return "Hello! I am AVA, virtual assistant for Mukhe Murali Avinash. I can walk you through Avinash's background, professional projects, and skill proficiencies. Ask me anything!";
        }

        if (query.contains("who are you") || query.contains("ava") || query.contains("your name")) {
            return "I am AVA, which stands for **Avinash Virtual Assistant**. I'm a futuristic AI agent designed to act as Avinash's holographic interface and answer queries about his portfolio, skills, achievements, and availability!";
        }

        if (query.contains("who is") || query.contains("murali") || query.contains("avinash") || query.contains("about")) {
            return "Mukhe Murali Avinash is a highly skilled **Java Full Stack Developer**, **MERN Stack Developer**, and **AI Enthusiast** with a CGPA of **8.3**. He has built 4+ real-world applications ranging from enterprise web solutions to deep-learning image processing networks.";
        }

        if (query.contains("project") || query.contains("portfolio")) {
            return "Avinash has built several noteworthy projects:\n\n" +
                    "1. **Blood Bank Management System**: Built with Spring Boot and React, implementing a microservices structure for medical donors, hospitals, and real-time inventory management.\n" +
                    "2. **Pharmacy Ordering Management System**: A MERN stack app featuring automated batch tracking, invoice generations, and role-based permissions.\n" +
                    "3. **Grayscale Image Colorization AI**: A Python Deep Learning model (CNN/GANs) deployed with a Flask backend and React UI for colorizing historical black-and-white photos.\n" +
                    "4. **3D Developer Portfolio**: This futuristic sci-fi universe workspace built using React, Vite, Three.js, and Spring Boot.\n\n" +
                    "Would you like details on any specific project? Just ask!";
        }

        if (query.contains("blood bank")) {
            return "The **Blood Bank Management System** is a full-stack project built using **Java, Spring Boot, React.js, and MySQL**.\n" +
                    "- **Key Features**: Live inventory monitoring, automated donor eligibility tracking (checking time elapsed since last donation), and admin panels.\n" +
                    "- **Architecture**: Decoupled REST services with secure JWT authentication and JPA repository abstraction.";
        }

        if (query.contains("pharmacy") || query.contains("ordering")) {
            return "The **Pharmacy Ordering Management System** is a MERN stack web app built with **React.js, Node.js, Express.js, and MongoDB**.\n" +
                    "- **Key Features**: Dynamic cart management, batch invoice generation in PDF, automatic drug stock alerts, and multi-tier user access control (pharmacists, distributors, and admins).";
        }

        if (query.contains("colorization") || query.contains("grayscale") || query.contains("image")) {
            return "The **Grayscale Image Colorization AI** is a Deep Learning tool that adds natural colors to historical black-and-white images.\n" +
                    "- **Tech Stack**: Python, TensorFlow, PyTorch, Flask, OpenCV, React.js.\n" +
                    "- **How it works**: Uses a convolutional autoencoder and Generative Adversarial Networks (GANs) trained on Lab color space images. The user uploads an image on the React interface, Flask runs the model inference, and returns the colorized result.";
        }

        if (query.contains("skill") || query.contains("technology") || query.contains("tech stack")) {
            return "Avinash has an extensive technical toolkit:\n\n" +
                    "- **Languages**: Java (Core & Advanced), JavaScript/TypeScript, Python, SQL\n" +
                    "- **Backend**: Spring Boot, Spring Data JPA, Microservices, Node.js, Express.js, RESTful APIs\n" +
                    "- **Frontend**: React.js, Vite, Three.js, React Three Fiber, GSAP, Framer Motion, HTML5, CSS3, Tailwind CSS\n" +
                    "- **Databases**: MySQL, MongoDB, PostgreSQL\n" +
                    "- **AI/ML**: CNNs, GANs, Computer Vision, TensorFlow, Keras";
        }

        if (query.contains("experience") || query.contains("intern") || query.contains("work") || query.contains("timeline")) {
            return "Avinash has completed two key professional training and internship milestones:\n\n" +
                    "1. **Edunet Foundation (Internship)**: Gained real-world industry experience working on modern web architectures, writing backend components, and collaborating on sprint tasks.\n" +
                    "2. **QSpiders (Java Full Stack Training)**: Intensive training covering Advanced Java, Spring Boot microservices, database optimizations with MySQL, and frontend development with React.js.";
        }

        if (query.contains("contact") || query.contains("email") || query.contains("phone") || query.contains("reach") || query.contains("hire")) {
            return "You can reach Mukhe Murali Avinash via the following coordinates:\n\n" +
                    "- **Email**: muraliavinash2005@gmail.com\n" +
                    "- **LinkedIn**: https://www.linkedin.com/in/murali-avinash-8b9ba4301\n" +
                    "- **GitHub**: https://github.com/MuraliAvinash13\n" +
                    "- **Contact Command Center**: Feel free to submit a message directly via the command console on the bottom-right panel of the dashboard! It stores messages in MySQL and sends immediate email notifications.";
        }

        if (query.contains("resume") || query.contains("cv") || query.contains("download")) {
            return "You can download Avinash's professional resume directly using the 'DOWNLOAD RESUME' HUD button on the top-right header panel, or type 'download resume' to get a direct access link.";
        }

        if (query.contains("cgpa") || query.contains("grade") || query.contains("education") || query.contains("college")) {
            return "Avinash has an impressive academic profile with a **CGPA of 8.3**. He studied Computer Science & Engineering, specializing in Java Full Stack and Modern MERN technologies, along with AI algorithms.";
        }

        return "Interesting query! As AVA, I can tell you that Avinash excels in Java, Spring Boot, React, and AI applications. Could you rephrase your question, or ask about his projects, skills, internship, or contact details?";
    }
}
