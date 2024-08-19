package com.mahel.security.service.exception;

import lombok.Getter;
import org.apache.commons.lang3.builder.ToStringBuilder;

@Getter
public enum ErrorCode {
    CUSTOM_INTERNAL_SERVER_ERROR("4000", "Custom Internal Service Failure"),
    RECORD_NOT_FOUND("5005", "Record Not Found"),
    VALIDATION_FAILURE("5010", "Validation Failure. Invalid Arguments"),
    VALIDATION_FAILURE_INVALID_FORMAT("5011", "Validation Failure. Invalid Format"), // Ex: Date fields
    VALIDATION_FAILURE_ARGUMENTS_TYPE_MISMATCH("5012", "Validation Failure. Arguments Type Mismatch"), // Ex: Path variable type mismatch
    INVALID_FORMAT("5015", "Invalid Format"),
    DUPLICATE_ENTRIES("5020", "Duplicate Entries"),
    BAD_REQUEST("5025", "Bad Request"),
    REQUEST_BODY_ITEM_NOT_FOUND("5030", "Request Body Item Not Found"),
    DELETION_BLOCKED_BY_RELATED_RECORDS("5035", "Deletion Blocked by Related Records"),
    INVALID_CREDENTIALS("5040", "Invalid Credentials");

    private final String code;
    private final String description;

    ErrorCode(String code, String description) {
        this.code = code;
        this.description = description;
    }


    @Override
    public String toString() {
        return new ToStringBuilder(this).append("code", code).append("description", description).toString();
    }
}
