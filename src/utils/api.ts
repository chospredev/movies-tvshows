export const url = 'https://api.themoviedb.org/3';
export const key = '4e655d3961ece923217665e9eb266403';

const movieEndpoint = `movie?api_key=${key}`;
const showsEndpoint = `tv?api_key=${key}`;

export const discoverMoviesEndpoint = `${url}/discover/${movieEndpoint}`;
export const discoverTVShowsEndpoint = `${url}/discover/${showsEndpoint}`;

export const searchMoviesEndpoint = `${url}/search/${movieEndpoint}&query=`;
export const searchShowsEndpoint = `${url}/search/${showsEndpoint}&query=`;
