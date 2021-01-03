import React from 'react'
import YouTube from 'react-youtube';

function FourthSection() {
    const opts = {
        height:'100%',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
    };
    const _onReady=(event)=> {
        // access to player in all event handlers via event.target
        //event.target.pauseVideo();
        //event.target.
      }
    return (
        <React.Fragment>
            <div className={"component pb-3 bg-light text-dark"} >
                <div className={"container text-center "} >
                    <h2 className="pt-5 text-violet">Demo</h2> 
                    <div className="video-container ">
                    <YouTube videoId="rQZ0dG8RWUQ" opts={opts} onReady={_onReady} />
                    </div>

                </div>  
            </div>
        </React.Fragment>
    )
}


export  {FourthSection }
