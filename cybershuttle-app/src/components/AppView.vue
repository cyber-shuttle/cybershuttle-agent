<template>
    <form @submit="handleSubmit">

        <h3>App View</h3>

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
        async handleShowModels(e) {
            e.preventDefault();
            const data = {
                email: this.email,
                password: this.password
            }
            console.log(data);

            try {
                const res = await login({ data });
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