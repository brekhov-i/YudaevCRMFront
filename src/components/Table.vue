<template>
  <div class="table">
    <div class="table__header">
      <div class="table__row">
        <div class="table__col"></div>
        <div v-for="col in cols" :key="col.name" class="table__col">{{ col.title }}</div>
      </div>
      <div class="table__row">
        <div class="table__search">
          <label for="searchInput">Поиск</label>
          <select v-model="selectedOption">
            <option v-for="option in cols" :key="option.name" :value="option.name">{{ option.title }}</option>
          </select>
          <input id="searchInput" v-model="searchInput" class="searchInput" name="searchInput" type="search">
        </div>
        <button class="table__upload" @click="googleSheets()">Выгрузить в google tables</button>
      </div>
    </div>
    <div class="table__body">
      <div v-for="(row, index) in filterItems" :key="'row'+index" class="table__row">
        <div class="table__col">
          <input id="check" v-model="checkStudent" :value="row" name="" type="checkbox">
        </div>
        <div v-for="(col, index) in row" :key="'col'+index" class="table__col">{{ col }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { computed, ComputedRef, onMounted, Ref, ref } from "vue";
import { IStudent } from "@/types/student";
import { useStore } from "vuex";

const store = useStore();

const selectedOption: Ref<string | null> = ref( null );
const searchInput = ref( "" );
const chats = computed( () => store.getters[ "Student/chats" ] );
const chatSelect = ref( chats.value ? chats.value[ 0 ] : null )
const cols = ref( [
  {
    title: "id",
    name: "_id",
  },
  {
    title: "ФИО",
    name: "name",
  },
  {
    title: "Телефон",
    name: "phone",
  },
  {
    title: "Email",
    name: "email",
  },
  {
    title: "Telegram",
    name: "telegram",
  },
  {
    title: "Последний пройденный урок",
    name: "lastLesson",
  },
  {
    title: "Чат",
    name: "chat",
  },
] );

const students: ComputedRef<IStudent[]> = computed( () => store.getters[ "Student/students" ] );
const user: ComputedRef = computed( () => store.getters[ "Auth/user" ] );
;

const checkStudent = ref( [] );

const filterItems = computed( () => {

  const newArr: IStudent[] | Object[] = [];

  students.value.map( item => {
    const arr: IStudent | Object = {};
    cols.value.forEach( col => {
      arr[ col.name ] = item[ col.name ]
    } )
    newArr.push( arr );
  } )

  const search = searchInput.value.toLowerCase();

  if ( !search ) {
    return newArr;
  }

  return newArr.filter( ( item ) => {
    if ( selectedOption.value !== null ) {
      if ( selectedOption.value === 'chat' ) {
        const id = chats.value.find(el => el.title.includes(search))?._id;
        return item[ selectedOption.value ].includes( id );
      } else {
        return item[ selectedOption.value ].toLowerCase().includes( search );
      }
    }
  } );

} )

const googleSheets = async () => {
  await store.dispatch( "Student/unloadStudents", checkStudent.value )
}

onMounted( () => {
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
      grid-template-columns: 0.2fr 0.5fr 1fr 1fr 1fr 1fr 1fr 0.2fr;
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
      grid-template-columns: 0.2fr 0.5fr 1fr 1fr 1fr 1fr 1fr 0.2fr;

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