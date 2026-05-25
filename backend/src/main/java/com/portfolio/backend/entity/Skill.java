package com.portfolio.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String category; // e.g. Frontend, Backend, Database, AI

    @Column(name = "proficiency_percentage", nullable = false)
    private Integer proficiencyPercentage;

    // Constructors
    public Skill() {}

    public Skill(String name, String category, Integer proficiencyPercentage) {
        this.name = name;
        this.category = category;
        this.proficiencyPercentage = proficiencyPercentage;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getProficiencyPercentage() { return proficiencyPercentage; }
    public void setProficiencyPercentage(Integer proficiencyPercentage) { this.proficiencyPercentage = proficiencyPercentage; }
}
