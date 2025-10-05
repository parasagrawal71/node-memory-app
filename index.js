const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage: user -> input
const userInputs = {};

// Healthcheck API
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

// POST API - Save input for a user
app.post("/api/save", (req, res) => {
    const { user, input } = req.body;

    if (!user || !input) {
        return res
            .status(400)
            .json({ message: 'Both "user" and "input" are required' });
    }

    userInputs[user] = input;
    res.json({
        message: `Input saved for user "${user}"`,
        data: { user, input },
    });
});

// GET API - Retrieve input for a user
app.get("/api/get/:user", (req, res) => {
    const { user } = req.params;

    if (!userInputs[user]) {
        return res
            .status(404)
            .json({ message: `No input found for user "${user}"` });
    }

    res.json({ user, data: userInputs[user] });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
