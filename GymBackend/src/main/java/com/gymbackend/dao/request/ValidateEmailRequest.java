package com.gymbackend.dao.request;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ValidateEmailRequest {
    private String email;
}
