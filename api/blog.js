export const getPosts=(axios)=>{
    return axios.$get('/news/');
}

export const getPost=(axios,id)=>{
    return axios.$get(`/news/${id}`);
}