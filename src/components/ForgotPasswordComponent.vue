<template>
    <section class="text-gray-400 body-font bg-gray-900">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col items-center text-center w-full mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
                    Forgot Password
                </h1>
                <router-link to="/login"
                    class="flex mx-auto text-purple-500 border-0 py-2 px-8 focus:outline-none hover:text-purple-600 rounded text-lg">
                    Remembered your password? Login
                </router-link>
                <div class="w-full max-w-xs">
                    <form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                        <div class="identity-input mb-4">
                            <label for="identity" class="block text-gray-300 text-sm text-left font-bold mb-2">
                                Email
                            </label>
                            <input id="identity"
                                class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                type="text" placeholder="Email" aria-describedby="emailHelp" v-model="email" />
                            <span class="text-xs text-red-700" id="emailHelp"></span>
                        </div>

                        <div class="flex items-center justify-between">
                            <button @click="forgot($event)"
                                class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/common/user.js'
export default {
    name: 'LoginComponent',
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async forgot(event) {
            event.preventDefault();
            try {
                const res = await axios.post(`${API_URL}/forgot-password/`, {
                    email: this.email,
                });
                this.$router.push('/');
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>

<style></style>
