package com.yunlong.bid.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yunlong.bid.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {

  public static final String ATTR_USER_ID = "userId";

  private final TokenService tokenService;
  private final ObjectMapper objectMapper;

  public AuthInterceptor(TokenService tokenService, ObjectMapper objectMapper) {
    this.tokenService = tokenService;
    this.objectMapper = objectMapper;
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
      return true;
    }
    String header = request.getHeader("Authorization");
    String token = null;
    if (header != null && header.startsWith("Bearer ")) {
      token = header.substring(7).trim();
    }
    Long userId = tokenService.resolve(token);
    if (userId == null) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.setContentType(MediaType.APPLICATION_JSON_VALUE);
      response.setCharacterEncoding("UTF-8");
      objectMapper.writeValue(response.getWriter(), ApiResponse.fail("未登录或登录已过期"));
      return false;
    }
    request.setAttribute(ATTR_USER_ID, userId);
    return true;
  }
}
