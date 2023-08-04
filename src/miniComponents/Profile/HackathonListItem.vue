<template>
	<section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
		<div class="container px-5 py-8 mx-auto">
			<div class="-my-8 divide-y-2 divide-gray-800">
				<div class="py-8 flex flex-wrap md:flex-nowrap">
					<div class="md:flex-grow">
						<h2 class="text-2xl font-medium text-white title-font mb-2">
							{{ title }}
						</h2>
						<p class="leading-relaxed">
							{{
								(description != null) ? (description.length > 350
									? description.substring(0, 350).concat('...')
									: description) : "No description"
							}}
						</p>
						<div @click="clicked()" class="text-purple-400 inline-flex items-center mt-4 cursor-pointer">
							Learn More
							<svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
								stroke-linecap="round" stroke-linejoin="round">
								<path d="M5 12h14"></path>
								<path d="M12 5l7 7-7 7"></path>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'HackathonListItem',
	props: {
		title: String,
		description: String,
		hackathonId: String,
	},
	methods: {
		clicked() {
			this.$router.push({
				name: "Hackathon",
				params: { id: this.hackathonId },
			});
		}
	}
}

</script>

<style></style>
