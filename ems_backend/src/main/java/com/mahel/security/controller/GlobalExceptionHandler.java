package com.mahel.security.controller;

import com.mahel.security.dto.ErrorDTO;
import com.mahel.security.service.exception.*;
import com.mahel.security.service.exception.IllegalStateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

import static com.mahel.security.service.exception.ErrorCode.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    public static final String REQUEST_FAILED_WITH_INTERNAL_SERVER_ERROR =
            "Request Failed With Internal Server Error. Exception: {} Path: {}";

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // This exception handler will catch RecordNotFoundException throws
    @ExceptionHandler(RecordNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleNotFound(RecordNotFoundException recordNotFoundException) {
        logger.error("RecordNotFoundException: ", recordNotFoundException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(RECORD_NOT_FOUND.getCode());
        errorDTO.setMessage(
                recordNotFoundException.getMessage() != null && !recordNotFoundException.getMessage().isEmpty()
                        ? recordNotFoundException.getMessage()
                        : RECORD_NOT_FOUND.getDescription()
        );

        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorDTO> handleBadRequest(BadRequestException badRequestException) {
        logger.error("BadRequestException: ", badRequestException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(BAD_REQUEST.getCode());
        errorDTO.setMessage(
                badRequestException.getMessage() != null && !badRequestException.getMessage().isEmpty()
                        ? badRequestException.getMessage()
                        : BAD_REQUEST.getDescription()
        );

        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateRecordException.class)
    public ResponseEntity<ErrorDTO> handleDuplicateEntries(DuplicateRecordException duplicateRecordException) {
        logger.error("DuplicateRecordException: ", duplicateRecordException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(DUPLICATE_ENTRIES.getCode());
        errorDTO.setMessage(
                duplicateRecordException.getMessage() != null && !duplicateRecordException.getMessage().isEmpty()
                        ? duplicateRecordException.getMessage()
                        : DUPLICATE_ENTRIES.getDescription()
        );

        return new ResponseEntity<>(errorDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(RequestBodyItemNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleRequestBodyItemNotFound(RequestBodyItemNotFoundException requestBodyItemNotFoundException) {
        logger.error("RequestBodyItemNotFoundException: ", requestBodyItemNotFoundException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(REQUEST_BODY_ITEM_NOT_FOUND.getCode());
        errorDTO.setMessage(
                requestBodyItemNotFoundException.getMessage() != null && !requestBodyItemNotFoundException.getMessage().isEmpty()
                        ? requestBodyItemNotFoundException.getMessage()
                        : REQUEST_BODY_ITEM_NOT_FOUND.getDescription()
        );

        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DeletionBlockedByRelatedRecordsException.class)
    public ResponseEntity<ErrorDTO> handleDeletionBlockedByRelatedRecords(DeletionBlockedByRelatedRecordsException deletionBlockedByRelatedRecordsException) {
        logger.error("DeletionBlockedByRelatedRecordsException: ", deletionBlockedByRelatedRecordsException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(DELETION_BLOCKED_BY_RELATED_RECORDS.getCode());
        errorDTO.setMessage(
                deletionBlockedByRelatedRecordsException.getMessage() != null && !deletionBlockedByRelatedRecordsException.getMessage().isEmpty()
                        ? deletionBlockedByRelatedRecordsException.getMessage()
                        : DELETION_BLOCKED_BY_RELATED_RECORDS.getDescription()
        );

        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDTO> handleValidationExceptions(MethodArgumentNotValidException methodArgumentNotValidException) {
        Map<String, String> errors = new HashMap<>();
        methodArgumentNotValidException
                .getBindingResult()
                .getAllErrors()
                .forEach(
                        error -> {
                            String fieldName = ((FieldError) error).getField();
                            String errorMessage = error.getDefaultMessage();
                            errors.put(fieldName, errorMessage);
                        }
                );

        logger.error("MethodArgumentNotValidException: ", methodArgumentNotValidException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(VALIDATION_FAILURE.getCode());
        errorDTO.setMessage(VALIDATION_FAILURE.getDescription());
        errorDTO.setErrorData(errors);

        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorDTO> handleMethodArgumentTypeMismatch(
            MethodArgumentTypeMismatchException methodArgumentTypeMismatchException) {

        logger.error("MethodArgumentTypeMismatchException: ", methodArgumentTypeMismatchException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(VALIDATION_FAILURE_ARGUMENTS_TYPE_MISMATCH.getCode());
        errorDTO.setMessage(VALIDATION_FAILURE_ARGUMENTS_TYPE_MISMATCH.getDescription());

        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorDTO> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException httpMessageNotReadableException) {

        logger.error("HttpMessageNotReadableException: ", httpMessageNotReadableException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(VALIDATION_FAILURE_INVALID_FORMAT.getCode());
        errorDTO.setMessage(VALIDATION_FAILURE_INVALID_FORMAT.getDescription());

        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDTO> handleBadCredentialsException(
            BadCredentialsException badCredentialsException) {

        logger.error("BadCredentialsException: ", badCredentialsException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(INVALID_CREDENTIALS.getCode());
        errorDTO.setMessage(INVALID_CREDENTIALS.getDescription());

        return new ResponseEntity<>(errorDTO, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorDTO> handleIllegalStateException(
            IllegalStateException illegalStateException) {

        logger.error("IllegalStateException: ", illegalStateException);

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(INVALID_CREDENTIALS.getCode());
        errorDTO.setMessage(
                illegalStateException.getMessage() != null && !illegalStateException.getMessage().isEmpty()
                        ? illegalStateException.getMessage()
                        : INVALID_CREDENTIALS.getDescription()
        );
        return new ResponseEntity<>(errorDTO, HttpStatus.UNAUTHORIZED);
    }
}

