package com.mahel.security.repository;

import com.mahel.security.entity.Employee;
import com.mahel.security.entity.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {

    Employee findByEmail(String email);

    List<Employee> findAllByRole(Role role);
}
