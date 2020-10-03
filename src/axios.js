import axios from "axios";

const instance = axios.create({
  baseURL: "https://volunteernetwork-akash.herokuapp.com",
});

export default instance;
