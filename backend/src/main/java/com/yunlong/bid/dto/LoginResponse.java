package com.yunlong.bid.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
  private String token;
  private UserInfo user;
}
