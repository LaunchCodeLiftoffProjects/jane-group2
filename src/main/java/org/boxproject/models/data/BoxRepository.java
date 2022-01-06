package org.boxproject.models.data;

import org.boxproject.models.Box;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoxRepository extends CrudRepository<Box, Long> {
}
