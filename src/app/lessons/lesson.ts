import { Teacher } from "../teachers/teacher";

export class Lesson {
    constructor(
        public id?: number,
        public name?: string,
        public tacherID?: number,
        public teacher?: Teacher) { }
}