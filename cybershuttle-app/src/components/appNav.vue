<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">


    <div class="container">

      <router-link to="/" class="navbar-brand" id="nav-bar">Cybershuttle</router-link>

      <div class="collapse navbar-collapse">

        <ul class="navbar-nav ms-auto">

          <li class="nav-item">

            <router-link to="/login" class="nav-link" v-if="isLoggedIn === false" id="nav-bar">Login</router-link>

          </li>

          <li class="nav-item">

            <router-link to="/signup" class="nav-link" v-if="isLoggedIn === false" id="nav-bar">Sign up</router-link>

          </li>

          <li class="nav-item">

            <router-link to="/myapps" class="nav-link" v-if="isLoggedIn === true" id="nav-bar">Apps</router-link>

          </li>

          <li class="nav-item">

            <a @click.prevent="singout" class="nav-link" v-if="isLoggedIn === true" id="nav-bar">Signout</a>

          </li>

        </ul>

      </div>

    </div>

  </nav>
</template>
  
<script>
import { mapState } from 'pinia'
import { useUsersStore } from "../stores/users";


export default {

  name: 'AppNav',
  computed: {
    ...mapState(useUsersStore, ['isLoggedIn'])
},

  setup() {
    const userStore = useUsersStore();
    return {
      userStore
    }
  },

  methods: {
    singout() {
      this.userStore.$reset();
      this.$router.push('/')
    },
  }

}
</script>
  
<style></style>