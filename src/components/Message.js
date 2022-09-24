const Message = ( { songDetails, songURL, trackCount, setTrack }) => {
    
    let song_name = '';
    if(songDetails){
        song_name = songDetails[trackCount].name.toUpperCase();
        //Remove "(feat. artist)" from song title
        song_name = song_name.replace(/\([^()]*\)/g, '')
        console.log(song_name)
    } 

    return ( 
            <div className="card">
                { !songDetails && !songURL && (
                <div className="message">
                    Click on whatever <span style={{color:'red'}}>emoji</span> that best represents your <span style={{color: 'purple'}}>mood</span> for some fitting <span style={{color: 'green'}}>music.</span>
                </div>
                )}
                { songDetails && songURL && (
                <div className="contents">
                    <iframe id="ytplayer" type="text/html" width="500" height="400"
                    src={`https://www.youtube.com/embed/${songURL}?autoplay=1&modestbranding=1`}
                    frameborder="0"></iframe>
                    <div className="song-info">
                        <div className="test-container">
                            <p id="song-title">{song_name}</p>
                            <p id="song-artists">{songDetails[trackCount].artists[0].toUpperCase()}</p>
                        </div>
                    </div>
                </div>
                )}
            </div>
     );
}
 
export default Message;