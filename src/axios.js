import axios from 'axios';

// axios.interceptors.request.use(request =>{
//   console.log(request);
//   return request;
// })

axios.interceptors.response.use(response => {
  if(response.status === 200) {
    return response.data;
  }

  return response;
})

export default axios;