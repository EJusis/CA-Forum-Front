import React, {useContext, useEffect, useRef, useState} from 'react';
import OwnerPostComp from "./OwnerPostComp";
import { Button, Modal, Textarea, InputWrapper, Input } from '@mantine/core';
import MainContext from "../context/MainContext";
import CommentComp from "./CommentComp";

const TopicInnerComp = (id) => {
    const [singleTopic, setSingleTopic] = useState()
    const [opened, setOpened] = useState(false);
    const {user, updateProductTrigger, setUpdateProductTrigger} = useContext(MainContext)
    const commentRef = useRef()
    const mediaRef = useRef()
    const [error, setError] = useState()

    useEffect(() => {
            fetch(`http://localhost:4000/getSingleTopic/`+id.id)
                .then(res => res.json())
                .then(data => {
                    setSingleTopic(data)
                })
        },
        [])

    function addComment() {
        if (commentRef.current.value.length < 9) return setError('Comment is too short!')
        const newObj = {
            id: singleTopic._id,
            author: {
                email: user.email,
                avatar: user.avatar

            },
            comment: commentRef.current.value,
            media: mediaRef.current.value,
            date: new Date().getTime()
        }
        setOpened(false)
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newObj)
        }
        fetch('http://localhost:4000/addComment', options)
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('reason')){
                    console.log(data.reason)
                }  else {
                    setOpened(false)
                    setError(undefined)
                    setSingleTopic(data)
                    setUpdateProductTrigger(!updateProductTrigger)
                }
            })

    }

    return (
        <div className='TopicInner-container'>
            <OwnerPostComp singleTopic={singleTopic} setOpened={setOpened}/>
            {singleTopic?.posts.map((x, i) =>
                <CommentComp key={i} comment={x} />
            )}

        {/*  Comment modal  */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Share your thoughts!"
            >
                <Textarea
                    placeholder="Your comment goes here"
                    description="At least 10 characters long"
                    label="Your comment"
                    size="md"
                    required
                    style={{margin: '10px 0'}}
                    ref={commentRef}
                />
                <InputWrapper
                    id="input-demo"
                    label="Media"
                    description="Insert valid Youtube/IMG link"
                    size="md"
                >
                    <Input id="input-demo" placeholder="Link goes here" size="md" ref={mediaRef}/>
                </InputWrapper>
                <Button
                    onClick={addComment}
                    variant="light" size="md" uppercase style={{backgroundColor: '#2E375D', color: '#FFF'}}>
                    Submit comment!
                </Button><br/>
                {!error ? null : <p style={{color: 'red', fontSize: '16px'}}>{error}</p>}
            </Modal>
        </div>

    );
};

export default TopicInnerComp;