import { Helmet } from "react-helmet";

export const HeaderController = props => {
     return (
          <Helmet>
               { props.title ? <title>{props.title} - movielab</title> : <title>movielab</title> }
               <meta name = "description" content = {props.description} />
               { props.owner ? <meta name = "author" content = {props.owner} /> : <meta name = "author" content = "movielab" /> }
               <meta name = 'keywords' content = {`movielab, MovieLab, movieLAB, MOVIElab, ${props.additionalKeywords?.map((k) => `, ${k}`)}`} />
               { props.embed ? (
                    <>
                         <meta name = 'og:title' content = {props.title || 'movielab'} />
                         <meta name = 'og:description' content = {props.description} />
                         <meta name = 'og:site_name' content = 'movielab' />
                    </>
               ) : (
                    ''
               )};
          </Helmet>
     );
};