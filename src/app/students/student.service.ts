import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Student } from './student';
 
@Injectable()
export class StudentService {
 
    private url = "http://localhost:5093/api/Students";
 
    constructor(private http: HttpClient) {
    }
 
    getStudents() {
        return this.http.get(this.url + "/GetList");
    }
     
    getStudent(id: number) {
        return this.http.get(this.url + '/Get/' + id);
    }
     
    createStudent(student: Student) {
        return this.http.post<any>(this.url + "/Create", student);
    }
    updateStudent(student: Student) {
  
        return this.http.put<any>(this.url+"/Update", student);
    }
    deleteStudent(id: number) {
        return this.http.delete(this.url + '/Delete/' + id);
    }
}