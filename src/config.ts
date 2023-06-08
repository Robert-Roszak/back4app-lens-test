export const API_URL = (process.env.NODEENV === 'production') ? '/api' : 'http://localhost:8000/api';
export const IMAGES_URL = (process.env.NODEENV === 'production') ? '/photos' : 'http://localhost:8000/photos';
