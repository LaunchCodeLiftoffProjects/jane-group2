package org.boxproject.controllers;

import org.boxproject.models.BoxUser;
import org.boxproject.models.LoginResponse;
import org.boxproject.models.LoginResponseUser;
import org.boxproject.models.RegistrationResponse;
import org.boxproject.models.data.BoxUserRepository;
import org.boxproject.models.dto.LoginFormDTO;
import org.boxproject.models.dto.RegisterFormDTO;
import org.boxproject.security.JwtUserDetailsService;
import org.boxproject.security.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private static final int minUsernameLength = 4;
    private static final int maxUsernameLength = 32;

    private static final int minPasswordLength = 4;
    private static final int maxPasswordLength = 32;

    @Autowired
    public BoxUserRepository userRepository;

    @Autowired
    public JwtTokenService jwtTokenService;

    @Autowired
    public JwtUserDetailsService userDetailsService;

    @Autowired
    public AuthenticationManager authenticationManager;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @PostMapping("/api/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegisterFormDTO dto) {
        // must be posted as application/json

        System.out.printf("Register Request [email: %s, user: %s, pass: %s, verify password: %s]%n",
                dto.getEmail(), dto.getUsername(), dto.getPassword(), dto.getVerifyPassword());

        if (userRepository.findByEmail(dto.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegistrationResponse("Email is already in use."));
        }

        if (userRepository.findByUsername(dto.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegistrationResponse("Username is already taken."));
        }

        if (dto.getUsername().length() < minUsernameLength) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegistrationResponse("Username is too short."));
        }

        if (dto.getPassword().length() < minPasswordLength) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegistrationResponse("Password is too short."));
        }

        if (dto.getUsername().length() > maxUsernameLength) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegistrationResponse("Username is too long."));
        }

        if (dto.getPassword().length() > maxPasswordLength) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegistrationResponse("Password is too long."));
        }

        if (!dto.getPassword().equals(dto.getVerifyPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegistrationResponse("Passwords do not match."));
        }

        userRepository.save(new BoxUser(dto.getEmail(), dto.getUsername(), passwordEncoder.encode(dto.getPassword())));

        return ResponseEntity.ok(new RegistrationResponse("Registration successful!"));
    }

    @PostMapping("/api/auth")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginFormDTO dto) throws Exception {
        // must be posted as application/json

        System.out.printf("Auth Request [user: %s, pass: %s]%n",
                dto.getUsername(), dto.getPassword());

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LoginResponse("Your account has been disabled.", null));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LoginResponse("Invalid credentials.", null));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getUsername());
        final String token = jwtTokenService.generateToken(userDetails);

        System.out.println("Auth success! Token: " + token);

        return ResponseEntity.ok(new LoginResponse("Login successful!", new LoginResponseUser(userDetails.getUsername(), token)));
    }
}
