import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapLibreGlDirections, { LoadingIndicatorControl } from "@maplibre/maplibre-gl-directions";

export default function Map() {
  const mapContainer = useRef(null);
  const [API_KEY] = useState('Sp6mEGZu4bHeE76iXnQU');
  
  const map = new maplibregl.Map({
      container: 'map', // container id
      style: 'https://api.maptiler.com/maps/streets/style.json?key=Sp6mEGZu4bHeE76iXnQU', // style URL
      center: [73.778496, 18.650890], // starting position [lng, lat]
      zoom: 15 // starting zoom
  });

  // Make sure to create a MapLibreGlDirections instance only after the map is loaded
map.on("load", () => {
  // Create an instance of the default class
  const directions = new MapLibreGlDirections(map);

  // Enable interactivity (if needed)
  directions.interactive = true;

  // Optionally add the standard loading-indicator control
  map.addControl(new LoadingIndicatorControl(directions));

  // Set the waypoints programmatically
  directions.setWaypoints([
    [-73.8271025, 40.8032906],
    [-73.8671258, 40.82234996],
  ]);

  console.log(directions)

  // Remove waypoints
  directions.removeWaypoint(0);

  // Remove everything plugin-related from the map
  directions.clear();
});

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
