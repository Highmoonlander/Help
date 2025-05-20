package com.vit.marksheet.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vit.marksheet.dto.StudentDTO;
import com.vit.marksheet.model.Student;
import com.vit.marksheet.model.SubjectMarks;
import com.vit.marksheet.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Transactional
    public Student saveStudentResult(StudentDTO studentDTO) {
        Student student = new Student();
        student.setName(studentDTO.getName());
        student.setRollNumber(studentDTO.getRollNumber());

        for (Map.Entry<String, StudentDTO.SubjectMarksDTO> entry : studentDTO.getMarks().entrySet()) {
            SubjectMarks subjectMarks = new SubjectMarks();
            subjectMarks.setSubjectName(entry.getKey());
            subjectMarks.setMseMarks(Double.parseDouble(entry.getValue().getMse()));
            subjectMarks.setEseMarks(Double.parseDouble(entry.getValue().getEse()));
            student.addSubjectMarks(subjectMarks);
        }

        return studentRepository.save(student);
    }

    public Student getStudentByRollNumber(String rollNumber) {
        return studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found with roll number: " + rollNumber));
    }
}