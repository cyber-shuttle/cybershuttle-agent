<template>
    <form @submit="handleSubmit">

        <h3>Signup</h3>

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
</template>

<script>
import { runInThisContext } from 'vm';
import { register } from "../api/auth";


export default {

    name: "Signup",

    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
        }
    },

    methods: {
        async handleSubmit(e) {
            e.preventDefault();
            const data = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password
            }
            console.log(data);

            try {
                const res = await register({ username, first_name, second_name, email, password });
                if (res.error) console.log(res.error);
                else {
                    console.log(res.message);
                }
            } catch (err) {
                console.log(err);
            }

        }
    }

}

</script>