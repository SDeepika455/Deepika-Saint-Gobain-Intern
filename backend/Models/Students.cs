namespace backend.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Department { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; }
    }
}
