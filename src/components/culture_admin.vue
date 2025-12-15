<template>
  <div>
    <!-- 搜索和新建 -->
    <div style="display:flex;justify-content:space-between;margin-bottom:10px;align-items:center;">
      <!-- 左侧：搜索区域 -->
      <div style="display:flex;align-items:center;gap:8px;">
        <!-- 字段，可以是 text / select / radio 等 -->
        <span>文化名称：</span>
        <el-input
          v-model="SearchKeyWords"
          placeholder="搜索名字..."
          style="width: 200px;"
          @keyup.enter="onSearch"
          clearable
          @clear="onSearch"
        />
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </div>

      <!-- 右侧：新建按钮 -->
      <el-button type="primary" @click="openDialog()">新建</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名字" width="120" />
      <el-table-column prop="description" label="简述" width="400"/>
      <el-table-column label="图片" width="120">
        <template #default="scope">
          <el-image :src="scope.row.image" style="width:60px;height:60px;" fit="cover"/>
        </template>
      </el-table-column>
      <el-table-column prop="creationTime" label="创建时间" width="150" />
      <el-table-column prop="updateTime" label="修改时间" width="150" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button size="small" type="primary" @click="openDialog(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="onDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin-top:10px;display:flex;justify-content:center;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="pageNum"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 弹窗 Dialog -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form">
        <el-form-item label="名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="form.image"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="onSave">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" >
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'


interface CardItem {
  id: number
  name: string
  description: string
  image: string
  creationTime: string
  updateTime: string
}

const list = ref<CardItem[]>([])

const pageNum = ref(1)
const pageSize = ref(5)
const total = ref(0)

const SearchKeyWords = ref('')

const loading = ref(false)

const fetchData = async () => {
    try {
        loading.value = true
        const res = await request.get('/culture', {
            params: {
            pageNum: pageNum.value,
            pageSize: pageSize.value,
            name: SearchKeyWords.value
            }
    })

    if (res.data.code === 200) {
      list.value = res.data.data.records
      total.value = res.data.data.total
    } else {
      alert(res.data.msg || '获取列表失败')
    }
  } catch (e) {
    alert('请求列表失败，请稍后重试')
  } finally {
    loading.value = false
  }
  console.log(list.value)
}

const handlePageChange = (page: number) => {
  pageNum.value = page
  fetchData()
}

onMounted(() => {
  fetchData()
})


/** 搜索：回到第一页重新请求 */
const onSearch = () => {
  pageNum.value = 1
  fetchData()
}

/** 弹窗相关 */
const dialogVisible = ref(false)
const dialogTitle = ref('')

/** 表单数据，字段要和 CardItem 对应 */
const form = ref<Partial<CardItem>>({
  id: undefined,
  name: '',
  description: '',
  image: '',
  creationTime: '',
  updateTime: '' 
})


/** 打开弹窗：如果有 row 是编辑，没有则是新建 */
const openDialog = (row?: CardItem) => {
  if (row) {
    dialogTitle.value = '修改'
    form.value = { ...row }
  } else {
    dialogTitle.value = '新建'
    form.value = {
      id: undefined,
      name: '',
      description: '',
      image: ''
    }
  }
  dialogVisible.value = true
}

/** 保存：根据 dialogTitle 判断是新增还是修改 */
const onSave = async () => {
  try {
    // 简单校验
    if (!form.value.name || !form.value.description) {
      alert('请填写名称和简述')
      return
    }

    if (dialogTitle.value === '新建') {
      // 新增
      const res = await request.post('/culture', {
        name: form.value.name,
        description: form.value.description,
        image: form.value.image
      })
      console.log(res.data)

      if (res.data.code === 200) {
        alert('新增成功')
        // 新增后回到第一页
        pageNum.value = 1
        await fetchData()
      } else {
        alert(res.data.msg || '新增失败')
      }
    } else {
      // 修改
      if (!form.value.id) {
        alert('缺少ID，无法修改')
        return
      }
      const res = await request.put('/culture', {
        id: form.value.id,
        name: form.value.name,
        description: form.value.description,
        image: form.value.image
      })
      console.log(res.data)

      if (res.data.code === 200) {
        alert('修改成功')
        // 修改后留在当前页刷新数据
        await fetchData()
      } else {
        alert(res.data.msg || '修改失败')
      }
    }

    dialogVisible.value = false
  } catch (e) {
    console.error(e)
    alert('请求失败，请稍后重试')
  }
}

/** 删除：先二次确认，再调后端DELETE，然后重新请求列表 */
const onDelete = async (row: CardItem) => {
  const ok = window.confirm(`确认删除【${row.name}】吗？`)
  if (!ok) return

  const res = await request.delete(`/culture/${row.id}`)
  console.log(res.data)

  if (res.data.code === 200) {
    alert('删除成功')
    if (list.value.length === 1 && pageNum.value > 1) {
      pageNum.value -= 1
    }
    await fetchData()
  } else {
    alert(res.data.msg || '删除失败')
  }
}
</script>