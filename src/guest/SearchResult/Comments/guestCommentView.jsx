import React, { useState } from 'react'
const maxTextLength = 100;
function GuestCommentView(props) {
    const { comment } = props;
    const [allBodyIsVisible, setAllBodyIsVisible] = useState(false);
    const toggleBodyVisibility = () => { 
        const newVal = !allBodyIsVisible;
        setAllBodyIsVisible(newVal)
    }
    return (
        <React.Fragment>
            <div className="card mb-2">
                <div className="row no-gutters">

                    <div className="col">
                        <div className="card-block px-2 pt-2 pb-0">
                            <h5 className="card-title" style={{textAlign:"end"}}>{ comment.title}</h5>
                            <p className="card-text" style={{textAlign:"end"}}>{allBodyIsVisible ? comment.body : truncateString(comment.body)}
                            {comment.body.length>maxTextLength&&<button className="btn btn-link" onClick={toggleBodyVisibility}>{allBodyIsVisible ? "see less" : "see more"}</button>}                            </p>
                        </div>
                    </div>
                    <div className="col-auto p-2">
                    {comment.image?(                        <img
                            className="img-fluid img-thumbnail rounded-circle"
                            width="50px"
                            src={comment.image}
                            alt="Profile image"
                        />):(                        <img
                            className="img-fluid img-thumbnail rounded-circle"
                            width="50px"
                            src={require("../../../img/no_profile_img.png")}
                            alt="Profile image"
                        />)}
                    </div>
                </div>
                <div className="card-footer w-100 text-muted p-1" >
                  <small>  By a {comment.sender}, at {formattedDate(comment.createdAt)}</small>
                </div>
            </div>
        </React.Fragment>
    )
}

const formattedDate = (elms) => {
    let date =new Date(elms[0]+"-"+elms[1]+"-"+elms[2]+" "+elms[3]+":"+elms[4]+":"+elms[5]).toLocaleString().toString();
    //console.log("Date: ", date);
    return date;
};
  
const truncateString = (string)=>{ 
    return string.length > maxTextLength ? string.substring(0, maxTextLength - 3) + "..." :  string;
  }
  
export default GuestCommentView;
