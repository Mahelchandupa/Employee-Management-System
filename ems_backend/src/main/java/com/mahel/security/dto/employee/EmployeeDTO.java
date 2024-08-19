package com.mahel.security.dto.employee;

import com.mahel.security.entity.enums.EmploymentStatus;
import com.mahel.security.entity.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {

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
    private EmploymentStatus employmentStatus;
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
