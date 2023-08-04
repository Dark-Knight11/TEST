<template>
	<section class="text-gray-400 bg-gray-900 body-font">
		<div class="container px-5 py-12 mx-auto flex flex-col">
			<div class="flex flex-col items-center text-center w-full mb-16">
				<h1 class="sm:text-3xl text-2xl font-medium title-font text-white">
					Sponsored by
				</h1>
				<div class="flex mt-6 justify-center">
					<div class="w-16 h-1 rounded-full bg-purple-500 inline-flex mb-2"></div>
				</div>
				<button v-show="isAdmin" @click="isAddSponsorOpen = true" type="button"
					class="text-white w-fit bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base md:mt-0">
					Add Sponsor
				</button>
			</div>
			<div class="flex m-4 flex-wrap justify-center">
				<div v-for="sponsor in hackathon.partners" :key="sponsor._id" class="p-4 w-80 flex">
					<div class="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
						<div class="flex items-center mb-3">
							<div v-if="sponsor.logo == null || sponsor.logo == ''"
								class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-purple-500 text-white flex-shrink-0">
								<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
									stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
									<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
								</svg>
							</div>
							<img v-else alt="content" viewBox="0 0 24 24"
								class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-purple-500 text-white flex-shrink-0"
								:src="sponsor.logo" />
							<h2 class="flex-grow text-white text-lg title-font font-medium">
								{{ sponsor.name }}
							</h2>
						</div>
						<div class="flex-grow">
							<p class="leading-relaxed text-base">
								Blue bottle crucifix vinyl post-ironic four dollar toast vegan
								taxidermy. Gastropub indxgo juice poutine.
							</p>
							<a class="mt-3 text-purple-400 inline-flex items-center" :href="sponsor.website">
								Learn More
								<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
									stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
									<path d="M5 12h14M12 5l7 7-7 7"></path>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Add Sponsor Form -->
	<div v-show="isAddSponsorOpen"
		class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Add Sponsor</h3>
				<svg @click="isAddSponsorOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="sponsor" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Sponsor
						</label>
						<input id="sponsor"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Sponsor" v-model="sponsor" />
					</div>

					<div class="identity-input mb-4">
						<label for="logo" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Logo
						</label>
						<input id="logo"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Logo Link" v-model="logo" />
					</div>

					<div class="identity-input mb-4">
						<label for="website" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Website
						</label>
						<input id="website"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Website" v-model="website" />
					</div>

					<div class="flex items-center justify-center">
						<button @click="addSponsor($event)"
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
	name: 'SponsorsComponent',
	props: {
		hackathon: Object,
		isAdmin: Boolean,
	},
	data() {
		return {
			isAddSponsorOpen: false,
			sponsor: '',
			logo: '',
			website: '',
		};
	},
	methods: {
		async addSponsor(e) {
			e.preventDefault();
			const sponsors = this.hackathon.partners;
			sponsors.push({
				name: this.sponsor,
				logo: this.logo,
				website: this.website,
			});
			try {
				await axios.put(`${API_URL}/hackathon/${this.hackathon._id}`, {
					partners: sponsors,
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`,
					},
				});
				this.sponsor = '';
				this.logo = '';
				this.website = '';
			} catch (err) {
				console.log(err);
			}
			this.isAddSponsorOpen = false;
		},
	},
}
</script>
