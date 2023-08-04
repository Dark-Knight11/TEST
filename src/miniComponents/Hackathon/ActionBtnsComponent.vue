<template>
	<div class="flex flex-wrap gap-2 md:flex-row md:justify-around">
		<button v-show="!isRegistered && !isAdmin && !isInvited" @click="openRegisterForm()"
			class="flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
			Register Now
		</button>
		<button v-show="isInvited && !isRegistered" @click="joinTeam()"
			class="flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
			Join Team
		</button>
		<button v-show="isRegistered" @click="openMyTeam()"
			class="flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
			View Team Details
		</button>
		<button v-show="isRegistered" @click="isInviteOpen = true;"
			class="flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
			Invite Member
		</button>
		<button v-show="isRegistered" @click="openSubmitSolutionForm()"
			class="flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
			Submit My Solution
		</button>
		<div @click="goToTeamsPage()" v-show="isJudge || isAdmin"
			class="flex text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
			Participating Teams
		</div>
	</div>

	<!-- Register Team Form -->
	<div v-show="isRegisterTeamOpen"
		class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Register your team</h3>
				<svg @click="isRegisterTeamOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="teamName" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Team Name
						</label>
						<input id="teamName"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Team Name" v-model="teamName" />
					</div>

					<div class="flex items-center justify-center">
						<button @click="registerTeam($event)"
							class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit">
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- My Team Form -->
	<div v-show="isMyTeamOpen"
		class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">My team</h3>
				<svg @click="isMyTeamOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="teamName" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Team Name
						</label>
						<input id="teamName"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Team Name" v-model="teamName" />
					</div>
					<div v-for="member in team" :key="member._id">
						<div class="identity-input mb-4">
							<label for="member1" class="block text-gray-300 text-sm text-left font-bold mb-2">
								Members
							</label>
							<p class="text-white text-left font-bold mb-2">{{ member.first_name + " " + member.last_name }}
							</p>
							<!-- <input id="member"
								class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								type="text" placeholder="Member" value="{{ member.first_name}}" /> -->
						</div>
					</div>


					<!-- <div class="identity-input mb-4">
						<label for="member2" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Member 2
						</label>
						<input id="member2"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Team Name" v-model="member2" />
					</div> -->

					<div class="flex items-center justify-center">
						<button @click="editMyTeam($event)"
							class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- Submit Solution Form -->
	<div v-show="isSubmitSolutionOpen"
		class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">Submit your solution</h3>
				<svg @click="isSubmitSolutionOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="title" class="block text-gray-300 text-sm text-left font-bold mb-2">
							TItle
						</label>
						<input id="title"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Problem Statement" v-model="title" />
					</div>

					<div class="identity-input mb-4">
						<label for="description" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Description
						</label>
						<input id="description"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Description of Problem" v-model="description" />
					</div>

					<div class="identity-input mb-4">
						<label for="links" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Submission Links
						</label>
						<input id="links"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Enter comma separated Links" v-model="links" />
					</div>
					<div class="flex items-center justify-center">
						<button @click="submitSolution($event)"
							class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- Send Invitation -->
	<div v-show="isInviteOpen"
		class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
			<div class="flex items-center justify-between">
				<h3 class="text-2xl">invite your teammate</h3>
				<svg @click="isInviteOpen = false" xmlns="http://www.w3.org/2000/svg"
					class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="mt-4">
				<form class="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
					<div class="identity-input mb-4">
						<label for="teamName" class="block text-gray-300 text-sm text-left font-bold mb-2">
							Email Id of member
						</label>
						<input id="teamName"
							class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="text" placeholder="Email" v-model="email" />
					</div>

					<div class="flex items-center justify-center">
						<button @click="inviteMember($event)"
							class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit">
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { store, API_URL } from '@/common/user.js'
export default {
	name: "ActionBtnsComponent",
	data() {
		return {
			isRegisterTeamOpen: false,
			isMyTeamOpen: false,
			isSubmitSolutionOpen: false,
			isInviteOpen: false,
			isInvited: false,
			links: '',
			title: '',
			description: '',

			teamName: '',
			email: '',
			members: [],
			team: []
		}
	},
	props: {
		isRegistered: {
			type: Boolean,
			default: false
		},
		isJudge: {
			type: Boolean,
			default: false
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		hackathon: {
			type: Object,
			default: () => { }
		}
	},
	methods: {
		openRegisterForm() {
			if (store.loggedIn === false) {
				this.$router.push('/login');
				return;
			}
			this.isRegisterTeamOpen = true;
		},
		async registerTeam(event) {
			event.preventDefault();
			if (store.loggedIn === false) {
				this.$router.push('/login');
				return;
			}
			try {
				const res = await axios.post(`${API_URL}/hackathon/team`, {
					"hackathon_id": this.hackathon._id,
					"name": this.teamName
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`,
					}
				});
				console.log(res);
				store.user.hackathonsParticipated.push(this.hackathon._id);
				localStorage.setItem('user', JSON.stringify(store.user))
				this.isRegisterTeamOpen = false;
				this.$router.go();
			} catch (error) {
				console.log(error)
			}
		},
		async inviteMember(event) {
			event.preventDefault();
			try {
				const teamId = this.hackathon.teams.filter(team => team.members.some(
					member => member._id === store.user._id
				))[0]._id;
				const res = await axios.post(`${API_URL}/hackathon/team/${teamId}/invite`, {
					"hackathon_id": this.hackathon._id,
					"email": this.email
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`,
					}
				});
				console.log(res);
			} catch (error) {
				console.log(error)
			} finally {
				this.isInviteOpen = false;
			}
		},
		async joinTeam() {
			try {
				if (store.loggedIn === false) {
					this.$router.push('/login');
					return;
				}
				const teamId = this.hackathon.teams.filter(team => team.members.some(
					member => member._id === store.user._id
				))[0]._id;
				const res = await axios.post(`${API_URL}/hackathon/team/${teamId}/join`, {
					"hackathon_id": this.hackathon._id
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`,
					}
				});
				console.log(res);
			} catch (error) {
				console.log(error)
			}
		},
		openMyTeam() {
			this.isMyTeamOpen = true;
			const team = this.hackathon.teams.filter(team => team.members.some(
				member => member._id === store.user._id
			))[0]
			this.teamName = team.name;
			this.team = team.members;
		},
		async editMyTeam(event) {
			event.preventDefault();
			try {
				const teamId = this.hackathon.teams.filter(team => team.members.some(
					member => member._id === store.user._id
				))[0]._id;
				const res = await axios.put(`${API_URL}/hackathon/team/${teamId}`, {
					"name": this.teamName
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`,
					}
				});
				console.log(res);
				this.isMyTeamOpen = false;
				this.$router.go();
			} catch (error) {
				console.log(error)
			}
		},
		async submitSolution(event) {
			event.preventDefault();
			try {
				const teamId = this.hackathon.teams.filter(team => team.members.some(
					member => member._id === store.user._id
				))[0]._id;
				const res = await axios.put(`${API_URL}/hackathon/team/${teamId}`, {
					"submissions": {
						title: this.title,
						description: this.description,
						links: this.links.split(', ') || this.links.split(',')
					}
				}, {
					headers: {
						Authorization: `Bearer ${store.user.token}`,
					}
				});
				console.log(res);
				this.isSubmitSolutionOpen = false;
				this.$router.go();
			} catch (error) {
				console.log(error)
			}
		},
		async openSubmitSolutionForm() {
			this.isSubmitSolutionOpen = true;
			const team = this.hackathon.teams.filter(team => team.members.some(
				member => member._id === store.user._id
			))[0];
			console.log(team.submissions);
			// set submit solution form data
			if (team) {
				this.title = team.submissions.title;
				this.description = team.submissions.description;
				this.links = team.submissions.links.join(', ');
			}
		},
		goToTeamsPage() {
			this.$router.push({
				name: 'Teams',
				id: this.hackathon._id
			});
		},
	},
	created() {
		this.isInvited = this.$route.query.invite !== undefined;
	}
}
</script>