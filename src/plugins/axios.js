import axios from "axios";
import CONST from "./../consts";
// import auth from "../mixins/auth";

axios.defaults.baseURL = CONST.API;

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
