package com.portfolio.backend.service;

import com.portfolio.backend.entity.Project;
import java.util.List;

public interface ProjectService {
    List<Project> getAllProjects();
    Project getProjectById(Long id);
    Project saveProject(Project project);
}
