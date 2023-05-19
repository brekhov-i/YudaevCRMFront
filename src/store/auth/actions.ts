import { ActionTree } from "vuex";
import { IAuth, IStore } from "@/types/store";
import axios from "axios";

export const actions: ActionTree<IAuth, IStore> = {
  async login({ commit, dispatch }, formData) {
    try {
        await axios
            .post( "http://vm546666.eurodir.ru/api/user", formData )
            .then( ( res: any ) => {
                console.log(res)
                localStorage.setItem( "user-token", res.data.access_token );
                commit( "updateToken", res.data.access_token );
            } ).catch(function (error: any) {
                // handle error
                console.log(error)
                // if(error.response?.data.statusCode === 401) {
                //     localStorage.removeItem("user-token")
                //     window.location.reload();
                // }
            })
    } catch (e) {
        console.log( e )
    }
  },

  async getUser({ commit, dispatch }) {
    try {
      await axios
        .get("http://vm546666.eurodir.ru/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        })
        .then((res: any) => {
          commit("setUser", res.data);
        }).catch(function (error: any) {
              // handle error
              // console.log(error)
              // if(error.response?.data.statusCode === 401) {
              //     localStorage.removeItem("user-token")
              //     window.location.reload();
              // }
          });
    } catch (e) {
        console.log( e )
    }
  },
};
