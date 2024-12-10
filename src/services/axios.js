import axios from "axios";

export const axiosApi = axios.create({
baseURL: "https://ss-servicos-868bd9829280.herokuapp.com",
//baseURL: "http://18.208.11.32:8080",
//baseURL: "http://localhost:8080",
  //baseURL: "http://ss-servicos-back.eba-tdaeckka.us-east-1.elasticbeanstalk.com",
});
