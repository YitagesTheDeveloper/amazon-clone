
import axios from "axios";

const axiosInstance = axios.create({
    // local instance of firebase functions
    // baseURL: "http://127.0.0.1:5001/clone-7a3ab/us-central1/api"
    
    // deployed version of amzone sever on render.com  
    baseURL:"https://amazon-api-deployment-2dqr.onrender.com/"
})

export {axiosInstance}