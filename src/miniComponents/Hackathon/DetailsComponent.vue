<template>
	<section class="text-gray-400 body-font bg-gray-900">
		<div class="container px-5 pt-12 pb-6">
			<div class="flex flex-col items-center w-full mb-10">
				<div class="rounded-lg h-64 mb-8 overflow-hidden">
					<img alt="content" class="object-cover object-center h-full w-full" :src="hackathon.imgUrl" />
				</div>
				<h2 class="text-3xl text-purple-400 tracking-widest font-medium mb-4">
					{{ hackathon.name }}
				</h2>
				<div v-show="isAdmin" class="flex flex-col md:flex-row gap-2 md:gap-5 items-center mb-4">
					<div class="flex gap-5 item-center">
						<button @click="openEditTeam()"
							class="bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base md:mt-0">
							Edit
						</button>
						<button @click="deleteHackathon()"
							class="bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base md:mt-0">
							Delete
						</button>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<p class="lg leading-relaxed text-base text-justify mx-11">
						{{ hackathon.description }}
					</p>
					<br>
					<div class="flex-row flex items-center">
						<p class="lg leading-relaxed text-base text-justify mx-11">
							Hackathon Dates:<br>
							<span class="text-lg text-white font-bold"> {{ startDateProp }} {{ endDateProp }} </span>
						</p>
						<br>
						<p class="lg leading-relaxed text-base text-justify mx-11">
							Applications Open For:<br>
							<span class="text-lg text-white font-bold"> {{ appStartDateProp }} {{ appEndDateProp }} </span>
						</p>
						<p class="lg leading-relaxed text-base text-justify mx-11">
							Team Size:<br>
							<span class="text-lg text-white font-bold"> {{ hackathon.min_team_size }} - {{
								hackathon.max_team_size }} </span>
						</p>
						<p class="lg leading-relaxed text-base text-justify mx-11">
							Venue:<br>
							<span class="text-lg text-white font-bold"> {{ hackathon.venue }} </span>
						</p>
						<p class="lg leading-relaxed text-base text-justify mx-11">
							Theme:<br>
							<span class="text-lg text-white font-bold"> {{ hackathon.theme }} </span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Edit Team Form -->
	<div v-show="isEditTeamOpen"
		class="fixed h-screen w-screen bottom-0 right-auto left-auto flex justify-center items-center text-gray-300 bg-gray-700 bg-opacity-50">
		<div class="very-big-form overflow-auto w-2/3 h-4/5 p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Edit Team Admin Access</h3>
				<svg @click="isEditTeamOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-3">
						<label for="name" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Hackathon Name
						</label>
						<input id="name"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Hackathon Name" v-model="hackathonName" />
					</div>

					<div class="identity-input mb-3">
						<label for="description" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Description
						</label>
						<textarea id="description"
							oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
							placeholder="Description of Hackathon" v-model="description"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-2 leading-tight focus:outline-none focus:shadow-outline" />
					</div>

					<div class="identity-input mb-3">
						<label for="img" class="block text-gray-300 text-sm text-left font-bold mb-3">
							Image Url
						</label>
						<input id="img"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Enter image link" v-model="imgUrl" />
					</div>

					<div class="identity-input mb-3">
						<label for="startDate" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Start Date
						</label>
						<input id="startDate"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="date" placeholder="Start Date" v-model="startDate" />
					</div>

					<div class="identity-input mb-3">
						<label for="endDate" class="block text-gray-300 text-sm text-left font-bold mb-2">
							End Date
						</label>
						<input id="endDate"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="date" placeholder="End Date" v-model="endDate" />
					</div>

					<div class="identity-input mb-3">
						<label for="appStartDate" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Application Start Date
						</label>
						<input id="appStartDate"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="date" placeholder="Application Start Date" v-model="appStartDate" />
					</div>

					<div class="identity-input mb-3">
						<label for="endStartDate" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Application End Date
						</label>
						<input id="endStartDate"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="date" placeholder="Application End Date" v-model="appEndDate" />
					</div>

					<div class="identity-input mb-3">
						<label for="venue" class="block text-gray-300 text-sm text-left font-bold mb-3">
							Venue
						</label>
						<input id="venue"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Venue" v-model="venue" />
					</div>

					<div class="identity-input mb-3">
						<label for="theme" class="block text-gray-300 text-sm text-left font-bold mb-3">
							Theme
						</label>
						<input id="theme"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Theme" v-model="theme" />
					</div>

					<div class="identity-input mb-3">
						<label for="maxTeam" class="block text-gray-300 text-sm text-left font-bold mb-3">
							Maximum Team Size
						</label>
						<input id="maxTeam"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="number" placeholder="Maximum Team Size" v-model="maxTeam" />
					</div>

					<div class="identity-input mb-3">
						<label for="minTeam" class="block text-gray-300 text-sm text-left font-bold mb-3">
							Minimum Team Size
						</label>
						<input id="minTeam"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="number" placeholder="Minimum Team Size" v-model="minTeam" />
					</div>

					<div class="flex items-center justify-center">
						<button @click="editHackathon($event)"
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
import moment from 'moment';
import { store, API_URL } from '@/common/user.js'
export default {
	name: 'DetailsComponent',
	data() {
		return {
			isEditTeamOpen: false,
			title: '',
			description: '',
			hackathonName: '',
			imgUrl: '',
			startDate: '',
			endDate: '',
			appStartDate: '',
			appEndDate: '',
			venue: '',
			theme: '',
			maxTeam: 0,
			minTeam: 0
		}
	},
	methods: {
		openEditTeam() {
			this.isEditTeamOpen = true;
			console.log(moment(this.hackathon.start_date).utc().format('MM-DD-YYYY'))
			this.hackathonName = this.hackathon.name;
			this.description = this.hackathon.description;
			this.imgUrl = this.hackathon.imgUrl;
			this.startDate = moment(this.hackathon.start_date).utc().format('DD-MM-YYYY');
			this.endDate = moment(this.hackathon.end_date).utc().format('DD-MM-YYYY');
			this.appStartDate = moment(this.hackathon.app_start_date).utc().format('DD-MM-YYYY');
			this.appEndDate = moment(this.hackathon.app_end_date).utc().format('DD-MM-YYYY')
			this.theme = this.hackathon.theme;
		},
		async editHackathon(event) {
			event.preventDefault();
			try {
				const sdateObj = new Date(Date.parse(this.startDate));
				sdateObj.setHours(0, 0, 0);

				const edateObj = new Date(Date.parse(this.endDate));
				edateObj.setHours(0, 0, 0);

				const asdateObj = new Date(Date.parse(this.appStartDate));
				asdateObj.setHours(0, 0, 0);

				const aedateObj = new Date(Date.parse(this.appEndDate));
				aedateObj.setHours(0, 0, 0);

				const res = await axios.put(`${API_URL}/hackathon/${this.hackathon._id}`, {
					name: this.hackathonName,
					description: this.description,
					imgUrl: this.imgUrl,
					start_date: sdateObj.toISOString(),
					end_date: edateObj.toISOString(),
					application_open: asdateObj.toISOString(),
					application_deadline: aedateObj.toISOString(),
					venue: this.venue,
					theme: this.theme,
					max_team_size: this.maxTeam,
					min_team_size: this.minTeam
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`
					}
				});
				this.isEditTeamOpen = false;
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		},
		async deleteHackathon() {
			try {
				const config = {
					headers: {
						Authorization: `Bearer ${store.user.token}`
					}
				}
				const res = await axios.delete(`${API_URL}/hackathon/${this.hackathon._id}`, config);
				console.log(res.data);
				this.$router.push({ name: 'Home' });
			} catch (error) {
				console.log(error);
			}
		}
	},
	props: {
		hackathon: Object,
		isAdmin: Boolean,
		startDateProp: String,
		endDateProp: String,
		appStartDateProp: String,
		appEndDateProp: String
	},
}
</script>

<style>
.very-big-form::-webkit-scrollbar {
	width: 5px;
	border-radius: 50%;
}

.very-big-form::-webkit-scrollbar-thumb {
	background-color: rgba(255, 255, 255, 0.6);
	/* outline: 1px solid slategrey; */
}
</style>
