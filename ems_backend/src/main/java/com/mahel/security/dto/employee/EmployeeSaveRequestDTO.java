package com.mahel.security.dto.employee;

import com.mahel.security.entity.enums.Department;
import com.mahel.security.entity.enums.EmploymentStatus;
import com.mahel.security.entity.enums.Role;
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
public class EmployeeSaveRequestDTO {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    private String email;

    private String password;

    private Role role;

    @NotNull(message = "Employment Status is required")
    private EmploymentStatus employmentStatus;

    @NotNull(message = "Department is required")
    private Department department;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotNull(message = "Salary is required")
    private double salary;

    @NotNull(message = "Work hours is required")
    private Integer workHours;
}
