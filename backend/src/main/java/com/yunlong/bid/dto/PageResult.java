package com.yunlong.bid.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageResult<T> {
  private long total;
  private int page;
  private int pageSize;
  private List<T> list;
}
