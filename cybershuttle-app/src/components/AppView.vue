<template>
    <form @submit="handleSubmit">

        <h3>App View</h3>

        <button class="btn btn-primary btn-block">Appview</button>

    </form>
</template>

<script>

export default {

    name: "AppView",

    data() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        async handleSubmit(e) {
            e.preventDefault();
            console.log("hi");

        }
    }

}

</script>