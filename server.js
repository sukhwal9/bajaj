const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// POST Endpoint
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        
        const highestAlphabet = alphabets.length > 0 
            ? [alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()] 
            : [];

        res.status(200).json({
            is_success: true,
            user_id: "NileshSukhwal",
            email: "22BCS14952@cuchd.in",
            roll_number: "22BCS14952",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// GET Endpoint
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
