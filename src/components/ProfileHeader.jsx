import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider";
import "../syles/ProfileHeader.css";

export function ProfileHeader() {

    let {profileData} = useSpotifyProfileData();

    if (profileData.userId) {
        return <div id="profileHeader">
            <h1>Spotify Stats for {profileData.display_name}</h1>
            {profileData.images.length > 0 && <img src={profileData.images[0].url} />}

        </div>
    } else {
        return <div id="profileHeader">
            <p>Please sign in to see your profile data.</p>
        </div>
    }
}