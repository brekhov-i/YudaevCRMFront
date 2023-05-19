<template>
  <router-view/>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

.container {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 1fr;
}

.header {
  width: 100%;
  height: 100%;
  grid-column: span 2;
  grid-row: 1;
  background-color: grey;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .userCart {
    width: 150px;
    height: 30px;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: flex-end;
    margin-left: auto;
    margin-right: 30px;
  }
}

.saidbar {
  width: 100%;
  grid-column: 1;
  grid-row: 2;
  background-color: grey;
}

.mainContent {
  width: 100%;
  grid-column: 2;
  grid-row: 2;
  padding: 10px;
}
</style>
