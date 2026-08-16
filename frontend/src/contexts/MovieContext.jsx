import { createContext,useState,useContext,useEffect } from "react";

const MovieContext=createContext()

export const useMovieContext =()=> useContext(MovieContext)

export const MovieProvider=({children})=>{
    const[favorites,setFavotires]=useState([])

    useEffect(()=>{
        const storedFavs=localStorage.getItem("favorites")
        if(storedFavs) setFavotires(JSON.parse(storedFavs))
    },[])

    useEffect(()=>{
        localStorage.setItem('favorites',JSON.stringify(favorites))
    },[favorites])

    const addToFavorites=(movie)=>{
        setFavotires(prev=>[...prev,movie])
    }

    const removeFromFavorites=(movieID)=>{
        setFavotires(prev=>prev.filter(movie=>movie.id !==movieID))
    }

    const isFavorite =(movieID)=>{
        return favorites.some(movie=>movie.id===movieID)
    }
    const value ={
        favorites,addToFavorites,removeFromFavorites,isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
        
    </MovieContext.Provider>
}

//1.23.57