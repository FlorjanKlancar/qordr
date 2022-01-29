import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/dashboardCardInfo`
    );
    const response1 = await axios.get(
      `${process.env.BACKEND_URL}/api/showItemsOnOrder`
    );
    const response2 = await axios.get(
      `${process.env.BACKEND_URL}/api/dashboardGraph`
    );

    const returnObject = {
      cardInfo: response.data,
      itemsOrder: response1.data,
      graph: response2.data,
    };

    res.status(200).json(returnObject);
  }
}
