import { IAuth } from "@/types/store";
import { Module } from "vuex";
import { IStore } from "@/types/store";
import { actions } from "@/store/auth/actions";
import { mutations } from "@/store/auth/mutation";
import { getters } from "@/store/auth/getters";

export const state: IAuth = {
  token: localStorage.getItem("user-token") || "",
  user: {},
};

const namespaced: boolean = true;

export const Auth: Module<IAuth, IStore> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
