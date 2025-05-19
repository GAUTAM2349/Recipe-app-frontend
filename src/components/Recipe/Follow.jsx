import { useContext } from "react";
import { AuthContext } from "../../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";
import { FollowingContext } from '../../../utils/FollowingProvider';


const Follow = ({id}) => {

    const {user} = useContext(AuthContext);
    const { following } = useContext(FollowingContext);
    console.log("\n\nfollow.js following list : ", following)
    const navigate = useNavigate();

    const followUser =  async () => {

        if(!user) return navigate('/login');

        try{
            const response = await api.post(`/follow/${id}`);
        }catch(error){
            console.log(error);
        }
        
    }
    

    return (
        <>
            <div className="w-1/2 px-2">
                <button onClick={()=> followUser()} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Follow 
                </button>
              </div>
        </>
    )
    
}

export default Follow;