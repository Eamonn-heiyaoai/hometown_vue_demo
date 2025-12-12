<template>
  <div class="app">
    <link href="/src/tailwind.css" rel="stylesheet">
    <!-- <h2 class="text-3xl font-bold underline">a vue 3 demo</h2> -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang = "ts" setup name="App">
  import {RouterView} from 'vue-router'
</script>


