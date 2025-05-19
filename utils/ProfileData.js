import { FavoriteProvider } from "./FavoriteProvider"
import { FollowersProvider } from "./FollowersProvider"
import { FollowingProvider } from "./FollowingProvider"



export  const ProfileData = ({children}) => {

    return (

        <>
            <FollowersProvider>
                <FollowingProvider>
                    <FavoriteProvider>
                    {children}
                    </FavoriteProvider>
                </FollowingProvider>
            </FollowersProvider>
        </>
        
    )

}