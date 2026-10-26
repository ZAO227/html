package com.yunlong.bid.service;

import com.yunlong.bid.dto.HomeStats;
import com.yunlong.bid.dto.PageResult;
import com.yunlong.bid.entity.MaterialItem;
import com.yunlong.bid.mapper.MaterialItemMapper;
import org.springframework.stereotype.Service;

@Service
public class MaterialService {

  private final MaterialItemMapper materialItemMapper;

  public MaterialService(MaterialItemMapper materialItemMapper) {
    this.materialItemMapper = materialItemMapper;
  }

  public HomeStats homeStats() {
    return new HomeStats(
        materialItemMapper.countPending(),
        materialItemMapper.countPendingByDepartment("业务部"),
        materialItemMapper.countPendingByDepartment("财务部"),
        materialItemMapper.countPendingByDepartment("人事行政部"));
  }

  public PageResult<MaterialItem> list(
      String keyword, String department, String status, Boolean libraryOnly, int page, int pageSize) {
    int safePage = Math.max(page, 1);
    int safeSize = Math.min(Math.max(pageSize, 1), 100);
    int offset = (safePage - 1) * safeSize;
    var list = materialItemMapper.search(keyword, department, status, libraryOnly, offset, safeSize);
    long total = materialItemMapper.count(keyword, department, status, libraryOnly);
    return new PageResult<>(total, safePage, safeSize, list);
  }

  public MaterialItem upload(Long id) {
    MaterialItem item = materialItemMapper.findById(id);
    if (item == null) {
      throw new IllegalArgumentException("资料不存在");
    }
    String fileUrl = "/files/uploaded-" + id + ".pdf";
    materialItemMapper.markUploaded(id, fileUrl);
    return materialItemMapper.findById(id);
  }

  public MaterialItem get(Long id) {
    MaterialItem item = materialItemMapper.findById(id);
    if (item == null) {
      throw new IllegalArgumentException("资料不存在");
    }
    return item;
  }
}
