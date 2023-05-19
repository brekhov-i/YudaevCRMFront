import { MutationTree } from "vuex";
import { IStoreStudent } from "@/types/store";
import { IStudent } from "@/types/student";

export const mutations: MutationTree<IStoreStudent> = {
  setLessons(state, lessons) {
    state.lessons = lessons
  },

  setChats(state, chats) {
    state.chats = chats;
  },

  setStudents(state, students) {
    console.log(state.lessons)
    students.map((student: IStudent) => {
      state.students.push({
        _id: student._id,
        gkId: student.gkId,
        name: student.name,
        phone: student.phone,
        email: student.email,
        telegram: student?.telegram,
        chat: student.chat,
        lastLesson: student.lessons ? state.lessons[student.lessons?.length - 1]?.title : "",
      });
    });
  },


};
