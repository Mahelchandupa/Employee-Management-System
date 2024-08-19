package com.mahel.security.service.exception;

import com.mahel.security.dto.ErrorDTO;
import lombok.Getter;

@Getter
public class RequestBodyItemNotFoundException extends Exception {

    private final transient ErrorDTO errorDTO;

    public RequestBodyItemNotFoundException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public RequestBodyItemNotFoundException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }
}
