package org.boxproject.models;

import com.sun.istack.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
public class BoxUser extends AbstractEntity implements UserDetails {

    @NotNull
    private String email;

    @NotNull
    private String username;

    @NotNull
    private String password;

    @OneToMany
    @JoinColumn(name = "box_user_id")
    private final List<Category> categories= new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "box_user_id")
    private final List<Box> boxes = new ArrayList<>();

    public BoxUser() {}

    public BoxUser(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public List<Box> getBoxes() {
        return boxes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
