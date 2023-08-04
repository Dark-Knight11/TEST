<template>
  <section class="text-gray-400 bg-gray-900 body-font px-4 md:px-24 overflow-hidden">
    <div class="container px-5 py-12 mx-auto">
      <div class="text-center mb-20 pt-8">
        <h1 class="sm:text-3xl text-2xl font-medium title-font text-white mb-4">Problem Statements</h1>
        <div class="flex mt-6 justify-center">
          <div class="w-16 h-1 rounded-full bg-purple-500 inline-flex mb-2"></div>
        </div>
        <button v-show="isAdmin" @click="isAddPSOpen = true" type="button"
          class="text-white bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base md:mt-0">
          Add Problem Statement
        </button>
      </div>

      <div v-for="problem in hackathon.problem_statement" :key="problem._id"
        class="-my-8 mx-12 divide-y-2 divide-gray-800">
        <div class="py-8 flex flex-wrap md:flex-nowrap">
          <div class="md:w-32 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span class="font-semibold title-font text-white">Category</span>
            <span class="font-semibold title-font text-white">{{ problem.category }}</span>
          </div>
          <div class="md:flex-grow">
            <h2 class="text-2xl font-medium text-white title-font mb-2">{{ problem.title }}</h2>
            <p class="leading-relaxed">{{ problem.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Add Problem Statement Form -->
  <div v-show="isAddPSOpen"
    class="fixed h-screen w-screen bottom-0 text-gray-300 flex items-center justify-center bg-gray-700 bg-opacity-50">
    <div class="w-full max-w-sm p-6 bg-gray-900 rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Add Problem Statement</h3>
        <svg @click="isAddPSOpen = false" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-900 cursor-pointer"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              type="text" placeholder="Description" v-model="description" />
          </div>

          <div class="identity-input mb-4">
            <label for="category" class="block text-gray-300 text-sm text-left font-bold mb-2">
              Category
            </label>
            <input id="category"
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text" placeholder="Category" v-model="category" />
          </div>

          <div class="flex items-center justify-center">
            <button @click="addPS($event)"
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
import { store, API_URL } from '@/common/user.js'
export default {
  name: 'ProblemsComponent',
  props: {
    hackathon: { type: Object },
    isAdmin: { type: Boolean }
  },
  data() {
    return {
      isAddPSOpen: false,
      category: '',
      title: '',
      description: ''
    }
  },
  methods: {
    async addPS(e) {
      e.preventDefault()
      const ps = this.hackathon.problem_statement
      ps.push({
        category: this.category,
        title: this.title,
        description: this.description
      });
      try {
        await axios.put(`${API_URL}/hackathon/${this.hackathon._id}`, {
          problem_statement: ps
        }, {
          headers: {
            'Authorization': `Bearer ${store.user.token}`
          }
        })
      } catch (err) {
        console.log(err)
      }
      this.isAddPSOpen = false;
    }
  }
}
</script>

<style></style>
