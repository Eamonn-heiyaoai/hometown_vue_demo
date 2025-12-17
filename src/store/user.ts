import {defineStore} from 'pinia'

import {ref, computed} from 'vue'
export const useUserStore = defineStore('user', () => {

  const id = ref('')
  const username = ref('')
  const email = ref('')
  const power = ref('')
  const avatar = ref('')
  const isLogin = ref(false)
  const isAdmin = computed(() => power.value === 'admin')

  function setUser(user: {
  id: string
  username: string
  email: string
  power: string
  avatar: string
}) {
    id.value = user.id
    username.value = user.username
    email.value = user.email
    power.value = user.power
    avatar.value = user.avatar
    isLogin.value = true

    // 持久化
    localStorage.setItem('user', JSON.stringify({
      id: id.value,
      username: username.value,
      email: email.value,
      power: power.value,
      avatar: avatar.value,
      isLogin: true
    }))
  }

  function clearUser() {
    id.value = ''
    username.value = ''
    email.value = ''
    power.value = ''
    avatar.value = ''
    isLogin.value = false

    localStorage.removeItem('user')
  }

  function restoreUser() {
    const cache = localStorage.getItem('user')
    if (!cache) return

    const user = JSON.parse(cache)
    id.value = user.id
    username.value = user.username
    email.value = user.email
    power.value = user.power
    avatar.value = user.avatar
    isLogin.value = true
  }

    function setUsername(newName: string) {
      username.value = newName
    }

    function setEmail(newEmail: string) {
      email.value = newEmail
    }

    function setAvatar(newAvatar:string){
      avatar.value = newAvatar
    }


    return {
    id,
    username,
    email,
    power,
    avatar,
    isLogin,
    isAdmin,
    setUser,
    clearUser,
    restoreUser,
    setUsername,
    setEmail,
    setAvatar
  }
})
