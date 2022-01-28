package org.boxproject.security;

import org.boxproject.models.BoxUser;
import org.boxproject.models.data.BoxUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class BoxUserService {
    @Autowired
    public BoxUserRepository userRepository;

    public BoxUser getBoxUser() throws Exception {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new Exception("User is not authorized!");
        }
        return userRepository.findByUsername(authentication.getName());
    }
}
