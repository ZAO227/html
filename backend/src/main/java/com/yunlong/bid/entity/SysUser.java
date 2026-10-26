package com.yunlong.bid.entity;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class SysUser {
  private Long id;
  private String username;
  private String password;
  private String displayName;
  private String department;
  private LocalDateTime createdAt;
}
