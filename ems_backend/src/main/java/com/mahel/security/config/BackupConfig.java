package com.mahel.security.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BackupConfig {

    @Value("${backup.directory}")
    private String backupDirectory;

    @Value("${backup.file-prefix}")
    private String filePrefix;

    @Value("${backup.schedule}")
    private String backupSchedule;

    @Value("${encryption.algorithm}")
    private String encryptionAlgorithm;

    @Value("${encryption.key}")
    private String encryptionKey;

    @Value("${encryption.enable}")
    private boolean encryptionEnabled;

    // Getters
    public String getBackupDirectory() { return backupDirectory; }
    public String getFilePrefix() { return filePrefix; }
    public String getBackupSchedule() { return backupSchedule; }
    public String getEncryptionAlgorithm() { return encryptionAlgorithm; }
    public String getEncryptionKey() { return encryptionKey; }
    public boolean isEncryptionEnabled() { return encryptionEnabled; }
}

