<template>
        <div class="primary-wrapper">

<div class="primary-inner">
    <form @submit="handleSignup">

        <h3>Signup</h3>

        <div class="form-group">

            <label>Username</label>

            <input type="text" class="form-control" v-model="username" placeholder="User Name" />

        </div>

        <div class="form-group">

            <label>First Name</label>

            <input type="text" class="form-control" v-model="first_name" placeholder="First Name" />

        </div>

        <div class="form-group">

            <label>Last Name</label>

            <input type="text" class="form-control" v-model="last_name" placeholder="Last Name" />

        </div>

        <div class="form-group">

            <label>Email</label>

            <input type="email" class="form-control" v-model="email" placeholder="Email" />

        </div>

        <div class="form-group">

            <label>Password</label>

            <input type="password" class="form-control" v-model="password" placeholder="Password" />

        </div>

        <div class="form-group">

            <label>Confirm Password</label>

            <input type="password" class="form-control" v-model="confirm_password" placeholder="Confirm-Password" />

        </div>

        <button class="btn btn-primary btn-block">Signup</button>

    </form>
</div>
      
    </div>
</template>

<script>
import { inject } from 'vue';



export default {

    name: "Signup",

    data() {
        return {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
        }
    },

    setup() {
        const UserService = inject("UserServiceKey");
        return { UserService }
    },

    methods: {

        async handleSignup(e) {
            e.preventDefault();
            const data = {
                username: this.username,
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password
            }
            try {
                const res = await this.UserService.register( data );
                if (res.id) {
                    this.$router.push('/login');
                }

            } catch (err) {
                console.log(err);
            }

        }
    }

}

</script>