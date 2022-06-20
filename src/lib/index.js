import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
     uri: "https://tmdb.sandbox.zoosh.ie/dev/graphql",
     cache: new InMemoryCache(),
});

/* Currently in use */

export const searchMovie = gql`
     query SearchMovies ($query: String!) {
          searchMovies (query: $query) {
               id
               name 
               overview
               releaseDate
               cast {
                    id
                    person {
                         name
                    }

                    role {
                         ... on Cast {
                              character
                         }
                    }
               }
          }
     }
`;

/* Other queries */

export const fetchPopularMovies = gql`
     query fetchPopular {
          movies: popularMovies {
               id
               name
               overview
               releaseDate
               
               img: poster {
                    url: custom(size: "w185_and_h278_bestv2")
               }

               reviews {
                    id 
                    author
                    content
                    language {
                         code
                         name
                    }
               }
          }
     }
`;

export const discoverTelevision = gql`
     query DiscoverTV {
          discoverTV (filter: { firstAiredYear: 2020 }) {
               id
               name
               overview
               firstAired
               
               poster {
                    large
               }
          }
     }
`;

export const discoverMovies = gql`
     query DiscoverMovies {
          discoverTV (filter: { year: 1999, withCast: { include: [819] } }) {
               id
               name
               overview
               releaseDate
               
               poster {
                    large
               }
          }
     }
`;

export const fetchMovieDetails = gql`
     query getMovie ($id: ID!) {
          movie (id: $id) {
               id
               name
               overview
               cast (limit: 5) {
                    id
                    person {
                         name
                    }
                    
                    role {
                         ... on Cast {
                              character
                         }
                    }
               }

               crew (limit: 5) {
                    id
                    person {
                         name
                    }

                    role {
                         ... on Crew {
                              job
                              department
                         }
                    }
               }
          }
     }
`;

export const fetchMovieReviews = gql`
     query getReview ($searchString: String) {
          review (searchString: $searchString) {
               id
               author
               content
               language {
                    code
                    name
               }

               media {
                    ... on Movie {
                         id
                         name
                         overview
                    }

                    ... on TV {
                         id
                         name
                         overview
                    }
               }
          }
     }
`;