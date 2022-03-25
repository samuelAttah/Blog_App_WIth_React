import axios from "axios";

const API_URL = "http://localhost:5000";

export default axios.create({ baseURL: API_URL });

// export const fetchPosts = async () => {
//   try {
//     const response = await axios.get(`${API_URL}`, {
//       headers: { Accept: "application/json" },
//     });
//     return response;
//   } catch (err) {
//     throw new Error("something went wrong " + err);
//   }
// };
