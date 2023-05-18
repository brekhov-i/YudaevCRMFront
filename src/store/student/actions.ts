import { ActionTree } from "vuex";
import { IStore, IStoreStudent } from "@/types/store";
import { IStudent } from "@/types/student";
import axios from "axios";

export const actions: ActionTree<IStoreStudent, IStore> = {
  async getStudents({ commit, dispatch }, user) {
    console.log(user)
    let uri = `http://vm546666.eurodir.ru/api/student/chat/${user.chat}`;
    if(user.role.name === "admin") {
      await axios
          .get( "http://vm546666.eurodir.ru/api/student", {
            headers: {
              Authorization: `Bearer ${ localStorage.getItem( "user-token" ) }`,
            },
          } )
          .then( ( res: any ) => {
            commit( "setStudents", res.data );
          } );

      await axios.get( "http://vm546666.eurodir.ru/api/student/getChats", {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem( "user-token" ) }`,
          UserRole: "admin",
        },
      } ).then( ( res: any ) => {
        console.log(res.data)
        commit( "setChats", res.data );
      } );
    } else {
      await axios
          .get( uri, {
            headers: {
              Authorization: `Bearer ${ localStorage.getItem( "user-token" ) }`,
            },
          } )
          .then( ( res: any ) => {
            commit( "setStudents", res.data );
          } );
    }
  },

  async uploadStudents( { commit }, formData ) {
    await axios.post( "http://vm546666.eurodir.ru/api/student/upload", formData, {
      headers: {
        "Content-Type": 'multipart/form-data',
        Authorization: `Bearer ${ localStorage.getItem( "user-token" ) }`,
        UserRole: "admin",
      },
    } ).then( ( res: any ) => {
    } )
  },

  async unloadStudents( { commit }, studentArr: IStudent[] ) {

      await axios.post( "http://vm546666.eurodir.ru/api/student/getExcel", studentArr, { responseType: 'arraybuffer' } )
          .then( ( res: any ) => {
              const buffer = res.data;
              const file = new Blob([buffer], { type: 'application/octet-stream' });
              const url = window.URL.createObjectURL( file );
              const a = document.createElement( 'a' );
              a.href = url;
              a.download = 'example.xlsx';
              a.click();
              window.URL.revokeObjectURL( url );
          } );
  },
};
