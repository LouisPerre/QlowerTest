import React, {useRef, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import axios from "../api/axios";
import {useNavigate, useLocation} from "react-router-dom";

const AddArticle = () => {
    const {state} = useLocation()
    const article = state?.article
    const topicRef = useRef()
    const bodyRef = useRef()
    const authorRef = useRef()

    const [topic, setTopic] = useState(article ? article.topic : '')
    const [body, setBody] = useState(article ? article.body : '')
    const [author, setAuthor] = useState(article ? article.author : '')
    const navigate = useNavigate()



    // if (article) {
    //     setTopic(article.topic)
    //     setBody(article.body)
    //     setAuthor(article.author)
    // }

    const handleSubmit = async () => {
        try {
            if (article) {
                const response = await axios.put(
                    '/api/article/update/' + article.id + "/",
                    JSON.stringify({
                        topic: topic,
                        body: body,
                        author: author
                    }),
                    {
                        headers: {'Content-Type': "application/json"}
                    })
            } else {
                const response = await axios.post(
                    '/api/article/create/',
                    JSON.stringify({
                        topic: topic,
                        body: body,
                        author: author
                    }),
                    {
                        headers: {'Content-Type': "application/json"}
                    })
            }

            let path = `/`
            navigate(-1)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section className="addArticlePage">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                    width: "45%"
                }}
                noValidate
                autoComplete="off"
                className="formArticle"
            >
                <TextField
                    required
                    id="outlined-required"
                    label="Topic"
                    ref={topicRef}
                    defaultValue={article ? article.topic : ''}
                    onChange={(e => setTopic(e.target.value))}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Body"
                    multiline
                    rows={4}
                    ref={bodyRef}
                    defaultValue={article ? article.body : ''}
                    onChange={(e => setBody(e.target.value))}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Author"
                    ref={authorRef}
                    defaultValue={article ? article.author : ''}
                    onChange={(e => setAuthor(e.target.value))}
                />
                {
                    article
                    ? <Button variant="contained" sx={{margin: "8px", width: '100%'}} onClick={handleSubmit}>Update article</Button>
                    : <Button variant="contained" sx={{margin: "8px", width: '100%'}} onClick={handleSubmit}>Add new article</Button>
                }
            </Box>
        </section>
    );
};

export default AddArticle;