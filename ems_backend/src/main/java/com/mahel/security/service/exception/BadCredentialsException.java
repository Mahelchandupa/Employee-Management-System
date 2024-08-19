package com.mahel.security.service.exception;

import com.mahel.security.dto.ErrorDTO;

public class BadCredentialsException extends Exception{

    private final transient ErrorDTO errorDTO;

    public BadCredentialsException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public BadCredentialsException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }
}
