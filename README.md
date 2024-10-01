# Spotify Stats Dashboard

## Context data/global state

* Spotify API Context Provider
    * async reducer
        * end points for the data we want handled in the switch statement
        * save endpoint responses to state

* CSS Theme context provider
    * dark/light/auto
    * no reducer, just simple context state stuff

## Routes

* `localhost:3000/`
    * home page
    * Tiles for different stats:
        * top 5 songs
        * top 5 albums
        * top 5 artists
        * currently listening
        * most listened to genre (from top 5 songs)
        * larger list of followed artists
        * user's saved or top audiobooks
        * recommended content
* `localhost:3000/search/{userID}`
    * search page to get stats of other users
    * "nice to have" not a main thing to focus on or build first

## App Features

* User profile data
    * Different API endpoints for self/current user and for user by id/username 
* User's top items
* User's currently playing
* Form to check if user follows an artist
* Animation
* Cool styling
* Good documentation and code comments
* App theme

## FrontEnd UI Frameworks

* Chakra UI
* Material UI
* [UI ShadCN](https://ui.shadcn.com/)

## Deployment & Security

* Netlify env variables: (https://docs.netlify.com/environment-variables/overview/)