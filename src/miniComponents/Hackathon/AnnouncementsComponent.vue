<template>
	<section class="text-gray-400 bg-gray-900 body-font">
		<div class="container px-5 py-24 mx-auto">
			<div class="text-center mb-10">
				<h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-white">
					Announcements
				</h1>
				<div class="flex mt-6 justify-center">
					<div class="w-16 h-1 rounded-full bg-purple-500 inline-flex mb-2"></div>
				</div>
				<button v-show="isAdmin" @click="isAddAnnouncementOpen = true" type="button"
					class="text-white bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base md:mt-0">
					Add Announcement
				</button>
			</div>
			<div v-for="announcement in hackathon.announcements" :key="announcement._id"
				class="flex flex-wrap justify-center items-center sm:mx-auto sm:mb-2 -mx-2">
				<accordion-utility class="mb-4">
					<template v-slot:title>
						<span class="font-semibold text-xl">{{ announcement.title }}</span>
					</template>
					<template v-slot:content>
						<p>
							{{ announcement.description }}
						</p>
					</template>
				</accordion-utility>
				<!-- <div class="p-2 w-full">
					<div class="bg-gray-800 rounded flex p-4 h-full items-center">
						<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
							stroke-width="3" class="text-purple-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
							<path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
							<path d="M22 4L12 14.01l-3-3"></path>
						</svg>
						<span class="title-font font-medium text-white">
							{{ announcement.title }}
						</span>
					</div>
				</div> -->
			</div>
		</div>
	</section>

	<!-- Add Announcement Form -->
	<div v-show="isAddAnnouncementOpen"
		class="absolute top-0 h-screen w-screen left-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Add Annoucement</h3>
				<svg @click="isAddAnnouncementOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="title" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Title
						</label>
						<input id="title"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Title" v-model="title" />
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
						<button @click="addAnnoucement($event)"
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
import AccordionUtility from '../Utils/AccordionUtility.vue'
import axios from 'axios'
import { store, API_URL } from '@/common/user'
export default {
	name: 'AnnouncementsComponent',
	components: { AccordionUtility },
	props: {
		hackathon: Object,
		isAdmin: Boolean
	},
	data() {
		return {
			isAddAnnouncementOpen: false,
			title: '',
			description: ''
		}
	},
	methods: {
		compareAnnouncementsByTime(a, b) {
			return new Date(a.time) - new Date(b.time);
		},
		async addAnnoucement(e) {
			e.preventDefault()
			const announcements = this.hackathon.announcements
			announcements.push({
				title: this.title,
				description: this.description,
				time: new Date()
			});
			try {
				const res = await axios.put(`${API_URL}/hackathon/${this.hackathon._id}`, {
					announcements
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`
					}
				})
				console.log(res)
			} catch (error) {
				console.log(error)
			}
			this.isAddAnnouncementOpen = false
		}
	}
}
</script>

<style></style>
