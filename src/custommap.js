import MapLibreGlDirections from "@maplibre/maplibre-gl-directions";
import { MapLibreGlDirectionsWaypointEvent } from "@maplibre/maplibre-gl-directions";

export default class CustomMapLibreGlDirections extends MapLibreGlDirections {
  constructor(map, configuration) {
    super(map, configuration);
  }

  // augmented public interface

  get waypointsFeatures() {
    return this._waypoints;
  }

  setWaypointsFeatures(waypointsFeatures) {
    this._waypoints = waypointsFeatures;

    this.assignWaypointsCategories();

    const waypointEvent = new MapLibreGlDirectionsWaypointEvent("setwaypoints", undefined);
    this.fire(waypointEvent);

    this.draw();
  }

  get snappointsFeatures() {
    return this.snappoints;
  }

  setSnappointsFeatures(snappointsFeatures) {
    this.snappoints = snappointsFeatures;
    this.draw();
  }

  get routelinesFeatures() {
    return this.routelines;
  }

  setRoutelinesFeatures(routelinesFeatures) {
    this.routelines = routelinesFeatures;
    this.draw();
  }
}
