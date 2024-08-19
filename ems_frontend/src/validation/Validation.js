export function RegisterNewEmpValidation(values) {
  let errors = {};

  if (!values.firstName) {
    errors.firstName = "First name is required";
  } else if (values.firstName.length < 3) {
    errors.firstName = "first name must be at least 3 characters";
  }

  if (!values.lastName) {
    errors.lastName = "Last name is required";
  } else if (values.lastName.length < 3) {
    errors.lastName = "last name must be at least 3 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/^[\w-.]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Email address is invalid";
  }

  if (!values.role) {
    errors.role = "Role is required";
  }

  if (!values.employmentStatus) {
    errors.employmentStatus = "Employment status is required";
  }

  if (!values.department) {
    errors.department = "Department is required";
  }

  if (!values.jobTitle) {
    errors.jobTitle = "Job title is required";
  }

  if (!values.salary) {
    errors.salary = "Salary is required";
  }

  if (!values.workHours) {
    errors.workHours = "Work hours is required";
  }

  return errors;
}

export function LoginValidation(values) {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/^[\w-.]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function ResetPasswordValidation(values) {
  let errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Current Password is required";
  } 

  if (!values.newPassword) {
    errors.newPassword = "newPassword is required";
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.newPassword)) {
    errors.newPassword ="Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
  }

  if (!values.confirmationPassword) {
    errors.confirmationPassword = "Confirm Password is required";
  } else if (values.confirmationPassword !== values.newPassword) {
    errors.confirmationPassword = "Passwords do not match";
  }

  return errors;
}
