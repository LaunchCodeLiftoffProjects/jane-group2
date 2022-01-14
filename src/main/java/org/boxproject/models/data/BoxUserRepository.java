package org.boxproject.models.data;

import org.boxproject.models.BoxUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxUserRepository extends CrudRepository<BoxUser, Long> {

    BoxUser findByUsername(String username);

}
