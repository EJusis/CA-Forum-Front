import React from 'react';
import ReactPlayer from "react-player";

const CommentComp = ({comment}) => {
    return (
        <div className='comment-container'>
            <div className="comment-top">
                <div className="comment-avatar">
                    <img src={comment.author.avatar} alt=""/>
                </div>
                <div className="comment-username">u/{comment.author.email}</div>
            </div>
            <div className="comment-description">
                <p>{comment.comment}</p>
            </div>
            <div>
                {(comment.media.includes('youtube') && comment.media.includes('watch')) &&
                    <ReactPlayer width={550} heigth={300} url={comment.media} />
                }
                {(!(comment.media.includes('youtube') && comment.media.includes('watch')) && comment.media.includes('http')) &&
                <div className="comment-image">
                    <img src={comment.media} alt=""/>
                </div>
                }


            </div>
        </div>
    );
};

export default CommentComp;