import Vuex, { StoreOptions } from "vuex";
import { IStore } from "@/types/store";
import { Auth } from "@/store/auth";
import { Student } from "./student/index";

const store = new Vuex.Store<IStore>({
  state: {
  },
  getters: {
  },
  modules: {
    Auth,
    Student
  },
});

export default store;
