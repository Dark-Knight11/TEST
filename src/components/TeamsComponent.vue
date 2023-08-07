<template>
	<details-component :hackathon="hackathon" :isAdmin="isAdmin" :startDateProp="startDateProp" :endDateProp="endDateProp"
		:appEndDateProp="appEndDateProp" :appStartDateProp="appStartDateProp"/>
	<div class="flex justify-center">
		<div class="w-4/5 h-1 rounded-full bg-purple-500 inline-flex"></div>
	</div>
	<section class="text-gray-400 bg-gray-900 body-font px-4 md:px-24 overflow-hidden">
		<div class="container px-5 pt-8 pb-24 mx-auto">
			<div class="text-center mb-10">
				<h1 class="sm:text-3xl text-2xl font-medium title-font text-white mb-4">
					Participating Teams
				</h1>
				<div class="flex mt-6 justify-center">
					<div class="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
				</div>
			</div>
			<div v-for="team in hackathon.teams" :key="team._id" class="-my-8 divide-y-2 divide-gray-800">
				<div class="py-8 flex flex-wrap md:flex-nowrap">
					<div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
						<span class="font-semibold title-font text-white">{{ team.name }}</span>
						<span v-for="member in team.members" :key="member._id">
							<span class="mt-1 text-gray-500 text-sm">{{ member.first_name + " " + member.last_name }}</span>
						</span>
					</div>
					<div class="md:flex-grow">
						<h2 class="text-2xl font-medium text-white title-font mb-2">
							{{ team.submissions.title }}
						</h2>
						<p class="text-white mb-2">
							{{ team.submissions.description }}
						</p>
						<span v-for="link in team.submissions.links" :key="link._id">
							<p class="leading-relaxed">
								Submission URL:
								<a :href="link" class="text-blue-600 underline">
									{{ link }}
								</a>
							</p>
						</span>
						<a @click="addReviewOpen(team._id)" v-show="isJudge"
							class="text-purple-400 inline-flex items-center mt-4 mr-8 cursor-pointer">
							Add Review
						</a>
						<a @click="disqaulify(team._id)" v-show="isAdmin"
							class="text-purple-400 inline-flex items-center mt-4 cursor-pointer">
							Disqualify
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Submit Review Form -->
	<div v-show="isAddReviewOpen"
		class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Add your review</h3>
				<svg @click="isAddReviewOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="review" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Add your review
						</label>
						<input id="review"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Review" v-model="review" />
					</div>

					<div class="identity-input mb-4">
						<label for="score" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Add your score
						</label>
						<input id="score"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="number" placeholder="0" v-model="score" />
					</div>

					<div class="flex items-center justify-center">
						<button @click="submitReview($event)"
							class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import DetailsComponent from '@/miniComponents/Hackathon/DetailsComponent.vue'
import axios from 'axios'
import { store, API_URL } from '@/common/user.js'
import moment from 'moment'
export default {
	name: 'TeamsComponent',
	components: { DetailsComponent },
	data() {
		return {
			hackathonId: this.$route.params.id,
			hackathon: {},
			isAdmin: false,
			isJudge: false,
			score: null,
			review: '',
			isAddReviewOpen: false,
			activatedID: null,
			startDateProp: '',
			endDateProp: '',
			appStartDateProp: '',
			appEndDateProp: ''
		}
	},
	methods: {
		async getHackathon() {
			try {
				const token = JSON.parse(localStorage.user).token
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				const res = await axios.get(`${API_URL}/hackathon/secret/${this.hackathonId}`, config)
				this.hackathon = res.data
				this.startDateProp = moment(this.hackathon.start_date).utc().format('MMM DD -');
				this.endDateProp = moment(this.hackathon.end_date).utc().format('MMM DD, YYYY');
				this.appStartDateProp = moment(this.hackathon.application_open).utc().format('MMM DD -');
				this.appEndDateProp = moment(this.hackathon.application_deadline).utc().format('MMM DD, YYYY');
				this.isAdmin = this.hackathon.admin._id === store.user._id
				this.isJudge = this.isJudge = this.hackathon.judges.some(
					(member) => member._id.toString() === store.user._id
				);
			} catch (error) {
				console.log(error);
			}
		},
		async disqaulify(teamId) {
			try {
				const config = {
					headers: {
						Authorization: `Bearer ${store.user.token}`,
					},
					data: {
						hackathon_id: this.hackathonId,
					}
				}
				const res = await axios.delete(`${API_URL}/hackathon/team/${teamId}`, config)
				console.log(res.data);
				this.getHackathon();
			} catch (error) {
				console.log(error);
			}
		},
		async submitReview(event) {
			event.preventDefault();
			if (this.score == null || this.review == "") {
				console.log("empty fields");
				return;
			}

			const res = await axios.post(`${API_URL}/hackathon/${this.hackathonId}/review`, {
				team_id: this.activatedID,
				score: this.score,
				review: this.review,

			}, {
				headers: {
					Authorization: `Bearer ${store.user.token}`,
				},
			})
			console.log(res.data);
			this.$router.go();
		},
		addReviewOpen(teamId) {
			this.isAddReviewOpen = true;
			this.activatedID = teamId;
		}
	},
	created() {
		this.hackathonId = this.$route.params.id
		this.getHackathon()
	},
}
</script>

<style></style>
