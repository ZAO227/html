package com.yunlong.bid.auth;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * 演示用简易 Token：Base64(userId:expireEpoch:secretHash)。
 * 生产环境请替换为 JWT 或 Session。
 */
@Service
public class TokenService {

  private final String secret;
  private final long ttlSeconds;
  private final Map<String, Long> tokens = new ConcurrentHashMap<>();

  public TokenService(
      @Value("${bid.token-secret}") String secret,
      @Value("${bid.token-ttl-hours:24}") long ttlHours) {
    this.secret = secret;
    this.ttlSeconds = ttlHours * 3600;
  }

  public String issue(Long userId) {
    long expire = Instant.now().getEpochSecond() + ttlSeconds;
    String raw = userId + ":" + expire + ":" + secret.hashCode();
    String token = Base64.getUrlEncoder().withoutPadding()
        .encodeToString(raw.getBytes(StandardCharsets.UTF_8));
    tokens.put(token, userId);
    return token;
  }

  public Long resolve(String token) {
    if (token == null || token.isBlank()) {
      return null;
    }
    Long cached = tokens.get(token);
    if (cached != null) {
      return cached;
    }
    try {
      String raw = new String(Base64.getUrlDecoder().decode(token), StandardCharsets.UTF_8);
      String[] parts = raw.split(":");
      if (parts.length != 3) {
        return null;
      }
      long expire = Long.parseLong(parts[1]);
      if (Instant.now().getEpochSecond() > expire) {
        return null;
      }
      if (!String.valueOf(secret.hashCode()).equals(parts[2])) {
        return null;
      }
      Long userId = Long.parseLong(parts[0]);
      tokens.put(token, userId);
      return userId;
    } catch (Exception e) {
      return null;
    }
  }

  public void revoke(String token) {
    if (token != null) {
      tokens.remove(token);
    }
  }
}
