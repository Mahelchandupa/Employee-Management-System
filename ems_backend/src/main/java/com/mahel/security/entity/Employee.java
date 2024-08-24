package com.mahel.security.entity;

import com.mahel.security.config.AesEncryptionConverter;
import com.mahel.security.entity.enums.Department;
import com.mahel.security.entity.enums.EmploymentStatus;
import com.mahel.security.entity.enums.Gender;
import com.mahel.security.entity.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Personal Details
    private String firstName;
    private String lastName;
    private String dob;
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(unique = true)
    @Convert(converter = AesEncryptionConverter.class)
    private String email;

    private String mobile;
    private String homePhone;
    @Column(length = 1000)
    private String address;
    private String postalCode;
    private String nic;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String city;

    //Job relate details
    private EmploymentStatus employmentStatus;
    private Department department;
    private String jobTitle;
    private double salary;
    private Integer workHours;

    //Banking Details
    @Convert(converter = AesEncryptionConverter.class)
    private String bank;
    @Convert(converter = AesEncryptionConverter.class)
    private String branch;
    @Convert(converter = AesEncryptionConverter.class)
    private String accName;
    @Convert(converter = AesEncryptionConverter.class)
    private String accNumber;

    private LocalDateTime createDatetime;

    private LocalDateTime updateDatetime;

    @PrePersist
    protected void onCreate() {
        updateDatetime = createDatetime = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updateDatetime = LocalDateTime.now();
    }
}
