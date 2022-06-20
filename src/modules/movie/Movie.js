import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { Grid, Box, Typography, CircularProgress, Alert, AlertTitle, Button } from "@mui/material";
import { HeaderController } from "../../components/controllers/header/HeaderController";

export const Movie = () => {
     let params = useParams();
     
     const [ contents, setContents ] = useState([]);
     const [ loading, setLoading ] = useState(false);
     const [ error, setError ] = useState();

     const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${params.slug}`;
     const extractAPIContents = json => {
          const { pages } = json.query;
          return Object.keys(pages).map(id => pages[id].extract);
     };

     const getContents = async () => {
          let contents = [];
          let resp;
          
          setLoading(true);

          try {
               resp = await fetch(url);
               
               const json = await resp.json();
               contents = extractAPIContents(json);
          } catch (err) {
               setError(err);
          } finally {
               setLoading(false);
          };

          setContents(contents);
     };

     useEffect(() => {
          getContents();
     }, []);

     return (
          <Box>
               <HeaderController title = {params.slug} />

               { loading ? (
                    <Grid container spacing = {0} direction = "column" alignItems = "center" justifyContent = "center">
                         <CircularProgress />
                    </Grid>
               ) : error ? (
                    <Alert severity = "error">
                         <AlertTitle>Error</AlertTitle>

                         An error showed up, please report it.
                         Error: <strong>{ error }</strong>
                    </Alert>
               ) : (
                    <Grid container spacing = {0} direction = "column" alignItems = "center" justifyContent = "center">
                         {contents.map(content => (
                              <Grid>
                                   <Typography variant = "h3" fontWeight = "bold">
                                        { params.slug }
                                   </Typography>

                                   <Typography dangerouslySetInnerHTML = {{ __html: content }} />
                                   
                                   <Button variant = "contained">
                                        <a href = {`https://en.wikipedia.org/wiki/${params.slug}`} style = {{ color: "#fff" }}>
                                             Wikipedia
                                        </a>
                                   </Button>
                              </Grid>
                         ))}
                    </Grid>
               )}
          </Box>
     );
};