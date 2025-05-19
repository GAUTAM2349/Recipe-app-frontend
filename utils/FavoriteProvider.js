import { createContext, useEffect, useState } from "react";
import api from "../config/axiosConfig";
import { Navigate, useNavigate } from "react-router-dom";




export const FavoriteContext = createContext();


export const FavoriteProvider = ({children}) => {

    const [ favorites, setFavorites ] = useState();
    const navigate = useNavigate();

    useEffect( () => {

        const fetchFavorites = async () => {

            try{
            const response = await api.get('/favorite');
            setFavorites(response.data);
            }catch(error){
                console.log(error);
                return navigate('/login');
            }
            
        }
        
        fetchFavorites();
        
    },[] )

    
    

    return (

        <FavoriteContext.Provider value = { { favorites } }>
            {children}
        </FavoriteContext.Provider>
        
    )
    
}