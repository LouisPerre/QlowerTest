import React, {useEffect, useState} from 'react';
import axios from "../api/axios";
import Article from "../components/Article";
import {IconButton, Skeleton, Stack} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import { v4 as uuid } from 'uuid'

const AllArticles = (props) => {
    const [articles, setArticles] = useState(null)
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getArticles = async () => {
            try {
                const response = await axios.get('/api/articles', {
                    signal: controller.signal
                })
                isMounted && setArticles(response.data['articles'])
                setLoading(false)
            } catch (err) {
                console.error(err)
            }
        }
        getArticles()

        return () => {
            isMounted = false
            controller.abort()
        }

    }, [navigate, location]);


    const addArticle = () => {
        let path = `/new`
        navigate(path)
    }

    return (
        <div className="tasksDiv">
            {
                loading
                    ? (
                        <Stack spacing={1}>
                            <Skeleton variant="text" sx={{fontSize: '1rem'}} />
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="rectangular" width={210} height={60} />
                            <Skeleton variant="rounded" width={210} height={60} />
                        </Stack>
                    )
                    : articles.length
                        ? articles.map((article, i) => (
                            <Article key={article.id} article={article} />
                        ))
                        : navigate('/new')

            }
            <IconButton aria-label="add" color="primary" className="addArticle" size="large" onClick={addArticle}>
                <Add fontSize="large" />
            </IconButton>
        </div>
    );
};

export default AllArticles;