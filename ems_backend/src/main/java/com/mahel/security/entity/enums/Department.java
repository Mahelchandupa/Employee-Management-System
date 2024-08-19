package com.mahel.security.entity.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Department {

    FINANCE("Finance"),
    INFORMATION_TECHNOLOGY("Information Technology"),
    HUMAN_RESOURCES("Human Resources"),
    MARKETING("Marketing"),
    SALES("Sales"),
    SECURITY_DEPARTMENT("Security Department");

    private final String value;

    Department(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
