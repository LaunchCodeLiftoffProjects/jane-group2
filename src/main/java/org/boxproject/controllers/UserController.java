package org.boxproject.controllers;

import org.boxproject.models.BoxUser;
import org.boxproject.models.LoginResponse;
import org.boxproject.models.LoginResponseUser;
import org.boxproject.models.data.BoxUserRepository;
import org.boxproject.models.dto.LoginFormDTO;
import org.boxproject.models.dto.RegisterFormDTO;
import org.boxproject.security.JwtUserDetailsService;
import org.boxproject.security.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String register(@RequestBody RegisterFormDTO dto) {
        // must be posted as application/json

        System.out.println(String.format("Register Request [user: %s, pass: %s, verify password: %s]", dto.getUsername(), dto.getPassword(), dto.getVerifyPassword()));

        // TODO: proper error response

        if (!dto.getPassword().equals(dto.getVerifyPassword())) {
            return "NOK";
        }

        BoxUser user = new BoxUser(dto.getUsername(), passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);

        return "OK";
    }

    @PostMapping("/api/auth")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginFormDTO dto) throws Exception {
        // must be posted as application/json

        System.out.println(String.format("Auth Request [user: %s, pass: %s]", dto.getUsername(), dto.getPassword()));

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        } catch (DisabledException e) {
            return ResponseEntity.ok(new LoginResponse(false, "Your account has been disabled.", null));
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok(new LoginResponse(false, "Invalid credentials.", null));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getUsername());
        final String token = jwtTokenService.generateToken(userDetails);

        System.out.println("Auth success! Token: " + token);

        return ResponseEntity.ok(new LoginResponse(true, "Login successful", new LoginResponseUser(userDetails.getUsername(), token)));
    }
}
