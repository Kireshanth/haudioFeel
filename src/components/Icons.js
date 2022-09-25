import Message from "./Message";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";

const Icons = ({ setMood, token }) => {
    //state to store song/artist names from spotify
    const[songDetails, setSongDetails] = useState(null);
    //state to store youtube video id of song
    const[songLink, setSongLink] = useState(null);
    //state to store track number from playlist
    const[trackCount, setTrackCount] = useState(1);

    const isInitialMount = useRef(true)

    const YT_API = process.env.REACT_APP_YT_API;

    function handleClick(e, key=token){
        setMood(e.target.title);
        let genre = e.target.id;
        let limit = 50;
        //fetch 50 songs from spotify playlist
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
            //take top 10 songs based on popularity from batch of 50
            songs = songs.sort((a,b)=> b.track?.popularity - a.track?.popularity).slice(0,10)
            extractInfo(songs)
          })
    }

    //extract song titles and artists names from spotify data
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
        setSongDetails(details);
    }

    useEffect(()=>{
        //prevent callback from running on first render
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getYoutube();
        }
    }, [songDetails, trackCount])

    //fetch top youtube video search result based on song query -> "Song Title by Artist Name"
    function getYoutube(){
        if(songDetails !== null){
            let resultLimit = 1;
            //grab track artist
            let artistName = songDetails[trackCount-1].artists[0]
            let song = songDetails[trackCount-1].name;
            let songQuery = `${song}%20by%20${artistName}`
            songQuery = songQuery.replaceAll(' ', '%20')
            
            axios(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${resultLimit}&q=${songQuery}&key=${YT_API}`, {
                headers: {
                'Content-Type' : 'application/json',
                },
                method: 'GET'
            })
            .then(link => {
                let ytUrlId = link.data.items[0].id.videoId;
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
                        title="Get Turnt"
                        id="37i9dQZF1DWY4xHQp97fN6" 
                        className="emoji">
                            😤
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Heartbreaker" 
                        id="37i9dQZF1DWXxauMBOQPxX" 
                        className="emoji">
                            😭
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Happy Hits"
                        id="37i9dQZF1DXdPec7aLTmlC" 
                        className="emoji">
                            😀
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="You & Me"
                        id="37i9dQZF1DX6mvEU1S6INL" 
                        className="emoji">
                            😍
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Power Workout"
                        id="37i9dQZF1DWUVpAXiEPK8P" 
                        className="emoji">
                            💪
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Lofi Beats"
                        id="0vvXsWCC9xrXsKd4FyS8kM" 
                        className="emoji">
                            😴
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Deep Focus"
                        id="37i9dQZF1DX3TPMgP3ojGS" 
                        className="emoji">
                            🧐
                    </li>
                    <li 
                        onClick={ handleClick } 
                        title="Electronic Circus"
                        id="37i9dQZF1DX1kCIzMYtzum"
                        className="emoji">
                            🤖
                    </li>
                </ul>
            </div>
            <Message songDetails={songDetails} songURL={songLink} trackCount={trackCount} setTrackCount={setTrackCount}/>
        </div>
     );
}
 
export default Icons;