import { GetterTree } from "vuex";
import { IStore, IStoreStudent } from "@/types/store";

export const getters: GetterTree<IStoreStudent, IStore> = {
  students: (state) => state.students,
  chats: state => state.chats
};
