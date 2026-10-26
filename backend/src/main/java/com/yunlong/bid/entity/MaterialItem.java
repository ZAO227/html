package com.yunlong.bid.entity;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class MaterialItem {
  private Long id;
  private String name;
  private String projectName;
  private String department;
  private String category;
  private String requirement;
  private String status;
  private Boolean library;
  private String fileUrl;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
