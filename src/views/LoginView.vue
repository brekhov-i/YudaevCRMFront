<template>
  <div class="container">
    <div class="loginForm">
      <div class="loginForm__title">Вход</div>
      <div class="loginForm__field">
        <label for="login">Логин</label>
        <input id="login" v-model="login" type="text">
      </div>
      <div class="loginForm__field">
        <label for="password">Пароль</label>
        <input id="password" v-model="password" type="password">
      </div>
      <button class="loginForm__btn" @click="submitForm()">Войти</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const login = ref("");
const password = ref("");

const submitForm = async () => {

  const formData = {
    email: login.value,
    password: password.value
  }

  await store.dispatch("Auth/login", formData)

  await store.dispatch( "Auth/getUser" ).then( () => {
    router.push( "/" )
  } )
}

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginForm {
  width: 400px;
  height: 400px;
  padding: 20px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &__title {
    font-size: 2em;
    align-self: center;
    margin-bottom: 50px;
  }

  &__field {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 30px;

    label {
      font-size: 1em;
      margin-bottom: 10px;
    }

    input {
      width: calc(100% - 2px);
      height: 40px;
      border: 1px solid;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }

  &__btn {
    width: 300px;
    height: 40px;
    border-radius: 10px;
    align-self: center;
    font-size: 1em;
    cursor: pointer;
  }
}
</style>