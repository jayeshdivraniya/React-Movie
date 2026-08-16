// const API_KEY="6b506ad5b742a6fa81f4f1ce3d852962"
// const BASE_URL="https://api.themoviedb.org/3"

// export const getPopularMovies=async()=>{
//     const response =await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
//     const data=await response.json()
//     return data.results
// }


// export const searchMovies=async(query)=>{
//     const response =await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
//     const data=await response.json()
//     return data.results
// }

const BASE_URL = "https://react-movie-h027.onrender.com/api/movies";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/popular`);

    if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
    }

    return await response.json();
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Failed to search movies");
    }

    return await response.json();
};