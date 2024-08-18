package com.mahel.security.entity.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EmploymentStatus {


    FULL_TIME("Full time"),
    PART_TIME("Part time"),
    TEMPORARY("Temporary"),
    CASUAL("Casual");

    private final String value;

    EmploymentStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

}
