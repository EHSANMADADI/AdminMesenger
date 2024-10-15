import axios from "axios";
const HeadersItem = {
    'XAPIKEY': '5Uzi4RvtTwlEXp5Uzi4RvtTwlEXp5Uzi4RvtTwlEXp5Uzi4RvtTwlEXp5Uzi4RvtTwlEXp5Uzi4RvtTwlEXphgfvj%%hnHmUU89k',
    
  }
const api = axios.create({
  baseURL: "https://195.191.45.56:5155",
  headers: HeadersItem,
});
export default api;