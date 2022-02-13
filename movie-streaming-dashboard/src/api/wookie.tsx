const movieHeaders = new Headers();
movieHeaders.append('Authorization', 'Bearer Wookie2019');

const movieRequest = new Request('https://wookie.codesubmit.io/movies', {
    method: 'GET',
    headers: movieHeaders,
    mode: 'cors',
    cache: 'default',
});


export const fetchMovies = (handler: any): void => {
    fetch(movieRequest)
        .then(response => response.json())
        .then(response => {
            handler(response.movies ?? []);
        });
}