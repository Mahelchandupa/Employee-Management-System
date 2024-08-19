package com.mahel.security.service.exception;

import com.mahel.security.dto.ErrorDTO;
import lombok.Getter;

@Getter
public class BadRequestException extends Exception{

    private final transient ErrorDTO errorDTO;

    public BadRequestException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public BadRequestException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }

}
