import { reactive } from "vue";

export const store = reactive({
    user: localStorage.user ? JSON.parse(localStorage.user) : undefined,
    loggedIn: localStorage.user ? true : false,
});

export const API_URL = process.env.VUE_APP_ROOT_API;