import { ActionTree } from "vuex";
import { IAuth } from "@/types/store";
import { IStore } from "@/types/store";
import axios from "axios";

export const actions: ActionTree<IAuth, IStore> = {
  async login({ commit, dispatch }, formData) {
    try {
      await axios
        .post("http://localhost:3000/api/user", formData)
        .then((res: any) => {
          localStorage.setItem("user-token", res.data.access_token);
          commit("updateToken", res.data.access_token);
        });
    } catch (e) {
    }
  },

  async getUser({ commit, dispatch }) {
    try {
      await axios
        .get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        })
        .then((res: any) => {
          commit("setUser", res.data);
        });
    } catch (e) {}
  },
};
