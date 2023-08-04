<template>
	<section class="text-gray-400 bg-gray-900 body-font px-4 md:px-24 pb-12 overflow-hidden">
		<div class="w-full flex flex-col md:flex-row md:justify-between items-center px-5 pt-8 pb-12 mx-auto">
			<div class="text-left flex flex-col items-center md:items-start mb-4">
				<h1 class="sm:text-3xl text-2xl font-medium title-font text-white md:mb-2">
					My Profile
				</h1>
				<div class="flex mt-2 justify-start">
					<div class="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
				</div>
			</div>

			<div class="flex gap-1 md:gap-4 flex-col items-center md:flex-row md:justify-end md:items-center">
				<div class="px-2 pt-2 pb-1">
					<div class="flex items-end">
						<input type="text" placeholder="First Name" v-model="fname"
							class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
					</div>
				</div>
				<div class="px-2 pt-2 pb-1">
					<div class="flex items-end">
						<input type="text" placeholder="Last Name" v-model="lname"
							class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
					</div>
				</div>
				<div class="px-2 pt-2 pb-1">
					<div class="flex items-end">
						<input type="text" placeholder="Email" v-model="email"
							class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
					</div>
				</div>
				<button @click="editProfile()"
					class="w-fit h-fit flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-md">
					Edit Profile
				</button>
			</div>
		</div>

		<button @click="isCreateHackathonModalOpen = true"
			class="w-fit h-fit ml-auto flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-md">
			Create Hackathon
		</button>

		<div class="text-gray-400 bg-gray-900 body-font py-8">
			<div class="container md:px-5 mx-auto flex flex-wrap flex-col">
				<div class="flex mx-auto flex-wrap justify-center mb-5">
					<a @click="changeTab('participated')"
						class="pl-2 sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none"
						:class="`${(activatedTab === 'participated') ? 'bg-gray-800 border-purple-500 text-white tracking-wider rounded-t' : 'border-gray-800 hover:text-white tracking-wider'}`">
						<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
							stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
						</svg>
						Participated Hackathons
					</a>
					<a @click="changeTab('organized')"
						class="pl-2 sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 hover:text-white tracking-wider"
						:class="`${(activatedTab === 'organized') ? 'bg-gray-800 border-purple-500 text-white tracking-wider rounded-t' : 'border-gray-800 hover:text-white tracking-wider'}`">
						<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
							stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
							<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
						</svg>
						Organized Hackathons
					</a>
					<a @click="changeTab('judged')"
						class="pl-2 sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 hover:text-white tracking-wider"
						:class="`${(activatedTab === 'judged') ? 'bg-gray-800 border-purple-500 text-white tracking-wider rounded-t' : 'border-gray-800 hover:text-white tracking-wider'}`">
						<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
							stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
							<circle cx="12" cy="5" r="3"></circle>
							<path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
						</svg>
						Judged Hackathons
					</a>
				</div>
			</div>
		</div>

		<span v-for="hackathon in displayedHackathons" :key="hackathon.id">
			<hackathon-list-item :title="hackathon.name" :description="hackathon.description"
				:hackathonId="hackathon._id" />
		</span>
	</section>

	<!-- Create Hackathon Form -->
	<div v-show="isCreateHackathonModalOpen"
		class="fixed h-screen w-screen bottom-0 right-auto left-auto flex justify-center items-center text-gray-300 bg-gray-700 bg-opacity-50">
		<div class="very-big-form overflow-auto w-2/3 h-4/5 p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Create Hackathon</h3>
				<svg @click="isCreateHackathonModalOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="name" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Name
						</label>
						<input id="name"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Name" v-model="name" />
					</div>

					<div class="identity-input mb-4">
						<label for="imgUrl" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Image URL
						</label>
						<input id="imgUrl"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Image Link" v-model="imgUrl" />
					</div>

					<div class="identity-input mb-4">
						<label for="description" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Hackathon Description
						</label>
						<textarea
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Hackathon Description" v-model="description" />
					</div>

					<div class="identity-input mb-4">
						<label for="startDate" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Hackathon Start Date
						</label>
						<input id="startDate"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="date" placeholder="Hackathon Start Date" v-model="startDate" />
					</div>

					<div class="identity-input mb-4">
						<label for="endDate" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Hackathon End Date
						</label>
						<input id="endDate"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="date" placeholder="Hackathon End Date" v-model="endDate" />
					</div>

					<div class="identity-input mb-4">
						<label for="appStartDate" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Hackathon Application Start Date
						</label>
						<input id="appStartDate"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="date" placeholder="Hackathon Application Start Date" v-model="appStartDate" />
					</div>

					<div class="identity-input mb-4">
						<label for="appEndDate" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Hackathon Application End Date
						</label>
						<input id="appEndDate"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="date" placeholder="Hackathon Application End Date" v-model="appEndDate" />
					</div>

					<div class="identity-input mb-4">
						<label for="venue" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Venue
						</label>
						<input id="venue"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Venue" v-model="venue" />
					</div>

					<div class="identity-input mb-4">
						<label for="theme" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Theme
						</label>
						<input id="theme"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Theme" v-model="theme" />
					</div>

					<div class="identity-input mb-4">
						<label for="maxTeam" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Maximum Team Size
						</label>
						<input id="maxTeam"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="number" placeholder="Maximum Team Size" v-model="maxTeam" />
					</div>

					<div class="identity-input mb-4">
						<label for="minTeam" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Minimum Team Size
						</label>
						<input id="minTeam"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="number" placeholder="Minimum Team Size" v-model="minTeam" />
					</div>

					<div class="flex items-center justify-center">
						<button @click="createHackathon($event)"
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
import HackathonListItem from '@/miniComponents/Profile/HackathonListItem.vue'
import axios from "axios";
import { API_URL } from "@/common/user.js";

export default {
	name: 'ProfileComponent',
	components: { HackathonListItem },
	data() {
		return {
			activatedTab: 'participated',
			isCreateHackathonModalOpen: false,
			organizedHackathons: [],
			participatedHackathons: [],
			judgedHackathons: [],
			displayedHackathons: [],
			fname: '',
			lname: '',
			email: '',
			name: '',
			imgUrl: '',
			description: '',
			startDate: '',
			endDate: '',
			appStartDate: '',
			appEndDate: '',
			venue: '',
			maxTeam: '',
			minTeam: '',
			theme: ''
		}
	},
	methods: {
		async editProfile() {
			try {
				const res = await axios.put(`${API_URL}/user`, {
					first_name: this.fname,
					last_name: this.lname,
					email: this.email
				}, {
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.user).token}`
					}
				})
				console.log(res)
			} catch (error) {
				console.log(error)
			}
		},
		async createHackathon(event) {
			event.preventDefault()
			try {
				if (this.name == '' || this.venue == '' || this.description == '' || this.startDate == '' || this.endDate == '' || this.appStartDate == '' || this.appEndDate == '' || this.maxTeam == '' || this.minTeam == '') {
					alert('Please fill all the fields')
					return
				}
				if (this.maxTeam < this.minTeam) {
					alert('Maximum team size cannot be less than minimum team size')
					return
				}
				await axios.post(`${API_URL}/hackathon`, {
					max_team_size: this.maxTeam,
					min_team_size: this.minTeam,
					venue: this.venue,
					imgUrl: this.imgUrl,
					description: this.description,
					start_date: this.startDate,
					end_date: this.endDate,
					application_open: this.appStartDate,
					application_deadline: this.appEndDate,
					name: this.name,
					theme: this.theme
				}, {
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.user).token}`
					}
				})
				this.$router.go()
			} catch (error) {
				console.log(error)
			} finally {
				this.isCreateHackathonModalOpen = false
			}
		},
		changeTab(tab) {
			this.activatedTab = tab
			this.displayedHackathons = this[`${tab}Hackathons`]
		},
		async getDetails() {
			// get details from backend
			try {
				// send headers with token
				const token = JSON.parse(localStorage.user).token
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					}
				}
				const result = await axios.get(`${API_URL}/user`, config)

				console.log(result.data.hackathonsOrganized)
				this.organizedHackathons = result.data.hackathonsOrganized
				this.participatedHackathons = result.data.hackathonsParticipated
				this.judgedHackathons = result.data.hackathonsJudged
				this.displayedHackathons = this.participatedHackathons
				this.fname = result.data.first_name;
				this.lname = result.data.last_name;
				this.email = result.data.email;
				console.log(this.participatedHackathons)
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		this.getDetails()
	}
}
</script>

<style></style>
