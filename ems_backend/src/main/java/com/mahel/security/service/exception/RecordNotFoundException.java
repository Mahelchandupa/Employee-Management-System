package com.mahel.security.service.exception;

import com.mahel.security.dto.ErrorDTO;
import lombok.Getter;

@Getter
public class RecordNotFoundException extends Exception {

    private final transient ErrorDTO errorDTO;

    public RecordNotFoundException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public RecordNotFoundException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }

}
