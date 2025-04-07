<template>
  <div class="login-container">
    <div class="login-box">
      <h2>WJ自制女装品牌店后台管理系统</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="role">
          <el-select
            v-model="loginForm.role"
            placeholder="请选择身份"
            @change="handleRoleChange"
            class="role-select"
          >
            <el-option
              v-for="(value, key) in userRoles"
              :key="key"
              :label="getRoleLabel(key)"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="User"
            disabled
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleLogin" class="login-button">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface UserRoles {
  [key: string]: string
}

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const userRoles: UserRoles = {
  user: 'user',
  admin: 'admin',
  sudo: 'superadmin'
}

const loginForm = reactive({
  role: '',
  username: '',
  password: '123456'
})

// 组件挂载时重置表单
onMounted(() => {
  if (loginFormRef.value) {
    loginFormRef.value.resetFields()
  }
})

const rules: FormRules = reactive({
  role: [
    { required: true, message: '请选择身份', trigger: 'change' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const getRoleLabel = (role: string): string => {
  const labels: { [key: string]: string } = {
    user: '普通用户',
    admin: '管理员',
    sudo: '超级管理员'
  }
  return labels[role] || role
}

const handleRoleChange = (role: string) => {
  loginForm.username = role
}

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      const correctPassword = '123456'
      
      if (loginForm.role && loginForm.password === correctPassword) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('username', loginForm.username)
        localStorage.setItem('userRole', userRoles[loginForm.role])
        ElMessage.success('登录成功')
        router.push('/dashboard')
      } else {
        ElMessage.error('用户名或密码错误')
      }
      
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.login-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 4px;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.login-button {
  width: 100%;
}

.role-select {
  width: 100%;
}
</style>