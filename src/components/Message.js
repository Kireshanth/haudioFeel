import { IoPlaySkipBackCircleOutline, IoPlaySkipForwardCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";


const Message = ({ songDetails, songURL, trackCount, setTrackCount }) => {
    let song_name = '';
    //Ensure songDetails are fetched prior to accessing it
    if(songDetails){
        song_name = songDetails[trackCount-1].name.toUpperCase();
        //Remove "(feat. artist)" from song title
        song_name = song_name.replace(/\([^()]*\)/g, '')
    }

    function changeSong(value){
        if(value === -1){
            if(trackCount + value === 0){
                setTrackCount(10)
            } else {
                setTrackCount(count => count - 1)
            }
        } else {
            if(trackCount + value > 10){
                setTrackCount(1)
            } else {
                setTrackCount(count => count + 1)
            }
        }
    }

    return ( 
            <div className="card">
                { !songDetails && !songURL && (
                <div className="message">
                    Click on whatever <span style={{color:'red'}}>emoji</span> that best represents your <span style={{color: 'purple'}}>mood</span> for some fitting <span style={{color: 'green'}}>music.</span>
                </div>
                )}
                { songDetails && songURL && (
                <IconContext.Provider value={{ size: "3em"}}>
                    <div className="contents">
                        <iframe title="haudioFeel" id="ytplayer" type="text/html" width="500" height="400"
                        src={`https://www.youtube.com/embed/${songURL}?autoplay=1&modestbranding=1`}
                        frameborder="0"></iframe>
                        <div className="song-info">
                            <div id="credits">
                                <p id="credit-text">Built by <a target="_blank" rel="noreferrer" href="https://github.com/Kireshanth/haudioFeel">Kireshanth</a></p>
                                <p id="credit-text">Art by <a target="_blank" rel="noreferrer" href="https://www.instagram.com/lakeebs/">Keebs</a></p>  
                            </div>
                            <div className="test-container">
                                <p className="song-title text-grad">{song_name}</p>
                                <p className="song-artists text-grad">{songDetails[trackCount-1].artists[0].toUpperCase()}</p>
                            </div>
                            <div id="controls">
                                    <div id="change-track">
                                        <IoPlaySkipBackCircleOutline className="button" onClick={()=> changeSong(-1)} />
                                        <IoPlaySkipForwardCircleOutline className="button" onClick={()=> changeSong(1)} />
                                    </div>
                                    <p id="track-number">{`${trackCount}/10`}</p>
                            </div>
                        </div>
                    </div>
                </IconContext.Provider>
                )}
            </div>
     );
}
 
export default Message;