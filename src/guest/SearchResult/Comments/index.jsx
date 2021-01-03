import React from 'react'
import GuestCommentView from "./guestCommentView";
import OwnerCommentView from "./ownerCommentView";

function Comments({ items }) {
    return (
        <div>
            <h4>Comments</h4>
            {items.map((comment) => {
                if (comment.isOwner) {
                    return <OwnerCommentView key={ comment.id} comment={ comment}/>
                }
                else
                {
                    return <GuestCommentView key={ comment.id} comment={ comment}/>
                }
            })}
        </div>
    )
}

export default Comments
