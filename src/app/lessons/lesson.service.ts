import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Lesson } from './lesson'
 
@Injectable()
export class LessonService {
 
    private url = "http://localhost:5093/api/Lessons";
 
    constructor(private http: HttpClient) {
    }
 
    getLessons() {
        return this.http.get(this.url + "/GetList");
    }
     
    getLesson(id: number) {
        return this.http.get(this.url + '/Get/' + id);
    }
     
    createLesson(lesson: Lesson) {
        return this.http.post<any>(this.url + "/Create", lesson);
    }
    updateLesson(lesson: Lesson) {
  
        return this.http.put<any>(this.url+"/Update", lesson);
    }
    deleteLesson(id: number) {
        return this.http.delete(this.url + '/Delete/' + id);
    }
}