<template>
  <div class="goods-container">
    <!-- 商品管理页面标题 -->
    <div class="page-header">
      <h2>商品管理</h2>
    </div>

    <!-- 商品筛选和操作区域 -->
    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="filterForm.category" placeholder="商品分类" clearable>
            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="filterForm.search"
            placeholder="搜索商品名称"
            clearable
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6" class="text-right">
          <el-button type="primary" @click="handleAddGoods">
            <el-icon><Plus /></el-icon>添加商品
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 商品列表 -->
    <el-table :data="goodsList" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="商品ID" width="100" />
      <el-table-column label="商品图片" width="120">
        <template #default="{ row }">
          <el-image
            :src="row.image"
            :preview-src-list="[row.image]"
            fit="cover"
            class="goods-image"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="price" label="价格" width="120">
        <template #default="{ row }">
          ¥{{ row.price.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" width="120" />
      <el-table-column prop="sales" label="销量" width="120" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button-group>
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
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
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 商品分类选项
const categories = [
  { value: 'all', label: '全部' },
  { value: 'tops', label: '上衣' },
  { value: 'pants', label: '裤子' },
  { value: 'suits', label: '套装' },
  { value: 'coats', label: '外套' },
  { value: 'shorts', label: '短裤' },
  { value: 'jeans', label: '牛仔' }
]

// 筛选表单
const filterForm = reactive({
  category: '',
  search: ''
})

// 列表数据
const loading = ref(false)
const goodsList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 模拟商品数据
let mockGoodsList = [
  // 模拟数据
  {
    id: 1,
    name: '休闲T恤+时尚牛仔裤套装',
    category: '套装',
    price: 308,
    stock: 100,
    sales: 2000,
    image: '/img/list/1-1.png'
  },
  {
    id: 2,
    name: '时尚运动套装',
    category: '套装',
    price: 258,
    stock: 80,
    sales: 1500,
    image: '/img/list/1-2.png'
  },
  {
    id: 3,
    name: '休闲牛仔外套',
    category: '外套',
    price: 199,
    stock: 120,
    sales: 800,
    image: '/img/list/1-3.png'
  },
  {
    id: 4,
    name: '夏季轻薄牛仔裤',
    category: '牛仔',
    price: 159,
    stock: 150,
    sales: 1200,
    image: '/img/list/1-4.png'
  },
  {
    id: 5,
    name: '简约纯色T恤',
    category: '上衣',
    price: 99,
    stock: 200,
    sales: 2500,
    image: '/img/list/1-5.png'
  },
  {
    id: 6,
    name: '休闲运动短裤',
    category: '短裤',
    price: 129,
    stock: 180,
    sales: 900,
    image: '/img/list/1-6.png'
  },
  {
    id: 7,
    name: '时尚连帽卫衣',
    category: '外套',
    price: 229,
    stock: 90,
    sales: 1800,
    image: '/img/list/1-7.png'
  },
  {
    id: 8,
    name: '修身西装套装',
    category: '套装',
    price: 599,
    stock: 50,
    sales: 300,
    image: '/img/list/1-8.png'
  }
]

// 获取商品列表
const fetchGoodsList = async () => {
  loading.value = true
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟搜索和分类筛选
    let filteredList = [...mockGoodsList]
    
    if (filterForm.category && filterForm.category !== 'all') {
      filteredList = filteredList.filter(item => item.category === filterForm.category)
    }
    
    if (filterForm.search) {
      const keyword = filterForm.search.toLowerCase()
      filteredList = filteredList.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
      )
    }
    
    // 计算分页
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    goodsList.value = filteredList.slice(start, end)
    total.value = filteredList.length
  } catch (error) {
    ElMessage.error('获取商品列表失败')
  } finally {
    loading.value = false
  }
}


// 页码改变
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  fetchGoodsList()
}

// 每页条数改变
const handleSizeChange = (size: number) => {
  pageSize.value = size
  fetchGoodsList()
}

// 添加商品
const handleAddGoods = () => {
  ElMessageBox.alert('添加商品功能正在开发中', '提示', {
    confirmButtonText: '确定',
    type: 'info'
  })
}

// 编辑商品
const handleEdit = (row: any) => {
  ElMessageBox.alert(`编辑商品：${row.name}`, '提示', {
    confirmButtonText: '确定',
    type: 'info'
  })
}

// 删除商品
const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确认删除商品：${row.name}？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      loading.value = true
      // 模拟删除操作
      await new Promise(resolve => setTimeout(resolve, 500))
      mockGoodsList = mockGoodsList.filter(item => item.id !== row.id)
      ElMessage.success('删除成功')
      fetchGoodsList()
    } catch (error) {
      ElMessage.error('删除失败')
    } finally {
      loading.value = false
    }
  })
}

onMounted(() => {
  fetchGoodsList()
})
</script>

<style scoped>
.goods-container {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.page-header {
  margin-bottom: 24px;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 16px;
}

.page-header h2 {
  font-size: 20px;
  color: #303133;
  margin: 0;
}

.filter-section {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.search-input {
  width: 100%;
}

.text-right {
  text-align: right;
}

.goods-image {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
  transition: transform 0.3s;
  cursor: pointer;
}

.goods-image:hover {
  transform: scale(1.05);
}

.pagination-container {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}
</style>