import axios from "axios";
// import { moc } from "./moc";

export default axios.create({
  baseURL: "http://localhost:4000",
});

// async function mocData(arr) {
//   const ax = axios.create({
//     baseURL: "http://localhost:4000",
//   });

//   for (let index = 0; index < arr.length; index++) {
//     try {
//       await ax.post("/blocks", {
//         name: arr[index].name,
//         description: arr[index].description,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// mocData(moc);
