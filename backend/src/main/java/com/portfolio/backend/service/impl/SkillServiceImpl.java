package com.portfolio.backend.service.impl;

import com.portfolio.backend.entity.Skill;
import com.portfolio.backend.repository.SkillRepository;
import com.portfolio.backend.service.SkillService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @Override
    public List<Skill> getSkillsByCategory(String category) {
        return skillRepository.findByCategory(category);
    }

    @Override
    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    @PostConstruct
    public void seedSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> defaultSkills = new ArrayList<>();

            // Java & Backend
            defaultSkills.add(new Skill("Java", "Backend", 90));
            defaultSkills.add(new Skill("Spring Boot", "Backend", 85));
            defaultSkills.add(new Skill("Node.js", "Backend", 75));
            
            // Frontend
            defaultSkills.add(new Skill("React.js", "Frontend", 85));
            defaultSkills.add(new Skill("Vite", "Frontend", 80));
            defaultSkills.add(new Skill("Tailwind CSS", "Frontend", 90));
            defaultSkills.add(new Skill("Three.js", "Frontend", 70));

            // Database
            defaultSkills.add(new Skill("MySQL", "Database", 85));
            defaultSkills.add(new Skill("MongoDB", "Database", 80));

            // AI & ML
            defaultSkills.add(new Skill("AI & Deep Learning", "AI", 70));
            defaultSkills.add(new Skill("Machine Learning", "AI", 75));

            skillRepository.saveAll(defaultSkills);
        }
    }
}
