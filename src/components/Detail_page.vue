<template>
  <el-card v-if="detail">

    <el-page-header :icon="ArrowLeft" @click="goBack">
      <template #content>
        <span class="text-large font-600 mr-3"> {{detail.name}} </span>
      </template>
    </el-page-header>

    <el-divider />

    <div class="title"><span class="title">{{ detail.name }}</span></div>

    <div class="image-panel">
      <el-image class="detail-image" :src="detail.image" fit="cover" />
    </div>


    <p class="desc">{{ detail.description }}</p>

  </el-card>
</template>

<script lang="ts" setup name="DetailPage">
  import { useRoute, useRouter } from 'vue-router'
  import { onMounted, ref, watch } from 'vue'
  import request from '@/utils/request'
  import { ArrowLeft } from '@element-plus/icons-vue'

  const route = useRoute()
  const router = useRouter()

  interface Detail{
    name:string
    description:string
    image:string
  }

  const detail = ref<Detail | null>(null)

  const fetchData = async () => {
    const { type, id } = route.params

    let url = ''
    if (type === 'food') {
      url = `/food/${id}`
    } else if (type === 'culture') {
      url = `/culture/${id}`
    } else if (type === 'scenery') {
      url = `/scenery/${id}`
    }

    const res = await request.get(url, {
    })
      if (res.data.code === 200) {
        detail.value = res.data.data
      }
      console.log(detail.value)
  }

  onMounted(() => {
    console.log("fatchdata")
    fetchData()
  })

  watch(
    () => route.params,
    () => {
      fetchData()
    }
  )

  function goBack(){
    router.back()
  }

</script>

<style>
  .detail-image {
    width: 1024px;
    height: 768px;
    flex-shrink: 0;
    border-radius: 10px;
  }

  .image-panel{
    display: flex;
    justify-content: center;
    margin: 20px;
  }

  .title{
    font-size: 36px;
    font-weight: bold;
    margin: 10px;
    color: #0080ff;
  }
</style>
