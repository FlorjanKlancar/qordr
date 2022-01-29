import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/overViewPageOrders`
    );

    const response1 = await axios.get(
      `${process.env.BACKEND_URL}/api/overViewPageTables`
    );

    const response2 = await axios.get(
      `${process.env.BACKEND_URL}/api/overViewPageItems`
    );

    const returnObject = {
      orders: response.data,
      tables: response1.data,
      items: response2.data,
    };

    res.status(200).json(returnObject);
  }
}
