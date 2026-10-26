package com.yunlong.bid.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HomeStats {
  private long totalPending;
  private long businessPending;
  private long financePending;
  private long hrPending;
}
