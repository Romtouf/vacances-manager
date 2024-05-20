import React, { useState, useContext } from "react";
import {
  LoadScript,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { DateContext } from "../context/DateContext";

const Itineraire = () => {
  const { setTripCosts } = useContext(DateContext);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const calculateRoute = async () => {
    const result = await new Promise((resolve, reject) => {
      const directionsService = new DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: "DRIVING",
          provideRouteAlternatives: false,
          drivingOptions: {
            departureTime: new Date(date), // for the desired time
            trafficModel: "bestguess",
          },
          region: "fr",
        },
        (result, status) => {
          if (status === "OK") {
            resolve(result);
          } else {
            reject(result);
          }
        }
      );
    });

    setDirectionsResponse(result);
    const distance = result.routes[0].legs[0].distance.value / 1000;
    const duration = result.routes[0].legs[0].duration.value / 60;

    // Estimations de carburant et de coût
    const fuelConsumption = 7; // litres/100km, par exemple
    const fuelPrice = 1.5; // prix par litre, par exemple
    const fuelCost = (distance / 100) * fuelConsumption * fuelPrice;

    // Estimation des péages (par exemple, 10 € pour 100 km)
    const tollCost = (distance / 100) * 10;

    // Enregistrer les coûts du trajet
    setTripCosts({ toll: tollCost, fuel: fuelCost });

    setResponse({
      distance,
      duration,
      fuelCost,
      tollCost,
    });
  };

  return (
    <div>
      <h1>Planifier votre itinéraire</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateRoute();
        }}
      >
        <label>
          Point de départ:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </label>
        <label>
          Date de départ:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Calculer l'itinéraire</button>
      </form>

      {response && (
        <div>
          <h2>Résultats de l'itinéraire</h2>
          <p>Distance: {response.distance} km</p>
          <p>
            Durée: {Math.round(response.duration / 60)} heures{" "}
            {Math.round(response.duration % 60)} minutes
          </p>
          <p>Coût estimé du carburant: {response.fuelCost.toFixed(2)} €</p>
          <p>Coût estimé des péages: {response.tollCost.toFixed(2)} €</p>
        </div>
      )}

      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          id="map"
          mapContainerStyle={{ height: "400px", width: "800px" }}
          zoom={8}
          center={{ lat: 48.8566, lng: 2.3522 }}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Itineraire;
