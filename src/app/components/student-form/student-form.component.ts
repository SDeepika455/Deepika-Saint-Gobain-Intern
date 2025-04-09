import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number | null = null; // Store student ID for editing

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      name: ['',[Validators.required]],
      age: ['',[Validators.required]],
      department: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    // ✅ Get the student ID from the URL
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.studentId = +params['id']; // Convert string to number
        this.loadStudent(this.studentId);
      }
    });
  }

  // ✅ Fetch student data and fill the form
  loadStudent(id: number): void {
    this.studentService.getStudentById(id).subscribe(student => {
      if (student) {
        this.studentForm.patchValue(student);
      }
    });
  }

  // ✅ Save the student (add or update)
  saveStudent(): void {
    const studentData: Student = {
      id: this.studentId || 0, // Use ID if editing, else 0 for new
      name: this.studentForm.value.name,
      age: this.studentForm.value.age,
      department: this.studentForm.value.department,
      email: this.studentForm.value.email,
      phone: this.studentForm.value.phone,

    };
    console.log('Submitting student data:', studentData);

    if (this.studentId) {
      // ✅ Update student
      this.studentService.updateStudent(studentData).subscribe(() => {
        this.router.navigate(['/student-data']); // Navigate back to student list
      });
    } else {
      // ✅ Add new student
      this.studentService.addStudent(studentData).subscribe(() => {
        this.router.navigate(['/student-data']); // Navigate back
      });
    }
  }
}
