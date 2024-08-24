package com.mahel.security.config;


import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.beans.factory.annotation.Value;

@Converter
public class AesEncryptionConverter implements AttributeConverter<String, String> {

    private final AESUtil aesUtil;


    public AesEncryptionConverter(@Value("${application.security.jwt.encryption-key}") String encryptionKey) {
        try {
            this.aesUtil = new AESUtil(encryptionKey);
        } catch (Exception e) {
            throw new RuntimeException("Could not initialize AESUtil", e);
        }
    }

    @Override
    public String convertToDatabaseColumn(String attribute) {
        try {
            return aesUtil.encrypt(attribute);
        } catch (Exception e) {
            throw new RuntimeException("Could not encrypt data", e);
        }
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        try {
            return aesUtil.decrypt(dbData);
        } catch (Exception e) {
            throw new RuntimeException("Could not decrypt data", e);
        }
    }
}