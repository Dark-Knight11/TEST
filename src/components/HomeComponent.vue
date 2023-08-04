<template>
  <section class="text-gray-400 bg-gray-900 body-font px-4 md:px-24 overflow-hidden">
    <div class="container px-5 py-12 mx-auto">
      <div class="text-center mb-20">
        <h1 class="sm:text-3xl text-2xl font-medium title-font text-white mb-4">List of Hackathons</h1>
        <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-400 text-opacity-80">Blue bottle crucifix
          vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi
          pug.</p>
        <div class="flex mt-6 justify-center">
          <div class="w-16 h-1 rounded-full bg-purple-500 inline-flex"></div>
        </div>
      </div>

      <div v-for="hackathon in hackathons" :key="hackathon.id">
        <div class="-my-8 divide-y-2 divide-gray-800">
          <div class=" py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <div class="flex items-center rounded-lg h-56 mb-2 overflow-hidden pe-5">
                <img alt="content" class="object-cover object-center h-full align-middle" :src="hackathon.imgUrl" />
              </div>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-white title-font mb-2"> {{ hackathon.name }} </h2>
              <p class="leading-relaxed mb-2">{{
                (hackathon.description != null) ? hackathon.description.length > 350
                ? hackathon.description.substring(0, 350).concat('...')
                : hackathon.description : ('No description')
              }}</p>
              <p class="mb-2"> Prize Pool: <span class="text-lg text-white title-font"> {{ hackathon.prizes.reduce((acc,
                prize) => acc +
                prize.amount, 0) }} INR </span></p>
              <div @click="clicked(hackathon)" class="text-purple-400 inline-flex items-center mt-4 cursor-pointer">Learn
                More
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

    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/common/user';
export default {
  name: 'HomeComponent',
  data() {
    return {
      hackathons: []
    }
  },
  methods: {
    async getHackathons() {
      try {
        const response = await axios.get(`${API_URL}/hackathons`);
        this.hackathons = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    clicked(hackathon) {
      this.$router.push({
        name: "Hackathon",
        params: { id: hackathon._id },
      });
    }
  },
  mounted() {
    this.getHackathons();
  }
}
</script>

<style></style>