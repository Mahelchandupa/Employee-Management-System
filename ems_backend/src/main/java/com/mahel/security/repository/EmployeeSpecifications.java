package com.mahel.security.repository;

import com.mahel.security.entity.Employee;
import com.mahel.security.entity.enums.Department;
import com.mahel.security.entity.enums.Role;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class EmployeeSpecifications {

    public static Specification<Employee> hasRole(Role role) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("role"), role);
    }

    public static Specification<Employee> hasDepartment(Department department) {
        return (root, query, criteriaBuilder) ->
                department != null ? criteriaBuilder.equal(root.get("department"), department) : criteriaBuilder.conjunction();
    }

    public static Specification<Employee> hasFirstNameLike(String firstName) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(firstName) ? criteriaBuilder.like(root.get("firstName"), "%" + firstName + "%") : criteriaBuilder.conjunction();
    }

    public static Specification<Employee> hasLastNameLike(String lastName) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(lastName) ? criteriaBuilder.like(root.get("lastName"), "%" + lastName + "%") : criteriaBuilder.conjunction();
    }
}
