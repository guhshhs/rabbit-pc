import { defineStore } from "pinia";
// import { ref } from "vue";
import type { User } from "@/types/user";

type States = {
    // Partial 将类型上的属性全变为可选的
    profile: Partial<User>
}
type Actions = {}
type Getters = {}

export default defineStore<'user', States, Actions, Getters>('user', {
    state: () => ({
        profile: {
            token: '',
        }
    }),
    actions: {
        useToken(data: string) {
            this.profile.token = data
        }
    },
    getters: {},
    // 开启状态存储化
    persist: true,

})