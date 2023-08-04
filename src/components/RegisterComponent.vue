<template>
	<section class="text-gray-400 body-font bg-gray-900">
		<div class="container px-5 py-24 mx-auto">
			<div class="flex flex-col items-center text-center w-full mb-20">
				<h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
					Register
				</h1>
				<router-link to="/login"
					class="flex mx-auto text-purple-500 border-0 py-2 px-8 focus:outline-none hover:text-purple-600 rounded text-lg">
					Already have an account? Login
				</router-link>
				<div class="w-full max-w-xs">
					<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
						<div class="identity-input mb-4">
							<label for="firstname" class="block text-gray-300 text-sm text-left font-bold mb-2">
								First Name
							</label>
							<input id="firstname"
								class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								type="text" placeholder="FirstName" v-model="firstName" />
						</div>

						<div class="identity-input mb-4">
							<label for="lastname" class="block text-gray-300 text-sm text-left font-bold mb-2">
								Last Name
							</label>
							<input id="lastname"
								class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								type="text" placeholder="LastName" v-model="lastName" />
						</div>

						<div class="identity-input mb-4">
							<label for="identity" class="block text-gray-300 text-sm text-left font-bold mb-2">
								Email
							</label>
							<input id="identity"
								class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								type="text" placeholder="Email" v-model="email" />
						</div>

						<div class="password-input mb-6">
							<label for="password" class="block text-gray-300 text-sm text-left font-bold mb-2">
								Password
							</label>

							<input v-model="password"
								class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="password" type="password" placeholder="*******" />
						</div>

						<div class="flex items-center justify-between">
							<button @click="register($event)"
								class="bg-purple-500 hover:bg-purple-600 text-white font-bold w-full py-2 rounded focus:outline-none focus:shadow-outline">
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios'
import { API_URL } from '@/common/user.js'
export default {
	name: 'RegisterComponent',
	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
	},
	methods: {
		async register(event) {
			event.preventDefault()
			try {
				const res = await axios.post(`${API_URL}/register`, {
					first_name: this.firstName,
					last_name: this.lastName,
					email: this.email,
					password: this.password
				})
				console.log(res)
				if (res.status === 201) {
					this.$router.push('/login')
				}
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style></style>
