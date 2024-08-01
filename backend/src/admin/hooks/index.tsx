import { useState, useEffect } from "react";
import { DeliveryDTO, DriverDTO } from "../../types/delivery/common";
import { RestaurantDTO } from "../../types/restaurant/common";

const BACKEND_URL = "https://metabolic-boats-grab.medusajs.app";

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
          BACKEND_URL + "/drivers" + (query ? `?${filterQuery}` : "")
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
          BACKEND_URL + "/deliveries" + (query ? `?${filterQuery}` : "")
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
          BACKEND_URL + "/restaurants" + (query ? `?${filterQuery}` : "")
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
