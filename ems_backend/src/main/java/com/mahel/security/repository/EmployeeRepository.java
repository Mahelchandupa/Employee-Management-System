package com.mahel.security.repository;

import com.mahel.security.entity.Employee;
import com.mahel.security.entity.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByEmail(String email);

    List<Employee> findAllByRole(Role role);
}
