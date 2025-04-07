<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="logo">
        <h3>WJ女装后台管理</h3>
      </div>
      <el-menu
        default-active="/dashboard"
        class="el-menu-vertical"
        :router="true"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/dashboard">
          <el-icon><DataLine /></el-icon>
          <span>控制台</span>
        </el-menu-item>
        <el-menu-item index="/goods">
          <el-icon><Goods /></el-icon>
          <span>商品管理</span>
        </el-menu-item>
        <el-menu-item index="/orders">
          <el-icon><List /></el-icon>
          <span>订单管理</span>
        </el-menu-item>
        <el-menu-item index="/users">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header>
        <div class="header-right">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userRoleLabel }}
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main>
        <div class="dashboard-container">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>商品总数</span>
                  </div>
                </template>
                <div class="card-value">2,345</div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>订单总数</span>
                  </div>
                </template>
                <div class="card-value">1,234</div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>用户总数</span>
                  </div>
                </template>
                <div class="card-value">3,456</div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>今日销售额</span>
                  </div>
                </template>
                <div class="card-value">￥12,345</div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { DataLine, Goods, List, User, ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const router = useRouter()

// 获取用户角色并转换为对应的中文显示
const userRoleLabel = ref((() => {
  const userRole = localStorage.getItem('userRole')
  const roleLabels: { [key: string]: string } = {
    user: '普通用户',
    admin: '管理员',
    superadmin: '超级管理员'
  }
  return roleLabels[userRole || ''] || '未知身份'
})())

const handleLogout = () => {
  // 清理本地存储
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('username')
  localStorage.removeItem('userRole')
  ElMessage.success('退出成功')
  // 重定向到登录页面
  router.push('/')
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b2f3a;
  color: #fff;
}

.logo h3 {
  margin: 0;
  font-size: 16px;
}

.el-aside {
  background-color: #304156;
  color: #333;
}

.el-menu {
  border-right: none;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #e6e6e6;
}

.header-right {
  float: right;
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  color: #333;
}

.dashboard-container {
  padding: 20px;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  text-align: center;
  padding: 20px 0;
}
</style>