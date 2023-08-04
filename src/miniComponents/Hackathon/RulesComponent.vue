<template>
	<section class="text-gray-400 bg-gray-900 body-font">
		<div class="container px-5 py-24 mx-auto">
			<div class="text-center mb-20">
				<h1 class="sm:text-3xl text-2xl font-medium title-font text-white mb-4">
					Gotta follow some rules
				</h1>
				<div class="flex mt-6 justify-center">
					<div class="w-16 h-1 rounded-full bg-purple-500 inline-flex mb-2"></div>
				</div>
				<button v-show="isAdmin" @click="isAddRuleOpen = true" type="button"
					class="text-white bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base md:mt-0">
					Add Rule
				</button>
			</div>
			<span v-for="rule in hackathon.rules" :key="rule._id">
				<div class="flex items-center w-full mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
					<div class="flex-grow text-center mt-6 sm:mt-0">
						<div class="flex justify-center items-center">
							<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="3" class="text-purple-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
								<path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
								<path d="M22 4L12 14.01l-3-3"></path>
							</svg>
							<h2 class="text-white text-lg title-font font-medium item-center">
								{{ rule.title }}
							</h2>
						</div>
						<p class="leading-relaxed text-base">
							{{ rule.description }}
						</p>
					</div>
				</div>
			</span>
		</div>
	</section>

	<!-- Add Rule Form -->
	<div v-show="isAddRuleOpen"
		class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Add Rule</h3>
				<svg @click="isAddRuleOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="Rule" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Rule
						</label>
						<input id="rule"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Rule" v-model="title" />
					</div>

					<div class="identity-input mb-4">
						<label for="description" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Description
						</label>
						<textarea
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Description" v-model="description" />
					</div>

					<div class="flex items-center justify-center">
						<button @click="addRule($event)"
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
	name: 'RulesComponent',
	props: {
		hackathon: { type: Object },
		isAdmin: { type: Boolean },
	},
	data() {
		return {
			isAddRuleOpen: false,
			title: '',
			description: '',
		};
	},
	methods: {
		async addRule(event) {
			event.preventDefault();
			const rules = this.hackathon.rules;
			rules.push({
				title: this.title,
				description: this.description,
			});
			try {
				const response = await axios.put(`${API_URL}/hackathon/${this.hackathon._id}`, {
					"rules": rules,
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`,
					}
				});
				console.log(response);
				this.isAddRuleOpen = false;
			} catch (error) {
				console.log(error);
			}
		}
	}
}
</script>