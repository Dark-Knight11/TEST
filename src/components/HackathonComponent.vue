<template>
	<details-component :hackathon="hackathon" :isAdmin="isAdmin" :startDateProp="startDateProp" :endDateProp="endDateProp"
		:appEndDateProp="appEndDateProp" :appStartDateProp="appStartDateProp" />

	<action-btns-component :isRegistered="isRegistered" :isAdmin="isAdmin" :hackathon="hackathon" :isJudge="isJudge" />

	<problems-component v-show="showProblems || isAdmin" :hackathon="hackathon" :isAdmin="isAdmin" />

	<prizes-component :hackathon="hackathon" :isAdmin="isAdmin" />

	<div class="w-full flex relative flex-col sm:flex-row justify-center items-start">
		<div class="sm:w-3/5"><rules-component :hackathon="hackathon" :isAdmin="isAdmin" /></div>
		<div class="sm:w-2/5"><announcements-component :hackathon="hackathon" :isAdmin="isAdmin" /></div>
	</div>

	<sponsors-component :hackathon="hackathon" :isAdmin="isAdmin" />

	<judges-component :hackathon="hackathon" :isAdmin="isAdmin" />

	<faqs-component :hackathon="hackathon" :isAdmin="isAdmin" />
</template>

<script>
import DetailsComponent from '@/miniComponents/Hackathon/DetailsComponent.vue'
import PrizesComponent from '@/miniComponents/Hackathon/PrizesComponent.vue'
import RulesComponent from '@/miniComponents/Hackathon/RulesComponent.vue'
import AnnouncementsComponent from '@/miniComponents/Hackathon/AnnouncementsComponent.vue'
import SponsorsComponent from '@/miniComponents/Hackathon/SponsorsComponent.vue'
import ProblemsComponent from '@/miniComponents/Hackathon/ProblemsComponent.vue'
import JudgesComponent from '@/miniComponents/Hackathon/JudgesComponent.vue'
import FaqsComponent from '@/miniComponents/Hackathon/FaqsComponent.vue'
import ActionBtnsComponent from '@/miniComponents/Hackathon/ActionBtnsComponent.vue'
import axios from 'axios'
import { store, API_URL } from '@/common/user.js'
import moment from 'moment'

export default {
	components: { DetailsComponent, ProblemsComponent, PrizesComponent, RulesComponent, AnnouncementsComponent, SponsorsComponent, JudgesComponent, FaqsComponent, ActionBtnsComponent },
	name: 'HackathonComponent',
	data() {
		return {
			hackathon: {},
			isLoggedIn: false,
			isRegistered: false,
			isJudge: false,
			isAdmin: false,
			showProblems: false,
			hackathonId: this.$route.params.id,
			startDateProp: '',
			endDateProp: '',
			appStartDateProp: '',
			appEndDateProp: '',
		}
	},
	methods: {
		async getDetails() {
			// get details from backend
			try {
				const response = await axios.get(`${API_URL}/hackathon/${this.hackathonId}`)
				this.hackathon = response.data
				const user = JSON.parse(localStorage.user)
				this.isRegistered = user.hackathonsParticipated.includes(this.hackathon._id)
				this.isJudge = this.hackathon.judges.some(
					(member) => member._id.toString() === user._id
				);
				this.isAdmin = this.hackathon.admin._id === user._id
				this.showProblems = this.hackathon.problem_statement.length > 0
				this.startDateProp = moment(this.hackathon.start_date).utc().format('MMM DD -');
				this.endDateProp = moment(this.hackathon.end_date).utc().format('MMM DD, YYYY');
				this.appStartDateProp = moment(this.hackathon.app_start_date).utc().format('MMM DD -');
				this.appEndDateProp = moment(this.hackathon.app_end_date).utc().format('MMM DD, YYYY');
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		this.getDetails()
		this.isLoggedIn = store.loggedIn
	}
}
</script>
