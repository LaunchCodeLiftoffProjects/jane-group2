package org.boxproject.models.dto;

import javax.validation.constraints.NotNull;

public class RegisterFormDTO extends LoginFormDTO {

    @NotNull
    private String verifyPassword;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }
}
