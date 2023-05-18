import { GetterTree } from "vuex";
import { IAuth } from "@/types/store";
import { IStore } from "@/types/store";

export const getters: GetterTree<IAuth, IStore> = {
  isAuth: (state) => (state.token === "" ? false : true),
  user: (state) => state.user,
};
