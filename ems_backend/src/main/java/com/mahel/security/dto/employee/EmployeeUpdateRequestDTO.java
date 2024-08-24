package com.mahel.security.dto.employee;

import com.mahel.security.entity.enums.Department;
import com.mahel.security.entity.enums.EmploymentStatus;
import com.mahel.security.entity.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeUpdateRequestDTO {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    private String email;

//    @NotBlank(message = "Mobile is required")
    private String mobile;

//    @NotBlank(message = "Date of birth is required")
    private String dob;

//    @NotNull(message = "Gender is required")
    private Gender gender;

//    @NotBlank(message = "Home mobile is required")
    private String homePhone;

//    @NotBlank(message = "Address is required")
    private String address;

    private String postalCode;

    private String city;

//    @NotBlank(message = "NIC is required")
    private String nic;


    //
//    @NotNull(message = "Employment Status is required")
    private EmploymentStatus employmentStatus;

//    @NotNull(message = "Department is required")
    private Department department;

//    @NotBlank(message = "Job title is required")
    private String jobTitle;

//    @NotNull(message = "Salary is required")
    private double salary;

//    @NotNull(message = "Work hours is required")
    private Integer workHours;

    //Banking Details
//    @NotBlank(message = "Bank is required")
    private String bank;
//    @NotBlank(message = "Branch is required")
    private String branch;
//    @NotBlank(message = "Acc name is required")
    private String accName;
//    @NotBlank(message = "Acc number is required")
    private String accNumber;
}
