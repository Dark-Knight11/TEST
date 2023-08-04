<template>
    <section class="text-gray-400 body-font bg-gray-900">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col items-center text-center w-full mb-20">
                <h1 class="sm:text-3xl text-2xl py-2 px-8 font-medium title-font text-white">
                    Reset Password
                </h1>
                <div class="w-full max-w-xs">
                    <form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                        <div class="password-input mb-6">
                            <label for="password" class="block text-gray-300 text-sm text-left font-bold mb-2">
                                Password
                            </label>

                            <input aria-describedby="passwordHelp" v-model="password"
                                class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="*******" />

                            <span class="text-xs text-red-700" id="passwordHelp"></span>
                        </div>

                        <div class="password-input mb-6">
                            <label for="identity" class="block text-gray-300 text-sm text-left font-bold mb-2">
                                Confirm Password
                            </label>

                            <input aria-describedby="passwordHelp" v-model="cfpassword"
                                class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="*******" />

                            <span class="text-xs text-red-700" id="passwordHelp"></span>
                        </div>

                        <div class="flex items-center justify-between">
                            <button @click="reset($event)"
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
            cfpassword: "",
            password: "",
        };
    },
    methods: {
        async reset(event) {
            event.preventDefault();
            console.log(this.$route.query.resetToken);
            try {
                if (this.password !== this.cfpassword || this.password == "") {
                    alert("Password and Confirm Password do not match");
                    return;
                }

                const response = await axios.post(`${API_URL}/reset-password`, {
                    newPassword: this.cfpassword
                }, {
                    headers: {
                        "Reset-Token": this.$route.query.resetToken,
                    },
                });
                console.log(response);
                this.$router.push('/login');
            } catch (error) {
                console.log(error);
            }
            console.log(`logging in ${this.email}`);
        },
    },
}
</script>

<style></style>
