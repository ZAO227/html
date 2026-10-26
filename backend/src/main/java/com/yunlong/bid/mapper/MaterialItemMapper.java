package com.yunlong.bid.mapper;

import com.yunlong.bid.entity.MaterialItem;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MaterialItemMapper {
  List<MaterialItem> search(
      @Param("keyword") String keyword,
      @Param("department") String department,
      @Param("status") String status,
      @Param("libraryOnly") Boolean libraryOnly,
      @Param("offset") int offset,
      @Param("limit") int limit);

  long count(
      @Param("keyword") String keyword,
      @Param("department") String department,
      @Param("status") String status,
      @Param("libraryOnly") Boolean libraryOnly);

  long countPending();

  long countPendingByDepartment(@Param("department") String department);

  MaterialItem findById(@Param("id") Long id);

  int markUploaded(@Param("id") Long id, @Param("fileUrl") String fileUrl);
}
