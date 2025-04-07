<template>
  <div class="orders-container">
    <!-- 订单管理页面标题 -->
    <div class="page-header">
      <h2>订单管理</h2>
    </div>

    <!-- 订单筛选区域 -->
    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="filterForm.status" placeholder="订单状态" clearable>
            <el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="filterForm.orderNo"
            placeholder="搜索订单号"
            clearable
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-col>
      </el-row>
    </div>

    <!-- 订单列表 -->
    <el-table :data="orderList" style="width: 100%" v-loading="loading">
      <el-table-column prop="orderNo" label="订单号" width="180" />
      <el-table-column prop="createTime" label="下单时间" width="180" />
      <el-table-column label="商品信息">
        <template #default="{ row }">
          <div v-for="item in row.items" :key="item.id" class="order-item">
            <el-image :src="item.image" :preview-src-list="[item.image]" fit="cover" class="product-image" />
            <div class="product-info">
              <p>{{ item.name }}</p>
              <p class="product-price">¥{{ item.price.toFixed(2) }} × {{ item.quantity }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="订单金额" width="120">
        <template #default="{ row }">
          ¥{{ row.totalAmount.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="订单状态" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button-group>
            <el-button type="primary" size="small" @click="handleDetail(row)">
              详情
            </el-button>
            <el-button 
              v-if="row.status === 'pending'"
              type="success" 
              size="small" 
              @click="handleShip(row)"
            >
              发货
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

    <!-- 订单详情对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="订单详情"
      width="600px"
    >
      <div v-if="currentOrder" class="order-detail">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="订单号">{{ currentOrder.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="下单时间">{{ currentOrder.createTime }}</el-descriptions-item>
          <el-descriptions-item label="订单状态">{{ getStatusLabel(currentOrder.status) }}</el-descriptions-item>
          <el-descriptions-item label="收货人">{{ currentOrder.receiver }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ currentOrder.phone }}</el-descriptions-item>
          <el-descriptions-item label="收货地址">{{ currentOrder.address }}</el-descriptions-item>
          <el-descriptions-item label="订单金额">¥{{ currentOrder.totalAmount.toFixed(2) }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 订单状态选项
const orderStatus = [
  { value: 'all', label: '全部' },
  { value: 'pending', label: '待发货' },
  { value: 'shipped', label: '已发货' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' }
]

// 筛选表单
const filterForm = reactive({
  status: '',
  orderNo: '',
  dateRange: []
})

// 列表数据
const loading = ref(false)
const orderList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 详情对话框
const detailDialogVisible = ref(false)
const currentOrder = ref(null)

// 获取订单列表
const fetchOrderList = async () => {
  loading.value = true
  try {
    // TODO: 调用后端API获取订单列表
    // const { data } = await api.getOrderList({
    //   page: currentPage.value,
    //   pageSize: pageSize.value,
    //   status: filterForm.status,
    //   orderNo: filterForm.orderNo,
    //   startDate: filterForm.dateRange[0],
    //   endDate: filterForm.dateRange[1]
    // })
    // orderList.value = data.list
    // total.value = data.total

    // 模拟数据
    orderList.value = [
      {
        orderNo: 'ORDER202312010001',
        createTime: '2023-12-01 10:00:00',
        status: 'pending',
        totalAmount: 308,
        items: [
          {
            id: 1,
            name: '休闲T恤+时尚牛仔裤套装',
            price: 308,
            quantity: 1,
            image: '/img/list/1-1.png'
          }
        ],
        receiver: '张三',
        phone: '13800138000',
        address: '北京市朝阳区xxx街道xxx号'
      },
      {
        orderNo: 'ORDER202312010002',
        createTime: '2023-12-01 11:30:00',
        status: 'shipped',
        totalAmount: 516,
        items: [
          {
            id: 2,
            name: '时尚运动套装',
            price: 258,
            quantity: 2,
            image: '/img/list/2-1.png'
          }
        ],
        receiver: '李四',
        phone: '13900139000',
        address: '上海市浦东新区xxx路xxx号'
      },
      {
        orderNo: 'ORDER202312010003',
        createTime: '2023-12-01 14:20:00',
        status: 'completed',
        totalAmount: 899,
        items: [
          {
            id: 3,
            name: '高级商务西装套装',
            price: 899,
            quantity: 1,
            image: '/img/list/3-1.png'
          }
        ],
        receiver: '王五',
        phone: '13700137000',
        address: '广州市天河区xxx路xxx号'
      },
      {
        orderNo: 'ORDER202312010004',
        createTime: '2023-12-01 16:45:00',
        status: 'pending',
        totalAmount: 656,
        items: [
          {
            id: 4,
            name: '时尚休闲套装',
            price: 328,
            quantity: 2,
            image: '/img/list/1-2.png'
          }
        ],
        receiver: '赵六',
        phone: '13600136000',
        address: '深圳市南山区xxx街xxx号'
      },
      {
        orderNo: 'ORDER202312010005',
        createTime: '2023-12-01 17:30:00',
        status: 'cancelled',
        totalAmount: 1299,
        items: [
          {
            id: 5,
            name: '高端定制西服',
            price: 1299,
            quantity: 1,
            image: '/img/list/3-2.png'
          }
        ],
        receiver: '孙七',
        phone: '13500135000',
        address: '成都市武侯区xxx街xxx号'
      }
    ]
    total.value = 100
  } catch (error) {
    ElMessage.error('获取订单列表失败')
  } finally {
    loading.value = false
  }
}

// 获取状态标签类型
const getStatusType = (status: string) => {
  const types = {
    pending: 'warning',
    shipped: 'primary',
    completed: 'success',
    cancelled: 'info'
  }
  return types[status] || 'info'
}

// 获取状态标签文本
const getStatusLabel = (status: string) => {
  const labels = {
    pending: '待发货',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return labels[status] || status
}

// 页码改变
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  fetchOrderList()
}

// 每页条数改变
const handleSizeChange = (size: number) => {
  pageSize.value = size
  fetchOrderList()
}

// 查看订单详情
const handleDetail = (row: any) => {
  currentOrder.value = row
  detailDialogVisible.value = true
}

// 发货处理
const handleShip = (row: any) => {
  ElMessageBox.confirm('确认发货该订单吗？', '提示', {
    type: 'warning'
  }).then(async () => {
    try {
      // 调用发货API
      // 模拟API调用
      row.status = 'shipped'
      ElMessage.success('发货成功')
      fetchOrderList()
    } catch (error) {
      ElMessage.error('发货失败')
    }
  })
}

onMounted(() => {
  fetchOrderList()
})
</script>

<style scoped>
.orders-container {
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

.order-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-info p:first-child {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.product-price {
  color: #999;
  font-size: 13px;
  margin-top: 4px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.order-detail {
  max-height: 600px;
  overflow-y: auto;
}
</style>