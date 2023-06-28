<template>
    <div class="primary-wrapper">

        <div class="primary-inner">
    <form @submit="handleLogin">

        <h3>Login</h3>

        <div class="form-group">

            <label>Email</label>

            <input type="email" class="form-control" v-model="email" placeholder="Email" />

        </div>

        <div class="form-group">

            <label>Password</label>

            <input type="password" class="form-control" v-model="password" placeholder="Password" />

        </div>

        <button class="btn btn-primary btn-block">Login</button>

    </form>
    </div>
      
    </div>
</template>

<script>

import { inject } from 'vue';
import { useUsersStore } from "../stores/users";

export default {

    name: "Login",

    data() {
        return {
            email: '',
            password: ''
        }
    },

    setup() {
        const UserService = inject("UserServiceKey");
        return { UserService }
    },

    methods: {
        async handleLogin(e) {
            e.preventDefault();
            const data = {
                email: this.email,
                password: this.password
            }

            try {
                const res = await this.UserService.login({ data });
                if (res.Ok) {
                    const userStore = useUsersStore();
                    userStore.setUsername(res.username);
                    userStore.setUserid(res.id);
                    userStore.setFirstname(res.first_name);
                    userStore.setLastname(res.last_name);
                    userStore.setToken(res.token);
                    userStore.setIsLoggedIn(true);
                    this.$router.push('/myapps');
                }

            } catch (err) {
                console.log(err);
            }

        }
    }

}

</script>