package com.yunlong.bid.controller;

import com.yunlong.bid.auth.AuthInterceptor;
import com.yunlong.bid.auth.TokenService;
import com.yunlong.bid.dto.ApiResponse;
import com.yunlong.bid.dto.LoginRequest;
import com.yunlong.bid.dto.LoginResponse;
import com.yunlong.bid.dto.UserInfo;
import com.yunlong.bid.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;
  private final TokenService tokenService;

  public AuthController(AuthService authService, TokenService tokenService) {
    this.authService = authService;
    this.tokenService = tokenService;
  }

  @PostMapping("/login")
  public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
    try {
      return ApiResponse.ok(authService.login(request.getUsername(), request.getPassword()));
    } catch (IllegalArgumentException e) {
      return ApiResponse.fail(e.getMessage());
    }
  }

  @GetMapping("/me")
  public ApiResponse<UserInfo> me(HttpServletRequest request) {
    Long userId = (Long) request.getAttribute(AuthInterceptor.ATTR_USER_ID);
    return ApiResponse.ok(authService.currentUser(userId));
  }

  @PostMapping("/logout")
  public ApiResponse<Void> logout(HttpServletRequest request) {
    String header = request.getHeader("Authorization");
    if (header != null && header.startsWith("Bearer ")) {
      tokenService.revoke(header.substring(7).trim());
    }
    return ApiResponse.ok(null);
  }
}
