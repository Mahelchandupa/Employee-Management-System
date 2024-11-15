package com.mahel.security.entity.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.mahel.security.entity.enums.Permission.*;

@RequiredArgsConstructor
public enum Role {

  USER(Collections.emptySet()),
  ADMIN(
          Set.of(
                  MANAGER_CREATE,
                  MANAGER_READ,
                  MANAGER_DELETE,
                  MANAGER_UPDATE,
                  EMPLOYEE_READ
          )
  ),
  MANAGER(
          Set.of(
                  EMPLOYEE_READ,
                  EMPLOYEE_UPDATE,
                  EMPLOYEE_CREATE,
                  EMPLOYEE_DELETE
          )
  ),
  EMPLOYEE(
          Set.of(
                  EMPLOYEE_READ,
                  EMPLOYEE_UPDATE
          )
  );

  @Getter
  private final Set<Permission> permissions;

  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions()
            .stream()
            .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
            .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}
