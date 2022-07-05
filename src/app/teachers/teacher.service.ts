import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Teacher } from './teacher';
 
@Injectable()
export class TeacherService {
 
    private url = "http://localhost:5093/api/Teachers";
 
    constructor(private http: HttpClient) {
    }
 
    getTeachers() {
        return this.http.get(this.url + "/GetList");
    }
     
    getTeacher(id: number) {
        return this.http.get(this.url + '/Get/' + id);
    }
     
    createTeacher(teacher: Teacher) {
        return this.http.post<any>(this.url + "/Create", teacher);
    }
    updateTeacher(teacher: Teacher) {
  
        return this.http.put<any>(this.url+"/Update", teacher);
    }
    deleteTeacher(id: number) {
        return this.http.delete(this.url + '/Delete/' + id);
    }
}