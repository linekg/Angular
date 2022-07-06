import { Lesson } from "../lessons/lesson";
import { Student } from "../students/student";

export class Grade {
    constructor(
        public id?: number,
        public value?: number,
        public comment?: string,

        public lessonID?: number,
        public lesson?: Lesson,
        
        public studentID?: number,
        public student?: Student) { }
}