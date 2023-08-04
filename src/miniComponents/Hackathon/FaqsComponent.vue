<template>
	<section id="app" class="py-16 flex flex-col items-center p-4">
		<div class="text-center mb-10">
			<h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-white">
				Frequently Asked Questions
			</h1>
			<div class="flex mt-6 justify-center mb-2">
				<div class="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
			</div>
			<button v-show="isAdmin" @click="isAddFAQOpen = true" type="button"
				class="text-white bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base md:mt-0">
				Add FAQ
			</button>
		</div>

		<span v-for="faq in hackathon.faqs" :key="faq._id" class="flex felx-col justify-center px-4 w-full">
			<accordion-utility class="mb-4">
				<template v-slot:title>
					<span class="font-semibold text-xl">{{ faq.question }}</span>
				</template>
				<template v-slot:content>
					<p>
						{{ faq.answer }}
					</p>
				</template>
			</accordion-utility>
		</span>
	</section>

	<!-- Add FAQ Form -->
	<div v-show="isAddFAQOpen"
		class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Add FAQ</h3>
				<svg @click="isAddFAQOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="question" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Question
						</label>
						<input id="question"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Question" v-model="question" />
					</div>

					<div class="identity-input mb-4">
						<label for="answer" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Answer
						</label>
						<textarea
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Answer" v-model="answer" />
					</div>

					<div class="flex items-center justify-center">
						<button @click="addFaq($event)"
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
import axios from 'axios'
import AccordionUtility from '../Utils/AccordionUtility.vue'
import { store, API_URL } from '@/common/user'

export default {
	name: 'FaqsComponent',
	components: { AccordionUtility },
	props: {
		hackathon: Object,
		isAdmin: Boolean,
	},
	data() {
		return {
			isAddFAQOpen: false,
			question: '',
			answer: '',
		}
	},
	methods: {
		async addFaq(event) {
			event.preventDefault()
			const faqs = this.hackathon.faqs
			faqs.push({
				question: this.question,
				answer: this.answer,
			})
			try {
				await axios.put(`${API_URL}/hackathon/${this.hackathon._id}`, {
					"faqs": faqs
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`,
					},
				}
				)
				this.isAddFAQOpen = false;
			} catch (error) {
				console.log(error)
			}
		},
	},
}
</script>

<style></style>
