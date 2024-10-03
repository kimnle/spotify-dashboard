import { createContext, useContext, useEffect, useState } from "react"

export const spotifyAuthScaffold = {
    access_token: "",
    token_type: "",
    expires_in: "",
    refresh_token: "",
    scope: ""
}

export const SpotifyAuthContext = createContext(spotifyAuthScaffold);

export function useSpotifyAuthContext() {
    return useContext(SpotifyAuthContext);
}

const clientId = "b7e492d2d5ad43929d92e8217929548d";

export function SpotifyAuthProvider({children}) {
    // Code required for Spotify sign-in process, not usable in API requests
    let [userAuthCode, setUserAuthCode] = useState("");
    // User access tokens and refresh tokens - represents the current signed-in user
    let [userAuthData, setUserAuthData] = useState(spotifyAuthScaffold);

    // When the page loads, check if we received a Spotify sign in result
    useEffect(() => {
        // Attempt to find any query params from our current page URL
        const params = new URLSearchParams(window.location.search);
        // Retrieve the auth code from the query params
        const code = params.get("code");

        // localhost:5173/spotifycallback?code=kldjsagladjsglka
        // code = kldjsagladjsglka

        setUserAuthCode(code);

        // Empty dependency array means that this useEffect only runs on page load
        // and never again
    }, []);

    useEffect(() => {
        
        async function getAuthData() {
            const authData = await getAuthToken(clientId, userAuthCode);
            setUserAuthData(authData);
            // This cleans up the URL in the browser tab
            // removing the Spotify auth data so it doesn't impact page load userEffect
            window.history.replace(null, "Spotify Statsboards", "/");
        }
        if (userAuthCode) {
            getAuthData();
        }

        // When userAuthCode changes or initialises, we'll try and run this useEffect
    }, [userAuthCode]);

    async function getAuthTokens(clientId, code) {
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:5173/spotifycallback");
        params.append("code_verifier", verifier);

        // https://api.spotify.com/auth?client_id=kljagklajg&code=

        const result = await fetch("https://accounts.spotify.com/api/token", {
           method: "POST" ,
           headers: {"Content-Type": "application/x-www-form-urlencoded"},
           body: params
        });

        const authTokens = await result.json();
		return authTokens;
    }

    // This one 
    async function redirectToAuthCodeFlow(clientId: string) {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);
    
        localStorage.setItem("verifier", verifier);
    
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "http://localhost:5173/callback");
        params.append("scope", "user-read-private user-read-email");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);
    
        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    return(
        <SpotifyAuthContext.Provider value={{userAuthData}}>
            {children}
        </SpotifyAuthContext.Provider>
    )
}