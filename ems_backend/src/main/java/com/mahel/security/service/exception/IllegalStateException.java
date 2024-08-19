package com.mahel.security.service.exception;

import com.mahel.security.dto.ErrorDTO;

public class IllegalStateException extends Exception{

    private final transient ErrorDTO errorDTO;

    public IllegalStateException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public IllegalStateException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }
}
