package com.yunlong.bid.controller;

import com.yunlong.bid.dto.ApiResponse;
import com.yunlong.bid.dto.PageResult;
import com.yunlong.bid.entity.MaterialItem;
import com.yunlong.bid.service.MaterialService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/materials")
public class MaterialController {

  private final MaterialService materialService;

  public MaterialController(MaterialService materialService) {
    this.materialService = materialService;
  }

  @GetMapping
  public ApiResponse<PageResult<MaterialItem>> list(
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false) String department,
      @RequestParam(required = false) String status,
      @RequestParam(required = false, defaultValue = "false") Boolean libraryOnly,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int pageSize) {
    return ApiResponse.ok(
        materialService.list(keyword, department, status, libraryOnly, page, pageSize));
  }

  @GetMapping("/{id}")
  public ApiResponse<MaterialItem> detail(@PathVariable Long id) {
    try {
      return ApiResponse.ok(materialService.get(id));
    } catch (IllegalArgumentException e) {
      return ApiResponse.fail(e.getMessage());
    }
  }

  @PostMapping("/{id}/upload")
  public ApiResponse<MaterialItem> upload(@PathVariable Long id) {
    try {
      return ApiResponse.ok(materialService.upload(id));
    } catch (IllegalArgumentException e) {
      return ApiResponse.fail(e.getMessage());
    }
  }
}
