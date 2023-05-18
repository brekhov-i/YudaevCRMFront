<template>
  <div class="container">
    <div class="header">
      <div v-if="user.chat" class="chatId">Чат {{ 1 }}</div>
      <router-link :to="`/admin/${user._id}`" class="userCart">
        <div class="userCart__name">{{ user.name }}</div>
      </router-link>
    </div>
    <div class="saidbar"></div>
    <div class="mainContent">
      <Table />
    </div>
  </div>
</template>

<script lang="ts" setup>

import Table from "@/components/Table.vue";
import { computed, ComputedRef, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const user: ComputedRef = computed( () => store.getters[ "Auth/user" ] );

onMounted( async () => {
  await store.dispatch( "Auth/getUser" ).then( () => {
  } )
  const userLoad: ComputedRef = computed( () => store.getters[ "Auth/user" ] );
  // user.value = userLoad.value
  await store.dispatch( "Student/getStudents", userLoad.value ).then( () => {
  } )
} )


</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 1fr;
}

.header {
  .chatId {
    margin-left: 200px;
    color: white;
    font-size: 1.5em;
  }
}

.table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &__header {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: lightgray;
    row-gap: 10px;

    .table__row:has(.table__col) {
      display: grid;
      grid-template-columns: 0.2fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
    }

    .table__col {
      height: 30px;
    }
  }

  &__row {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 1px solid;
    }
  }

  &__col {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    &:not(:last-child) {
      border-right: 1px solid;
    }
  }

  &__search {
    display: grid;
    grid-template-columns: 100px 200px;
    justify-content: flex-start;
    align-items: flex-start;

    label {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: left;
      grid-column: span 2;
      margin-bottom: 10px;
    }

    select {
      margin-right: 20px;
    }
  }

  &__upload {
    width: 200px;
    height: 30px;
    border-right: 4px;
    background-color: #42b983;
    border: none;
    font-size: 16px;
    margin-right: 30px;
    cursor: pointer;
    margin-left: auto;
  }

  &__body {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .table__row {
      min-height: 40px;
      height: auto;
      display: grid;
      grid-template-columns: 0.2fr 0.5fr 1fr 1fr 1fr 1fr 1fr;
    }

    .table__col {
      width: 100%;
      height: 100%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      overflow: hidden;
      overflow-x: scroll;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 10px;
    }

  }
}
</style>