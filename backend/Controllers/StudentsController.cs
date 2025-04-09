using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models; // ✅ Import the Student model

[Route("api/students")]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly string filePath = "students.json";

    // Load students from JSON file
    private async Task<List<Student>> ReadStudentsAsync()
    {
        if (!System.IO.File.Exists(filePath))
        {
            return new List<Student>(); // Return empty list if file doesn't exist
        }

        var json = await System.IO.File.ReadAllTextAsync(filePath);
        return JsonSerializer.Deserialize<List<Student>>(json) ?? new List<Student>();
    }

    // Save students to JSON file
    private async Task WriteStudentsAsync(List<Student> students)
    {
        var json = JsonSerializer.Serialize(students, new JsonSerializerOptions { WriteIndented = true });
        await System.IO.File.WriteAllTextAsync(filePath, json);
    }

    // Get All Students
    [HttpGet]
    public async Task<ActionResult<List<Student>>> GetStudents()
    {
        return await ReadStudentsAsync();
    }

    // Add a New Student
    /*[HttpPost]
    public async Task<ActionResult<List<Student>>> AddStudent([FromBody] Student student)
    {
        var students = await ReadStudentsAsync();
        student.Id = students.Count > 0 ? students.Max(s => s.Id) + 1 : 1; // Auto-generate ID
        students.Add(student);
        await WriteStudentsAsync(students);
        return students;
    }*/

    [HttpPost]
public async Task<ActionResult<List<Student>>> AddStudent([FromBody] Student student)
{
    Console.WriteLine(JsonSerializer.Serialize(student)); // ✅ log the received object

    if (student == null)
        return BadRequest("Student is null");

    var students = await ReadStudentsAsync();
    student.Id = students.Count > 0 ? students.Max(s => s.Id) + 1 : 1;
    students.Add(student);
    await WriteStudentsAsync(students);
    return students;
}


    // Update a Student
    [HttpPut("{id}")]
    public async Task<ActionResult<List<Student>>> UpdateStudent(int id, [FromBody] Student updatedStudent)
    {
        var students = await ReadStudentsAsync();
        var student = students.FirstOrDefault(s => s.Id == id);
        if (student == null) return NotFound();

        student.Name = updatedStudent.Name;
        student.Age = updatedStudent.Age;
        student.Department = updatedStudent.Department;
        student.Email = updatedStudent.Email;
        student.Phone = updatedStudent.Phone;   
        await WriteStudentsAsync(students);
        return students;
    }

    // Delete a Student
    [HttpDelete("{id}")]
    public async Task<ActionResult<List<Student>>> DeleteStudent(int id)
    {
        var students = await ReadStudentsAsync();
        students = students.Where(s => s.Id != id).ToList();
        await WriteStudentsAsync(students);
        return students;
    }
}
