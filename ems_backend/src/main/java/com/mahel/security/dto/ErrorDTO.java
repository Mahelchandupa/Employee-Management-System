package com.mahel.security.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDTO {

    @JsonProperty("code")
    private String code;

    @JsonProperty("message")
    private String message;

    @JsonProperty("error_data")
    private Object errorData;

    public ErrorDTO(String code) {
        this.code = code;
    }

    public ErrorDTO(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorDTO(String code, String message, List<String> errorData) {
        this.code = code;
        this.message = message;
        this.errorData = errorData;
    }
}
