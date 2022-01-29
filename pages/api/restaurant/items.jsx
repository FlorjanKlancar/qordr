import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/showRestaurantSideMenu`
    );
    const response1 = await axios.get(
      `${process.env.BACKEND_URL}/api/favouriteItemsCard`
    );

    const returnObject = {
      showRestaurantSideMenu: response.data,
      favouriteItemsCard: response1.data,
    };

    res.status(200).json(returnObject);
  }
}
