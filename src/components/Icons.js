import Message from "./Message";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";

const Icons = ({ setMood, token }) => {
    const[songDetails, setSongDetails] = useState(null);
    const[songLink, setSongLink] = useState(null);
    const[trackCount, setTrackCount] = useState(0);

    const isInitialMount = useRef(true)

    const YT_API = process.env.REACT_APP_YT_API;

    function handleClick(e, key=token){

        setMood(e.target.title);
        let genre = e.target.id;
        let limit = 50;
        console.log(key)
        axios(`https://api.spotify.com/v1/playlists/${genre}/tracks?fields=items(track(album(artists(name)),name,popularity))&limit=${limit}`, {
            headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${token}`
            },
            data: 'grant_type=client_credentials',
            method: 'GET'
          })
          .then(res => {
            let songs = res.data.items;
            songs = songs.sort((a,b)=> b.track?.popularity - a.track?.popularity).slice(0,10)
            extractInfo(songs)
          })
    }

    function extractInfo(songs){
        let details = [];
        for(let i = 0; i < songs.length; i++){
            let artists = []
            //copy all artists
            for(let j = 0; j < songs[i].track.album.artists.length; j++){
                artists.push(songs[i].track.album.artists[j].name)
            }
            let track = {
                "artists" : artists,
                "name" : songs[i].track.name,
            }
            details.push(track);
        }
        console.log(details);
        setSongDetails(details);
/*         if(songDetails){
            getYoutube();
        } */
        //set songs state here
    }

    useEffect(()=>{
        //prevent callback from running on first render
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            console.log("Im running")
            getYoutube();
        }
    }, [songDetails])

    function getYoutube(){
        if(songDetails !== null){
            let resultLimit = 1;
            console.log("i ran")
            //grab track artist
            let artistName = songDetails[trackCount].artists[0]
            let song = songDetails[trackCount].name;
            let songQuery = `${song}%20by%20${artistName}`
            songQuery = songQuery.replaceAll(' ', '%20')
            console.log(songQuery);
            
            axios(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&q=${songQuery}&key=${YT_API}`, {
                headers: {
                'Content-Type' : 'application/json',
                },
                method: 'GET'
            })
            .then(link => {
                console.log(link.data.items[0].id.videoId)
                let ytUrlId = link.data.items[0].id.videoId;
                console.log(ytUrlId)
                setSongLink(ytUrlId)
            }) 
        }
    }

    return (
        <div className="main-container">
            <div className="emojis">
                <ul className="emojis">
                    <li 
                        onClick={ handleClick } 
                        title="Rage Music"
                        id="37i9dQZF1DWY4xHQp97fN6" 
                        className="emoji">
                            😤
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Sad Music" 
                        id="37i9dQZF1DWXxauMBOQPxX" 
                        className="emoji">
                            😭
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Happy Music"
                        id="37i9dQZF1DXdPec7aLTmlC" 
                        className="emoji">
                            😀
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Romantic Music"
                        id="37i9dQZF1DX6mvEU1S6INL" 
                        className="emoji">
                            😍
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Relaxing Music"
                        id="0vvXsWCC9xrXsKd4FyS8kM" 
                        className="emoji">
                            😴
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Classical Music"
                        id="37i9dQZF1DX3TPMgP3ojGS" 
                        className="emoji">
                            🧐
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Electronic Music"
                        id="37i9dQZF1DX1kCIzMYtzum"
                        className="emoji">
                            🤖
                    </li>
                </ul>
            </div>
            <Message songDetails={songDetails} songURL={songLink} trackCount={trackCount} setTrackCount = {setTrackCount}/>
        </div>
     );
}
 
export default Icons;