<template>
  <div class="user">
    <h2>User Component</h2>
    <h2>username:{{ username }}</h2>
    <h2>age:{{ age }}</h2>
    <h2>id:{{ id_power.id }}, power:{{ id_power.power }}</h2>
    <h2>username_password:{{ username_password }}</h2>
    <button @click="showEmail">show email</button>
    <button @click="changename">change name</button>
    <button @click="changeuser">change user</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'User_1',
};
</script>

<script setup lang="ts" setyped>
  import { ref,computed } from 'vue'

  const username = ref('user_1')
  const age = 18
  const email = '123456@45.com'
  const id_power = ref({id: 1, power: 'admin'})
  const password = 'mypassword'


  function showEmail() {
    alert(email)
  }
  function changename() {
    username.value = 'user_2'
  }

  function changeuser() {
    //Object.assign(id_power, {id:2,power:'superadmin'})  //使用reactive定义时修改整个变量
    id_power.value = {id:2,power:'superadmin'}  //使用ref定义时修改整个变量
  }

  const username_password = computed(() => {
    return username.value + '_' + password
  })

</script>>

<style scoped>
  .user {
    background-color: #f9f9f9;
    box-shadow: 0 0 5px;
    border-radius: 5px;
    padding: 15px;
  }

  button {
    margin: 0 10px;
    padding: 8px 12px;
    border: none;
    background-color: #42b983;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
