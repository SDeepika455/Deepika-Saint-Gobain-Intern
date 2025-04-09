const express = require('express');
const fs = require('fs-extra');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = './students.json';

app.use(cors());
app.use(bodyParser.json());

// Load students from file
app.get('/students', async (req, res) => {
    try {
        const students = await fs.readJson(DATA_FILE).catch(() => []);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load students' });
    }
});

// Save a new student
/*app.post('/students', async (req, res) => {
    try {
        const students = await fs.readJson(DATA_FILE).catch(() => []);
        const newStudent = { id: students.length + 1, ...req.body };
        students.push(newStudent);
        await fs.writeJson(DATA_FILE, students, { spaces: 2 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save student' });
    }
});*/

app.post('/students', async (req, res) => {
    try {
        const students = await fs.readJson(DATA_FILE).catch(() => []);
        const newStudent = { id: Date.now(), ...req.body }; // ✅ Ensure unique ID
        students.push(newStudent);
        await fs.writeJson(DATA_FILE, students, { spaces: 2 }); // ✅ Save to file
        res.json(newStudent); // ✅ Send the newly added student back
    } catch (error) {
        res.status(500).json({ error: 'Failed to save student' });
    }
});


// Update a student
app.put('/students/:id', async (req, res) => {
    try {
        let students = await fs.readJson(DATA_FILE).catch(() => []);
        students = students.map(student =>
            student.id === parseInt(req.params.id) ? { ...student, ...req.body } : student
        );
        await fs.writeJson(DATA_FILE, students, { spaces: 2 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student' });
    }
});

// Delete a student
app.delete('/students/:id', async (req, res) => {
    try {
        let students = await fs.readJson(DATA_FILE).catch(() => []);
        students = students.filter(student => student.id !== parseInt(req.params.id));
        await fs.writeJson(DATA_FILE, students, { spaces: 2 });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
