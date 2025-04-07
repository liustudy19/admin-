<template>
  <div class="users-container">
    <!-- 用户管理页面标题 -->
    <div class="page-header">
      <h2>用户管理</h2>
    </div>

    <!-- 用户筛选和操作区域 -->
    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="filterForm.role" placeholder="用户角色" clearable>
            <el-option
              v-for="(label, value) in userRoles"
              :key="value"
              :label="label"
              :value="value"
            />
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="filterForm.search"
            placeholder="搜索用户名称"
            clearable
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
      </el-row>
    </div>

    <!-- 用户列表 -->
    <el-table :data="usersList" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="用户ID" width="100" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          {{ userRoles[row.role] }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button-group>
            <el-button size="small" type="primary" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 定义用户角色类型
type UserRole = 'user' | 'admin' | 'sudo'

// 用户角色映射
const userRoles: Record<UserRole, string> = {
  user: '普通用户',
  admin: '管理员',
  sudo: '超级管理员'
}

// 定义用户接口
interface User {
  id: number
  username: string
  role: UserRole
  email: string
  createTime: string
}

// 筛选表单
const filterForm = reactive({
  role: '' as UserRole | '',
  search: ''
})

// 表格数据
const loading = ref(false)
const usersList = ref<User[]>([
  {
    id: 1,
    username: 'admin',
    role: 'admin',
    email: 'admin@example.com',
    createTime: '2023-01-01'
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handleSizeChange = (val: number) => {
  pageSize.value = val
  // 重新加载数据
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  // 重新加载数据
}

// 编辑用户
const handleEdit = (row: User) => {
  ElMessage.info('编辑用户：' + row.username)
}

// 删除用户
const handleDelete = (row: User) => {
  ElMessageBox.confirm(
    `确认删除用户 ${row.username} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<style scoped>
.users-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.filter-section {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>