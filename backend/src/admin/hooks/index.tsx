import { useState, useEffect } from "react";
import { DeliveryDTO, DriverDTO } from "../../modules/delivery/types/common";
import { RestaurantDTO } from "../../modules/restaurant/types/common";

export const useDrivers = (
  query?: Record<string, any>
): {
  data: { drivers: DriverDTO[] } | null;
  loading: boolean;
} => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const filterQuery = new URLSearchParams(query).toString();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          "/admin/drivers" + (query ? `?${filterQuery}` : "")
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return { data, loading };
};

export const useDeliveries = (
  query?: Record<string, any>
): {
  data: { deliveries: DeliveryDTO[] } | null;
  loading: boolean;
} => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const filterQuery = new URLSearchParams(query).toString();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch(
          "/admin/deliveries" + (query ? `?${filterQuery}` : "")
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  return { data, loading };
};

export const useRestaurants = (
  query?: Record<string, any>
): {
  data: { restaurants: RestaurantDTO[] } | null;
  loading: boolean;
} => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const filterQuery = new URLSearchParams(query).toString();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "/admin/restaurants" + (query ? `?${filterQuery}` : "")
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { data, loading };
};
