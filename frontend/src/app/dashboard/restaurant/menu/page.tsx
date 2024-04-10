import { retrieveRestaurant } from "@frontend/lib/data";

export default async function MenuPage() {
  const restaurantId = "res_01HTPT6ATT6J2CBJ1C3A7D18YJ";
  const restaurant = await retrieveRestaurant(restaurantId);
  const products = 

  return (
    <div>
      <h1>Menu</h1>
    </div>
  );
}
