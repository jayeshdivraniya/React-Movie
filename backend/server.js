const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Movie Backend is running"
    });
});

// Popular movies
app.get("/api/movies/popular", async (req, res) => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`
        );

        if (!response.ok) {
            throw new Error("TMDB request failed");
        }

        const data = await response.json();

        res.json(data.results);
    }  catch (error) {
    console.error("TMDB ERROR:", error);

    res.status(500).json({
        error: error.message
    });
}
});

// Search movies
app.get("/api/movies/search", async (req, res) => {
    try {
        const query = req.query.query;

        if (!query) {
            return res.status(400).json({
                error: "Search query is required"
            });
        }

        const response = await fetch(
            `${TMDB_BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("TMDB request failed");
        }

        const data = await response.json();

        res.json(data.results);
   } catch (error) {
    console.error("TMDB ERROR:", error);

    res.status(500).json({
        error: error.message
    });
}
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on port ${PORT}`);
});