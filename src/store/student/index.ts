import { Module } from "vuex";
import { IStore, IStoreStudent } from "@/types/store";
import { mutations } from "@/store/student/mutations";
import { getters } from "@/store/student/getters";
import { actions } from "@/store/student/actions";

export const state: IStoreStudent = {
  students: [],
  chats: []
};

const namespaced: boolean = true;

export const Student: Module<IStoreStudent, IStore> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
