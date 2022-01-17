package org.boxproject.models.data;

import org.boxproject.models.BoxItem;
import org.springframework.data.repository.CrudRepository;

public interface BoxItemRepository extends CrudRepository<BoxItem, Long> {
}
