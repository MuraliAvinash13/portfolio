package com.portfolio.backend.service;

import com.portfolio.backend.entity.Skill;
import java.util.List;

public interface SkillService {
    List<Skill> getAllSkills();
    List<Skill> getSkillsByCategory(String category);
    Skill saveSkill(Skill skill);
}
