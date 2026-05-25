package com.portfolio.backend.service.impl;

import com.portfolio.backend.entity.Project;
import com.portfolio.backend.repository.ProjectRepository;
import com.portfolio.backend.service.ProjectService;
import com.portfolio.backend.exception.ResourceNotFoundException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
    }

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    @PostConstruct
    public void seedProjects() {
        if (projectRepository.count() == 0) {
            List<Project> defaultProjects = new ArrayList<>();
            
            defaultProjects.add(new Project(
                "Blood Bank Management System",
                "A full-stack blood donation platform connecting donors, hospitals, and blood banks. Streamlines request approval, donor eligibility tracking, and real-time inventory management.",
                "Java, Spring Boot, React.js, MySQL, REST APIs",
                "https://github.com/MuraliAvinash13",
                "",
                "Client (React) -> Load Balancer -> Service Instance (Spring Boot Gateway) -> Microservices (Donor Service, Inventory Service) -> MySQL DB",
                "Dashboard, Donor Form, Inventory Table"
            ));

            defaultProjects.add(new Project(
                "Pharmacy Ordering Management System",
                "A comprehensive supply chain and order management solution for pharmacies and distributors. Features role-based access control, batch tracking, automated order invoicing, and inventory notifications.",
                "React.js, Node.js, Express.js, MongoDB, REST APIs",
                "https://github.com/MuraliAvinash13",
                "",
                "Client (React) -> Gateway/Reverse Proxy -> Pharmacy Service -> Auth Service -> Inventory Service -> MongoDB",
                "Login Screen, Inventory Catalog, Invoicing Dashboard"
            ));

            defaultProjects.add(new Project(
                "Grayscale Image Colorization AI",
                "A deep learning application that takes grayscale images and applies natural, realistic colorizations using a Convolutional Neural Network (CNN) and Generative Adversarial Networks (GANs).",
                "Python, TensorFlow/Keras, Flask, OpenCV, React.js",
                "https://github.com/MuraliAvinash13",
                "",
                "User Interface (React) -> API Endpoint (Flask) -> Deep Learning Inference Pipeline (PyTorch/TensorFlow) -> CDN Cache -> Returned Colorized Image",
                "Inference Dashboard, Before-After Slider, Custom Settings"
            ));

            defaultProjects.add(new Project(
                "Futuristic 3D Developer Portfolio",
                "A high-fidelity space command theme portfolio website showcasing professional experience, interactive skill planets, floating 3D crystals, and an AI chat assistant.",
                "React.js, Vite, Three.js, React Three Fiber, Framer Motion, GSAP, Tailwind CSS, Spring Boot, MySQL",
                "https://github.com/MuraliAvinash13",
                "",
                "Browser Frontend (React Three Fiber, GSAP) -> REST API Gateway (Spring Boot) -> Database Layer (MySQL) + AVA Chat Agent Engine",
                "3D Universe Canvas, Skills Galaxy, Experience Stations, AVA Chat Interface"
            ));

            projectRepository.saveAll(defaultProjects);
        }
    }
}
