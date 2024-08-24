package com.mahel.security.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.util.Base64;
import java.util.Date;

@Service
public class BackupService {

    private final BackupConfig backupConfig;

    public BackupService(BackupConfig backupConfig) {
        this.backupConfig = backupConfig;
    }

    @Scheduled(cron = "${backup.schedule}")
    public void performBackup() {
        try {
            // Perform the MySQL backup using a system command
            String backupFileName = backupConfig.getFilePrefix() + new Date().getTime() + ".sql";
            String backupFilePath = backupConfig.getBackupDirectory() + backupFileName;

            // Run the mysqldump command
            ProcessBuilder pb = new ProcessBuilder(
                    "mysqldump", "-u", "root", "-pMahel@1234", "spring_security_db",
                    "-r", backupFilePath);
            pb.start().waitFor();

            // Encrypt the file if encryption is enabled
            if (backupConfig.isEncryptionEnabled()) {
                encryptBackupFile(backupFilePath);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void encryptBackupFile(String backupFilePath) throws Exception {
        File backupFile = new File(backupFilePath);
        byte[] fileBytes = Files.readAllBytes(backupFile.toPath());

        SecretKey secretKey = new SecretKeySpec(Base64.getDecoder().decode(backupConfig.getEncryptionKey()), backupConfig.getEncryptionAlgorithm());
        Cipher cipher = Cipher.getInstance(backupConfig.getEncryptionAlgorithm());
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptedBytes = cipher.doFinal(fileBytes);

        try (FileOutputStream fos = new FileOutputStream(backupFilePath + ".enc")) {
            fos.write(encryptedBytes);
        }

        // Optionally delete the unencrypted backup file
        backupFile.delete();
    }
}
