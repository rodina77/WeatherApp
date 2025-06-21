"use client";

import { useEffect, useState } from "react";
import { Coordinates } from "../interfaces";

export const UseGeoLocation = () => {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [error, setError] = useState<string | null>('');

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        },
            (err) => {
                setError("Failed to retrieve location.");
                console.error(err);
            }
        );
    }, [])
  return { coordinates, error };

}