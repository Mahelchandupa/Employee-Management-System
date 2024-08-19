package com.mahel.security.dto.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponseDTO {

    private Long id;

    //Personal Details
    private String firstName;
    private String lastName;
    private String dob;
    private String gender;
    private String email;
    private String mobile;
    private String homePhone;
    private String address;
    private String postalCode;
    private String nic;
    private boolean firstAttempt;

    //Job relate details
    private String employmentStatus;
    private String department;
    private String jobTitle;
    private double salary;
    private Integer workHours;

    //Banking Details
    private String bank;
    private String branch;
    private String accName;
    private String accNumber;
}
