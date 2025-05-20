package com.vit.marksheet.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String rollNumber;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubjectMarks> marks = new ArrayList<>();

    public void addSubjectMarks(SubjectMarks mark) {
        marks.add(mark);
        mark.setStudent(this);
    }

    public void removeSubjectMarks(SubjectMarks mark) {
        marks.remove(mark);
        mark.setStudent(null);
    }
}