package com.yunlong.bid.mapper;

import com.yunlong.bid.entity.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SysUserMapper {
  SysUser findByUsername(@Param("username") String username);

  SysUser findById(@Param("id") Long id);
}
