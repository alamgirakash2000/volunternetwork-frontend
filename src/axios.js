import axios from "axios";

const instance = axios.create({
  baseURL: "http://volunteernetwork-akash.herokuapp.com",
});

export default instance;
