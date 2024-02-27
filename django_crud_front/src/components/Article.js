import React from 'react';
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Article({props, article}) {
    let navigate = useNavigate()
    const addArticle = () => {
        let path = `/update`
        // navigate(path, { state: { article: article } })
        navigate(`/single/article/${article.id}`)
    }
    return (
        <Box sx={{ minWidth: 275, maxWidth: 380}}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        { article.datetime_posted }
                    </Typography>
                    <Typography variant="h5" component="div">
                        { article.topic }
                    </Typography>
                    <Typography variant="body2">
                        { article.body }
                    </Typography>
                    <Typography variant="h5" component="div" sx={{fontWeight: "bold"}}>
                        { article.author }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={addArticle}>Regarder l'article</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default Article;