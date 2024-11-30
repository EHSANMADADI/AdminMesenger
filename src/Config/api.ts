import axios from "axios";
const HeadersItem = {
    'XAPIKEY': '5Uzi4RvtTwlEXp5Uzi4RvtTwlEXp5Uzi4RvtTwlEXp5Uzi4RvtTwlEXp5Uzi4RvtTwlEXp5Uzi4RvtTwlEXphgfvj%%hnHmUU89k',
    
  }
// const api = axios.create({
//   baseURL: "https://195.191.45.56:5155",
//   headers: HeadersItem,
// });

const api = axios.create({
  baseURL: "https://192.168.4.133:5155",
  headers: HeadersItem,
});

export default api;