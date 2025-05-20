package com.vit.marksheet.dto;

import java.util.Map;

import lombok.Data;

@Data
public class StudentDTO {
    private String name;
    private String rollNumber;
    private Map<String, SubjectMarksDTO> marks;

    @Data
    public static class SubjectMarksDTO {
        private String mse;
        private String ese;
    }
}