const Message = ( { songDetails, songURL }) => {

    return ( 
            <div className="card">
                { !songDetails && !songURL && (
                <div className="message">
                    Click on whatever <span style={{color:'red'}}>emoji</span> that best represents your <span style={{color: 'purple'}}>mood</span> for some fitting <span style={{color: 'green'}}>music.</span>
                </div>
                )}
                { songDetails && songURL && (
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                src={`https://www.youtube.com/embed/${songURL}?autoplay=1&modestbranding=1`}
                frameborder="0"></iframe>
                )}
            </div>
     );
}
 
export default Message;