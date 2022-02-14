package org.boxproject.models.dto;

import lombok.Getter;
import lombok.Setter;

public class BoxItemDTO {

    @Getter
    @Setter
    private Long itemId;

    @Getter
    @Setter
    private String itemName;

    @Getter
    @Setter
    private int itemQuantity;

}
