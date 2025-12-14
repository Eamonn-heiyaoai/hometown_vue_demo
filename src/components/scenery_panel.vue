<template>
  <div>

    <div class="input-container">
        <el-input
          v-model="SearchkeyWords"
          placeholder="sreach in this page"
          :prefix-icon="Search"
        />
        <el-button type="primary" @click="fetchData">Search</el-button>
    </div>

    <div class="page-container">
      <!-- 卡片列表 -->
    <info-card
      v-for="item in list"
      :key="item.id"
      :title="item.name"
      :description="item.description"
      :image="item.image"
      class="card-item"
    />

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
      @current-change="handlePageChange"
    />
    </div>

  </div>
</template>

<script setup lang="ts" name="InfoCardList">
import { ref, onMounted } from 'vue'
import InfoCard from '@/components/info_card.vue'
import request from '@/utils/request'
import { Search } from '@element-plus/icons-vue'

interface CardItem {
  id: number
  name: string
  description: string
  image: string
}

const list = ref<CardItem[]>([])

const pageNum = ref(1)
const pageSize = ref(3)
const total = ref(0)
const SearchkeyWords = ref('')

const fetchData = async () => {
  const res = await request.get('/scenery', {
    params: {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      name: SearchkeyWords.value
    }
  })

  if (res.data.code === 200) {
    list.value = res.data.data.records
    total.value = res.data.data.total
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
</script>

<style scoped>
  .page-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .input-container {
    display: flex;
    margin-left: 65vw;
    gap: 10px;
  }
</style>
