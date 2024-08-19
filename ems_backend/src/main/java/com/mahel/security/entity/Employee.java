package com.mahel.security.entity;

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
    private String email;
    private String mobile;
    private String homePhone;
    @Column(length = 1000)
    private String address;
    private String postalCode;
    private String nic;
    private boolean firstAttempt;
    private String password;
    private Role role;
    private String city;

    //Job relate details
    private EmploymentStatus employmentStatus;
    private Department department;
    private String jobTitle;
    private double salary;
    private Integer workHours;

    //Banking Details
    private String bank;
    private String branch;
    private String accName;
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
