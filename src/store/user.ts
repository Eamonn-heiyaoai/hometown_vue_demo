import {defineStore} from 'pinia'

import {ref} from 'vue'
export const useUserStore = defineStore('user', () => {
    // const UserInfo = ref({
    //     username: '',
    //     email: '',
    //     id: '',
    //     power: '',
    //     password: ''
    // })
    const username = ref('')
    const email = ref('')
    const id = ref("")
    const power = ref("")
    const password = ref("")

    function setUser(usernameStr: string, emailStr: string, newId: string, newPower: string, newPassword: string) {
        username.value = usernameStr
        email.value = emailStr
        power.value = newPower
        password.value = newPassword
        id.value = newId
    }

    function setUsername(newName: string) {
        username.value = newName
    }

    function setEmail(newEmail: string) {
        email.value = newEmail
    }


    return {username, email, id, power, password, setUsername, setEmail, setUser}
})
