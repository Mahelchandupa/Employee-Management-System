package com.mahel.security.service;

import com.mahel.security.dto.ResponseDTO;
import com.mahel.security.dto.employee.EmployeeSaveRequestDTO;
import com.mahel.security.dto.employee.EmployeeUpdateRequestDTO;
import com.mahel.security.dto.employee.EmployeeResponseDTO;
import com.mahel.security.dto.employee.EmployeeResponseListDTO;
import com.mahel.security.service.exception.DuplicateRecordException;
import com.mahel.security.service.exception.RecordNotFoundException;

public interface EmployeeService {

    EmployeeResponseDTO saveEmployee(EmployeeSaveRequestDTO employeeSaveRequestDTO) throws DuplicateRecordException;

    EmployeeResponseDTO updateEmployee(
            EmployeeUpdateRequestDTO employeeRequestDTO,
            Long id
    ) throws RecordNotFoundException;

    EmployeeResponseDTO findByEmployeeId(Long id) throws RecordNotFoundException;

    EmployeeResponseListDTO findAllEmployees();

    ResponseDTO deleteEmployee(Long id) throws RecordNotFoundException;

    EmployeeResponseDTO findByEmployeeEmail(String email) throws RecordNotFoundException;

    EmployeeResponseListDTO findAllEmployeesByRole(String role);

}
