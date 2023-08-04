<template>
	<section class="text-gray-400 body-font bg-gray-900">
		<div class="container px-5 py-24 mx-auto">
			<div class="flex flex-col items-center text-center w-full mb-20">
				<h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
					Login
				</h1>
				<router-link to="/register"
					class="flex mx-auto text-purple-500 border-0 py-2 px-8 focus:outline-none hover:text-purple-600 rounded text-lg">
					Don't have an account? Register now
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

						<div class="password-input mb-6">
							<label for="identity" class="block text-gray-300 text-sm text-left font-bold mb-2">
								Password
							</label>

							<input aria-describedby="passwordHelp" v-model="password"
								class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="password" type="password" placeholder="*******" />

							<span class="text-xs text-red-700" id="passwordHelp"></span>
						</div>

						<div class="flex items-center justify-between">
							<button @click="login($event)"
								class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
								Sign In
							</button>
							<a class="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-600"
								href="/forgot">
								Forgot Password?
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import { store, API_URL } from '@/common/user.js';
export default {
	name: 'LoginComponent',
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		async login(event) {
			event.preventDefault();
			try {
				if (this.email == "" || this.password == "") {
					console.log("empty fields");
					return;
				}
				const response = await axios.post(`${API_URL}/login`, {
					email: this.email,
					password: this.password,
				})
				console.log(response);
				if (response.status != 200) {
					console.log(response.data.error);
					return;
				}
				localStorage.setItem('user', JSON.stringify(response.data))
				localStorage.setItem('loggedIn', true)
				store.user = JSON.stringify(response.data)
				store.loggedIn = true
				setTimeout(() => {
					this.$router.push('/');
				}, 500);
			} catch (error) {
				console.log(error);
			}
			console.log(`logging in ${this.email}`);
		},
	},
}
</script>

<style></style>
