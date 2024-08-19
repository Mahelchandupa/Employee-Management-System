package com.mahel.security.service.exception;

import com.mahel.security.dto.ErrorDTO;
import lombok.Getter;

@Getter
public class CustomInternalServerException extends RuntimeException {

    private final transient ErrorDTO errorDTO;

    public CustomInternalServerException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public CustomInternalServerException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }

}
