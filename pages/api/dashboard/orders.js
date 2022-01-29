import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/showItemsOnOrder`
    );

    const returnObject = {
      orders: response.data,
    };

    res.status(200).json(returnObject);
  }
  if (req.method === "PUT") {
    const {id} = req.body;

    const response = await axios.put(
      `${process.env.BACKEND_URL}/api/completeOrder/` + id
    );

    if (response.status === 200) res.status(200).json("success");
  }
}
