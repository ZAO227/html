package com.yunlong.bid.controller;

import com.yunlong.bid.dto.ApiResponse;
import com.yunlong.bid.dto.HomeStats;
import com.yunlong.bid.service.MaterialService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomeController {

  private final MaterialService materialService;

  public HomeController(MaterialService materialService) {
    this.materialService = materialService;
  }

  @GetMapping("/stats")
  public ApiResponse<HomeStats> stats() {
    return ApiResponse.ok(materialService.homeStats());
  }
}
