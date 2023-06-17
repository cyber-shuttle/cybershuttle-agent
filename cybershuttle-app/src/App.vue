<template>
  <div id="app">
   
    <AppNav />

    <div class="primary-wrapper">

        <div class="primary-inner">

          <router-view/>

        </div>
      
    </div>
    
  </div>
</template>

<script>
  import AppNav from './components/appNav.vue';

export default {

  name: 'App',
  components: {
    AppNav
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira_Sans:200,300,400,500,600,700,800');

* {
  box-sizing: border-box;
}

 body {
    background: rgb(193, 191, 191) !important;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    font-family: sans-serif;
  }

  h1, h2, h3, h4, h5, h6, label, span {
  font-weight: 500;
  font-family: sans-serif;
}

body, html, #app, #root, .primary-wrapper {
  widows: 100%;
  height: 100%;
}

#app{
  text-align: center;
}

#nav-bar:hover {
    text-transform: uppercase;
    color: white !important;
  }
  
.navbar-light {
    background-color: #909092;
    box-shadow: 0px 14px 80px rgba(24, 157, 106, 0.2);
  }
  

.primary-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}

.primary-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;

  background: rgb(179, 189, 202);
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
  /* display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  margin: 0 auto;
  */
}

.primary-warpper .form-control:focus {
  border-color: #060606;
  box-shadow: none;
}

.primary-warpper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-lable {
  font-weight: 400;
}

.forgot-password, .forgot-password a{
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a {
  color: #167bff;
}



</style>