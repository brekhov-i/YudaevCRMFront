import { MutationTree } from "vuex";
import { IAuth } from "@/types/store";

export const mutations: MutationTree<IAuth> = {
  updateToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
};
