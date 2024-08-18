export const ROLES = {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_MANAGER: 'ROLE_MANAGER',
    ROLE_EMPLOYEE: 'ROLE_EMPLOYEE',
}

export const PERMISSIONS = {
    ADMIN_READ : "admin:read" ,
    ADMIN_UPDATE : "admin:update" ,
    ADMIN_CREATE : "admin:create" ,
    ADMIN_DELETE : "admin:delete" ,

    MANAGER_READ : "management:read" ,
    MANAGER_UPDATE : "management:update" ,
    MANAGER_CREATE : "management:create" ,
    MANAGER_DELETE : "management:delete" ,

    EMPLOYEE_READ : "employee:read" ,
    EMPLOYEE_UPDATE : "employee:update" ,
    EMPLOYEE_CREATE : "employee:create" ,
    EMPLOYEE_DELETE : "employee:delete"
}