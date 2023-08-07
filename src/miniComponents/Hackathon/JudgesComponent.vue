<template>
	<section class="text-gray-400 bg-gray-900 body-font">
		<div class="container px-5 py-24 mx-auto">
			<div class="flex flex-col items-center text-center w-full mb-10">
				<h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
					Our Judges
				</h1>
				<div class="flex mt-6 justify-center">
					<div class="w-16 h-1 rounded-full bg-purple-500 inline-flex mb-2"></div>
				</div>
				<button v-show="isAdmin" @click="isAddJudgesOpen = true" type="button"
					class="text-white w-fit bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base md:mt-0">
					Add Judge
				</button>
			</div>
			<div v-for="judge in hackathon.judges" :key="judge._id" class="flex flex-wrap -m-2 items-center justify-center">
				<div class="p-2 lg:w-1/3 md:w-1/2 w-full">
					<div class="h-full flex items-center bg-gray-800 border-gray-800 border p-4 rounded-lg">
						<img alt="team"
							class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
							src="https://dummyimage.com/100x90" />
						<div class="flex-grow">
							<h2 class="text-white title-font font-medium">{{ judge.first_name + " " + judge.last_name }}
							</h2>
							<p class="text-purple-600 font-semibold tracking-wider">QA Engineer</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Add Judge Form -->
	<div v-show="isAddJudgesOpen"
		class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Add Judge</h3>
				<svg @click="isAddJudgesOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="judge" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Judge
						</label>
						<input id="judge"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Judge Email" v-model="email" />
					</div>

					<div class="flex items-center justify-center">
						<button @click="addJudge($event)"
							class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { store, API_URL } from '@/common/user.js'
export default {
	name: 'JudgesComponent',
	props: {
		hackathon: Object,
		isAdmin: Boolean
	},
	data() {
		return {
			isAddJudgesOpen: false,
			email: ''
		}
	},
	methods: {
		async addJudge(e) {
			e.preventDefault();
			try {
				const res = await axios.put(`${API_URL}/hackathon/${this.hackathon._id}`, {
					"email": this.email
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`
					}
				});
				console.log(res);
			} catch (error) {
				console.log(error);
			}
			this.isAddJudgesOpen = false;
		}
	}
}
</script>
