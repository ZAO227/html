package com.yunlong.bid.service;

import com.yunlong.bid.auth.TokenService;
import com.yunlong.bid.dto.LoginResponse;
import com.yunlong.bid.dto.UserInfo;
import com.yunlong.bid.entity.SysUser;
import com.yunlong.bid.mapper.SysUserMapper;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final SysUserMapper userMapper;
  private final TokenService tokenService;

  public AuthService(SysUserMapper userMapper, TokenService tokenService) {
    this.userMapper = userMapper;
    this.tokenService = tokenService;
  }

  public LoginResponse login(String username, String password) {
    SysUser user = userMapper.findByUsername(username);
    if (user == null || !user.getPassword().equals(password)) {
      throw new IllegalArgumentException("账号或密码错误");
    }
    String token = tokenService.issue(user.getId());
    return new LoginResponse(token, toUserInfo(user));
  }

  public UserInfo currentUser(Long userId) {
    SysUser user = userMapper.findById(userId);
    if (user == null) {
      throw new IllegalArgumentException("用户不存在");
    }
    return toUserInfo(user);
  }

  private static UserInfo toUserInfo(SysUser user) {
    return new UserInfo(user.getId(), user.getUsername(), user.getDisplayName(), user.getDepartment());
  }
}
