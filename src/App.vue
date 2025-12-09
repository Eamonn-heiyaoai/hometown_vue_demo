<template>
  <div class="app">
    <h2>a vue 3 demo</h2>
    <div>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink> |
      <RouterLink to="/user">User</RouterLink>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang = "ts" setup name="App">
  import {RouterView,RouterLink} from 'vue-router'
</script>


