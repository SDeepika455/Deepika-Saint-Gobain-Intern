import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-data-page',
  imports: [CommonModule, RouterModule, FormsModule], // ✅ Import FormsModule for ngModel
  templateUrl: './student-data-page.component.html',
  styleUrls: ['./student-data-page.component.css']
})
export class StudentDataPageComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private studentService: StudentService, 
    private router: Router,
    private route: ActivatedRoute
    ) {
      
    }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(
      (data) => {
        this.students = data;
        this.filteredStudents = data; // ✅ Initialize filtered list
      },
      (error) => {
        console.error('Error loading students:', error);
      }
    );
  }

  editStudent(id: number) {
    this.router.navigate(['/studentform'], { queryParams: { id } });
  }

  deleteStudent(id: number) {
    if (confirm("Are you sure you want to delete this student?")) { // ✅ Show confirmation popup
      this.studentService.deleteStudent(id).subscribe(() => {
        this.students = this.students.filter(student => student.id !== id); // ✅ Remove deleted student from list
      });
    }
  }
  

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'students.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Student List', 14, 10);

    autoTable(doc, {
      head: [['ID', 'Name', 'Age', 'Department', 'Email', 'Phone']],
      body: this.filteredStudents.map(student => [student.id, student.name, student.age,student.department,student.email,student.phone]),
    });

    doc.save('students.pdf');
  }

  searchStudents() {
    if (this.searchQuery.trim()) {
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredStudents = [...this.students]; // ✅ Reset to original list if search is empty
    }
    this.sortStudents();
  }
  toggleSort(){
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortStudents();
  }
  sortStudents(){
    this.filteredStudents.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a.name.localeCompare(b.name); // Sort by name (A-Z)
      } else {
        return b.name.localeCompare(a.name); // Sort by name (Z-A)
      }
    });
  }
}
