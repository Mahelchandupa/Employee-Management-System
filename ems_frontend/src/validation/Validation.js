export function AddNewEmpValidation(values) {
  let errors = {};

  if (!values.firstname) {
    errors.firstname = "First name is required";
  } else if (values.firstname.length < 3) {
    errors.firstname = "first name must be at least 3 characters";
  }

  if (!values.lastname) {
    errors.lastname = "Last name is required";
  } else if (values.lastname.length < 3) {
    errors.lastname = "last name must be at least 3 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/^[\w-.]+@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/.test(values.email)
  ) {
    errors.email = "Email address is invalid";
  }

  // if (!values.password) {
  //   errors.password = "Password is required";
  // } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
  //   errors.password ="Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
  // }

  if (!values.role) {
    errors.role = "Role is required";
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
  // else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
  //   errors.password ="Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
  // }
  // else if (values.password.length < 6) {
  //   errors.password = "Password must be at least 6 characters";
  // }

  return errors;
}

export function ResetPasswordValidation(values) {
  let errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Current Password is required";
  } 
  // else if (values.currentPassword.length < 6) {
  //   errors.currentPassword = "Current Password must be at least 6 characters";
  // }

  if (!values.newPassword) {
    errors.newPassword = "New Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      values.newPassword
    )
  ) {
    errors.password =
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
