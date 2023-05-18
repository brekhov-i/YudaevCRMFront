import { ActionTree } from "vuex";
import { IStore } from "@/types/store";
import { IStoreStudent } from "@/types/store";
import { IStudent } from "@/types/student";
import axios from "axios";
import * as ExcelJS from 'exceljs';
import { Buffer } from 'buffer';

export const actions: ActionTree<IStoreStudent, IStore> = {
  async getStudents({ commit, dispatch }, user) {
    console.log(user)
    let uri = `http://localhost:3000/api/student/chat/${user.chat}`;
    if(user.role.name === "admin") {
      await axios
          .get( "http://localhost:3000/api/student", {
            headers: {
              Authorization: `Bearer ${ localStorage.getItem( "user-token" ) }`,
            },
          } )
          .then( ( res: any ) => {
            commit( "setStudents", res.data );
          } );

      await axios.get( "http://localhost:3000/api/student/getChats", {
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
    await axios.post( "http://localhost:3000/api/student/upload", formData, {
      headers: {
        "Content-Type": 'multipart/form-data',
        Authorization: `Bearer ${ localStorage.getItem( "user-token" ) }`,
        UserRole: "admin",
      },
    } ).then( ( res: any ) => {
    } )
  },

  async unloadStudents( { commit }, studentArr: IStudent[] ) {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet( 'Чат 1' );

    worksheet.getCell( `A1` ).value = "Имя";
    worksheet.getCell( `B1` ).value = "Email";
    worksheet.getCell( `C1` ).value = "Telegram";
    worksheet.getCell( `D1` ).value = "Телефон";
    worksheet.getCell( `E1` ).value = "Последний пройденный урок";

    worksheet.getRow( 1 ).font = { bold: true };

    studentArr.forEach( ( student, index ) => {
      worksheet.getCell( `A${ index + 2 }` ).value = student.name;
      worksheet.getCell( `B${ index + 2 }` ).value = student.email;
      worksheet.getCell( `C${ index + 2 }` ).value = student.telegram;
      worksheet.getCell( `D${ index + 2 }` ).value = student.phone;
      worksheet.getCell( `E${ index + 2 }` ).value = student.lessons ? student.lessons[student.lessons?.length - 1] : "";
    } )

    await workbook.xlsx.writeBuffer().then((buffer: Buffer ) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'example.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });

  },
};
