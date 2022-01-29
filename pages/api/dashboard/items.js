import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/restaurantItems`
    );
    const response1 = await axios.get(
      `${process.env.BACKEND_URL}/api/restaurantCategories`
    );

    const returnObject = {
      items: response.data,
      categories: response1.data,
    };

    res.status(200).json(returnObject);
  }
  if (req.method === "POST") {
    const object = req.body;

    const response = await axios.put(
      `${process.env.BACKEND_URL}/api/updateItem/` + object[0].idItem,
      object
    );

    if (response.status === 200) res.status(200).json("success");
  }
}
