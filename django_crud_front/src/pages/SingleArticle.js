import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "../api/axios";
import {CircularProgress, IconButton} from "@mui/material";
import {Add, ArrowBack, Edit} from "@mui/icons-material";

const SingleArticle = () => {
    const [article, setArticle] = useState()
    const [loading, setLoading] = useState(true)
    let { id } = useParams()
    let navigate = useNavigate()
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getArticle = async () => {
            try {
                const response = await axios.get('/api/article/detail/' + id, {
                    signal: controller.signal
                })
                isMounted && setArticle(response.data)
                console.log(article)
                setLoading(false)
            } catch (err) {
                console.error(err)
            }
        }
        getArticle()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, []);

    const goBack = () => {
        navigate(-1)
    }

    const editArticle = () => {
        let path = `/update`
        navigate(path, { state: { article: article } })
    }

    return (
        <>
            {
                loading
                    ? <section className="loading"><CircularProgress /></section>
                    :
                    <section className="article">
                        <IconButton aria-label="arrow-back" color="primary" className="goBackArrow" size="large" onClick={goBack}>
                            <ArrowBack fontSize="large" />
                        </IconButton>
                        <div className="header">
                            <h1>{capitalizeFirstLetter(article.topic)}</h1>
                            <span>🧑‍🎨 Par : { capitalizeFirstLetter(article.author) } 🧑‍🎨</span>
                        </div>
                        <div className="body">
                            <p>{ article.body }</p>
                            <span>📆 Mis à jour le : { article.datetime_updated ? article.datetime_updated : article.datetime_posted } 📆</span>
                        </div>
                        <IconButton aria-label="add" color="primary" className="editArticle" size="large" onClick={editArticle}>
                            <Edit fontSize="large" />
                        </IconButton>
                    </section>
            }
        </>
    );
};

export default SingleArticle;