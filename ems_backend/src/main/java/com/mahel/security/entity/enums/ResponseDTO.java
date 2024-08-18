package com.mahel.security.entity.enums;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {
    private String response;
    private Object data;

    public ResponseDTO(String response){
        this.response = response;
    }
}