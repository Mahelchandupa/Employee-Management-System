package com.mahel.security.service.exception;

import com.mahel.security.dto.ErrorDTO;
import lombok.Getter;

@Getter
public class DeletionBlockedByRelatedRecordsException extends Exception {

    private final transient ErrorDTO errorDTO;

    public DeletionBlockedByRelatedRecordsException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public DeletionBlockedByRelatedRecordsException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }
}
