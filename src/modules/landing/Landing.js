import { useState } from "react";
import { Link } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import { searchMovie } from "../../lib";

import { Typography, Grid, IconButton,  TextField, CircularProgress, Alert, AlertTitle, Card, CardActionArea, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";

export const Landing = () => {
     const [ searchString, setSearchString ] = useState("");
     const [ executeSearch, { loading, error, data = {} } ] = useLazyQuery(searchMovie);

     const onTextChange = (e) => setSearchString(e.target.value);
     const onHandleSubmit = () => { if (searchString === "") return; executeSearch({ variables: { query: searchString }}); }

     return (
          <Grid>
               <Grid container spacing = {0} direction = "column" alignItems = "center" justifyContent = "center">
                    <Grid>
                         <TextField 
                              onChange = { onTextChange } 
                              value = { searchString } 
                              label = "Search for a Movie..." 
                              size = "small"
                         />

                         <IconButton onClick = { onHandleSubmit }>
                              <SearchIcon />
                         </IconButton>
                    </Grid>
               </Grid>

               { loading ? (
                    <Grid container spacing = {0} direction = "column" alignItems = "center" justifyContent = "center" sx = {{ mt: 12 }}>
                         <CircularProgress />
                    </Grid>
               ) : error ? (
                    <Alert severity = "error">
                         <AlertTitle>Error</AlertTitle>

                         An error showed up, please report it.
                         Error: <strong>{ error }</strong>
                    </Alert>
               ) : (
                    <Grid container spacing = {2}>
                         <Grid container justifyContent = "center" item xs = {12} sx = {{ display: "flex" }}>
                              {data.searchMovies?.map((e, i) => (
                                   <Card key = {i} sx = {{ boxShadow: 12, maxWidth: 345, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', m: 2, p: 3 }} variant = "outlined">
                                        <CardActionArea>
                                             <Typography gutterBottom variant = "h6" fontWeight = "bold" component = "div">
                                                  <Link to = {`/r/${e.id}/${e.name}`} style = {{ color: "#000" }}>
                                                       {e.name}
                                                  </Link>
                                              </Typography>

                                             <Typography variant = "body2" color = "text.secondary">
                                                  {e.overview}
                                             </Typography>
                                        </CardActionArea>
                                   </Card>
                              ))}
                         </Grid>
                    </Grid>
               )}
          </Grid>
     );
};