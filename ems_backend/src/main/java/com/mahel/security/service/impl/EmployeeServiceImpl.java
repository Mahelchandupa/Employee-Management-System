package com.mahel.security.service.impl;

import com.mahel.security.dto.ResponseDTO;
import com.mahel.security.dto.employee.*;
import com.mahel.security.entity.Employee;
import com.mahel.security.entity.User;
import com.mahel.security.exception.RecordNotFoundException;
import com.mahel.security.repository.EmployeeRepository;
import com.mahel.security.repository.UserRepository;
import com.mahel.security.service.EmployeeService;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final ModelMapper mapper;

    private final EmployeeRepository employeeRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final JavaMailSender javaMailSender;

    public EmployeeServiceImpl(ModelMapper mapper, EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder, UserRepository userRepository, MailSender mailSender, JavaMailSender mailSender1, JavaMailSender javaMailSender, JavaMailSender javaMailSender1) {
        this.mapper = mapper;
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public EmployeeResponseDTO saveEmployee(EmployeeSaveRequestDTO employeeSaveRequestDTO) {
        // Map DTO to entity
        Employee employee = mapper.map(employeeSaveRequestDTO, Employee.class);

        // Generate a random password
        String generatedPassword = generateSecurePassword();
        employee.setPassword(passwordEncoder.encode(generatedPassword));

        // Mark the first login attempt
        employee.setFirstAttempt(true);

        // Save employee
        employee = employeeRepository.save(employee);

        // Create User entity
        User user = new User();
        user.setFirstname(employee.getFirstName());
        user.setLastname(employee.getLastName());
        user.setEmail(employee.getEmail());
        user.setPassword(employee.getPassword());  // Already encoded
        user.setRole(employee.getRole());  // Set the role (e.g., EMPLOYEE)

        // Save user entity (you would have a UserRepository to save the user)
        userRepository.save(user);

        // Send credentials via email (implement this method)
        sendEmail(employee.getEmail(), generatedPassword);

        return mapper.map(employee, EmployeeResponseDTO.class);
    }

    private String generateSecurePassword() {
        SecureRandom random = new SecureRandom();

        // Define the character pools
        String upperCaseLetters = RandomStringUtils.random(1, 65, 90, true, true);
        String lowerCaseLetters = RandomStringUtils.random(1, 97, 122, true, true);
        String numbers = RandomStringUtils.randomNumeric(1);
        String specialCharacters = RandomStringUtils.random(1, 33, 47, false, false);
        String otherCharacters = RandomStringUtils.randomAlphanumeric(4);

        // Combine all character pools
        String combinedChars = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters + otherCharacters;

        // Shuffle the characters
        char[] passwordChars = combinedChars.toCharArray();
        for (int i = 0; i < passwordChars.length; i++) {
            int randomIndex = random.nextInt(passwordChars.length);
            char temp = passwordChars[i];
            passwordChars[i] = passwordChars[randomIndex];
            passwordChars[randomIndex] = temp;
        }

        return new String(passwordChars);
    }

    private void sendEmail(String toEmail, String password) {
        // Use JavaMailSender to send an email with the generated password
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your Account Details");
        message.setText("Welcome to the company! Your login credentials are:\nUsername: " + toEmail + "\nPassword: " + password);
        javaMailSender.send(message);
    }

    @Override
    public EmployeeResponseDTO updateEmployee(EmployeeUpdateRequestDTO employeeRequestDTO, Long id) throws RecordNotFoundException {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Employee Not Found"));

        employee.setFirstName(employeeRequestDTO.getFirstName());
        employee.setLastName(employeeRequestDTO.getLastName());
        employee.setDepartment(employeeRequestDTO.getDepartment());
        employee.setEmail(employeeRequestDTO.getEmail());
        employee.setMobile(employeeRequestDTO.getMobile());
        employee.setSalary(employeeRequestDTO.getSalary());
        employee.setJobTitle(employeeRequestDTO.getJobTitle());
        employee.setAccName(employeeRequestDTO.getAccName());
        employee.setAddress(employeeRequestDTO.getAddress());
        employee.setBank(employeeRequestDTO.getBank());
        employee.setAccNumber(employeeRequestDTO.getAccNumber());
        employee.setDob(employeeRequestDTO.getDob());
        employee.setEmploymentStatus(employeeRequestDTO.getEmploymentStatus());
        employee.setGender(employeeRequestDTO.getGender());
        employee.setHomePhone(employeeRequestDTO.getHomePhone());
        employee.setNic(employeeRequestDTO.getNic());
        employee.setPostalCode(employeeRequestDTO.getPostalCode());
        employee.setWorkHours(employeeRequestDTO.getWorkHours());
        employee.setCity(employeeRequestDTO.getCity());

        employee = employeeRepository.save(employee);

        return mapper.map(employee, EmployeeResponseDTO.class);
    }

    @Override
    public EmployeeResponseDTO findByEmployeeId(Long id) throws RecordNotFoundException {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(("Employee not found")));

        return mapper.map(employee, EmployeeResponseDTO.class);
    }

    @Override
    public EmployeeResponseListDTO findAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();

        List<EmployeeDTO> employeeDTOS = employees.stream()
                .map(employee -> mapper.map(employee, EmployeeDTO.class))
                .collect(Collectors.toList());

        EmployeeResponseListDTO employeeResponseListDTO = new EmployeeResponseListDTO();
        employeeResponseListDTO.setEmployees(employeeDTOS);
        employeeResponseListDTO.setTotalRecord(employeeDTOS.size());

        return employeeResponseListDTO;
    }

    @Override
    public ResponseDTO deleteEmployee(Long id) throws RecordNotFoundException {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Employee not found"));

        employeeRepository.delete(employee);

        return new ResponseDTO(String.format("Employee with id %d deleted successfully", id));
    }
}
