package com.mahel.security.controller;

import com.mahel.security.dto.ResponseDTO;
import com.mahel.security.dto.employee.EmployeeSaveRequestDTO;
import com.mahel.security.dto.employee.EmployeeUpdateRequestDTO;
import com.mahel.security.dto.employee.EmployeeResponseDTO;
import com.mahel.security.dto.employee.EmployeeResponseListDTO;
import com.mahel.security.service.EmployeeService;
import com.mahel.security.service.exception.DuplicateRecordException;
import com.mahel.security.service.exception.RecordNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/api/v1/employees")
@PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // HR Manager adds a new employee
    @PostMapping
    @PreAuthorize("hasAuthority('employee:create')")
    public ResponseEntity<EmployeeResponseDTO> createEmployee(@RequestBody @Valid EmployeeSaveRequestDTO employeeSaveRequestDTO) throws DuplicateRecordException {

        EmployeeResponseDTO employeeResponseDTO = employeeService.saveEmployee(employeeSaveRequestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(employeeResponseDTO);
    }

    // Employee updates their own profile
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('employee:update')")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @RequestBody @Valid EmployeeUpdateRequestDTO employeeRequestDTO) throws RecordNotFoundException {

        EmployeeResponseDTO employeeResponseDTO = employeeService.updateEmployee(employeeRequestDTO, id);

        return ResponseEntity.ok(employeeResponseDTO);
    }

    // Employee views their own profile
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('employee:read')")
    public ResponseEntity<EmployeeResponseDTO> getEmployee(@PathVariable Long id) throws RecordNotFoundException {
        EmployeeResponseDTO employeeResponseDTO = employeeService.findByEmployeeId(id);
        return ResponseEntity.ok(employeeResponseDTO);
    }

    // Employee views their own profile
    @GetMapping("/email/{email}")
    @PreAuthorize("hasAuthority('employee:read')")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeByEmail(@PathVariable String email) throws RecordNotFoundException {
        EmployeeResponseDTO employeeResponseDTO = employeeService.findByEmployeeEmail(email);
        return ResponseEntity.ok(employeeResponseDTO);
    }

    // HR Manager only can view all employees
    @GetMapping
    @PreAuthorize("hasAuthority('employee:read')")
    public ResponseEntity<EmployeeResponseListDTO> getAllEmployees() {

        EmployeeResponseListDTO employeeResponseListDTO = employeeService.findAllEmployees();

        return ResponseEntity.ok(employeeResponseListDTO);
    }

    // HR Manager only can delete employee
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('employee:delete')")
    public ResponseEntity<ResponseDTO> deleteEmployee(@PathVariable Long id) throws RecordNotFoundException {

        ResponseDTO responseDTO = employeeService.deleteEmployee(id);

        return ResponseEntity.ok(responseDTO);
    }
}
