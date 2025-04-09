import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: number;
  name: string;
  age: number;
  department: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students'; // ✅ Ensure API URL matches .NET backend

  constructor(private http: HttpClient) {}

  // ✅ Fetch all students from API
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  // ✅ Fetch a single student by ID
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  // ✅ Add a new student to API
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // ✅ Update existing student
  updateStudent(student: Student): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${student.id}`, student);
  }

  // ✅ Delete student from API
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
