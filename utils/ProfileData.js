import { FavoriteProvider } from "./FavoriteProvider"
import { FollowersProvider } from "./FollowersProvider"
import { FollowingProvider } from "./FollowingProvider"
import { MyRecipesContext, MyRecipesProvider } from "./MyRecipesProvider"



export  const ProfileData = ({children}) => {

    return (

        <>
            <FollowersProvider>
                <FollowingProvider>
                    <FavoriteProvider>
                        <MyRecipesProvider>
                    {children}
                    </MyRecipesProvider>
                    </FavoriteProvider>
                </FollowingProvider>
            </FollowersProvider>
        </>
        
    )

}