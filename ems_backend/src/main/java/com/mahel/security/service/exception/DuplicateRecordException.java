package com.mahel.security.service.exception;

import com.mahel.security.dto.ErrorDTO;
import lombok.Getter;

@Getter
public class DuplicateRecordException extends Exception {

    private final transient ErrorDTO errorDTO;

    public DuplicateRecordException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public DuplicateRecordException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }

}
