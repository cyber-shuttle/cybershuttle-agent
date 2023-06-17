<template>
    <form>

        <h3>Signup</h3>

        <div class="form-group">

            <label>Email</label>

            <input type="email" class="form-control" placeholder="Email" />

        </div>

        <div class="form-group">

            <label>Password</label>

            <input type="password" class="form-control" placeholder="Password" />

        </div>

        <div class="form-group">

            <label>Retype-Password</label>

            <input type="password" class="form-control" placeholder="Retype-Password" />

        </div>

        <button class="btn btn-primary btn-block">Signup</button>

    </form>
</template>

<script>

export default {

    name: "Signup"

}

</script>