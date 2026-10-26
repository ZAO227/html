package com.yunlong.bid.controller;

import com.yunlong.bid.dto.ApiResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ApiResponse<Void> handleIllegalArgument(IllegalArgumentException e) {
    return ApiResponse.fail(e.getMessage());
  }

  @ExceptionHandler(Exception.class)
  public ApiResponse<Void> handleOther(Exception e) {
    return ApiResponse.fail("服务器错误：" + e.getMessage());
  }
}
