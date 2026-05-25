package com.portfolio.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(name = "tech_stack", nullable = false)
    private String techStack;

    @Column(name = "github_link")
    private String githubLink;

    @Column(name = "live_demo")
    private String liveDemo;

    @Column(name = "architecture_diagram", length = 1000)
    private String architectureDiagram;

    @Column(length = 1000)
    private String screenshots;

    // Constructors
    public Project() {}

    public Project(String title, String description, String techStack, String githubLink, String liveDemo, String architectureDiagram, String screenshots) {
        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.githubLink = githubLink;
        this.liveDemo = liveDemo;
        this.architectureDiagram = architectureDiagram;
        this.screenshots = screenshots;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTechStack() { return techStack; }
    public void setTechStack(String techStack) { this.techStack = techStack; }

    public String getGithubLink() { return githubLink; }
    public void setGithubLink(String githubLink) { this.githubLink = githubLink; }

    public String getLiveDemo() { return liveDemo; }
    public void setLiveDemo(String liveDemo) { this.liveDemo = liveDemo; }

    public String getArchitectureDiagram() { return architectureDiagram; }
    public void setArchitectureDiagram(String architectureDiagram) { this.architectureDiagram = architectureDiagram; }

    public String getScreenshots() { return screenshots; }
    public void setScreenshots(String screenshots) { this.screenshots = screenshots; }
}
