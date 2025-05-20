package com.vit.marksheet.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SubjectMarks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectName;
    private Double mseMarks;
    private Double eseMarks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @Transient
    public Double getTotalMarks() {
        return (mseMarks * 0.3) + (eseMarks * 0.7);
    }

    @Transient
    public String getGrade() {
        double total = getTotalMarks();
        if (total >= 90) return "A+";
        if (total >= 80) return "A";
        if (total >= 70) return "B";
        if (total >= 60) return "C";
        if (total >= 50) return "D";
        return "F";
    }
}