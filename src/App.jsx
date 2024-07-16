import {useEffect, useRef,useState} from "react"
import {useLocation, Link} from "react-router-dom"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import style from "./st.json"
import CustomMapLibreGlDirections from "./custommap"
import {layers} from "./restyle"
import balloonWaypointImgUrl from "./images/balloon-waypoint.png"
import balloonSnappointImgUrl from "./images/balloon-snappoint.png"
import balloonHoverpointImgUrl from "./images/balloon-hoverpoint.png"
import routelineImgUrl from "./images/blue1.png"
//import * as db from "../backend/db/index.js"

const App = () => {
	
	const mapRef = useRef(null)
	const directionsRef = useRef(null)
	const location = useLocation()
	const [direction, setDirections] = useState({});
	let route;
	let data;
	let x= -74.1197632
	let y = 40.6974034;

	const saveRoute = async()=> {

		route = {
		
			waypointsFeatures : JSON.stringify(direction.waypointsFeatures),
			snappointsFeatures : JSON.stringify(direction.snappointsFeatures),
			routelinesFeatures : JSON.stringify(direction.routelinesFeatures),
			
		}	
		console.log(route)


		const res = await fetch("http://localhost:4000/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				route: route,
			}),
		})

		console.log(res)
		
	}

	const loadRoute=async()=> {

		const res = await fetch("http://localhost:4000/load", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		})

		data = await res.json()

		const waypointsFeatures = JSON.parse(data.route.waypointsFeatures);
		const al = waypointsFeatures.length-1;
		
		x = (waypointsFeatures[0].geometry.coordinates[0]+waypointsFeatures[al].geometry.coordinates[0])/2
		y = (waypointsFeatures[0].geometry.coordinates[1]+waypointsFeatures[al].geometry.coordinates[1])/2
		console.log(x,y)
		
		direction.setWaypointsFeatures(JSON.parse(data.route.waypointsFeatures || ''));
		direction.setSnappointsFeatures(JSON.parse(data.route.snappointsFeatures || ''));
		direction.setRoutelinesFeatures(JSON.parse(data.route.routelinesFeatures || ''));
		
	}
	

	useEffect(() => {
		if (mapRef.current) {
			const map = new maplibregl.Map({
				container: mapRef.current,
				style,
				center: [-74.1197632, 40.6974034],
				zoom: 11,
				fadeDuration: 0,
				attributionControl: false,
			})
			

			map.addControl(
				new maplibregl.AttributionControl({
					customAttribution:
						'<a href="http://project-osrm.org/" target="_blank">&copy; OSRM</a> | Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> and by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
				})
			)

			map.on("load", () => {
				// make sure to load and add the images used by the custom directions' styles first:
				// a balloon for thw waypoints,
				map.loadImage(balloonWaypointImgUrl).then((image) => {
					if (image) {
						map.addImage("balloon-waypoint", image.data)
					}
				})

				// a balloon for the snappoints,
				map.loadImage(balloonSnappointImgUrl).then((image) => {
					if (image) {
						map.addImage("balloon-snappoint", image.data)
					}
				})

				// a balloon for the hoverpoints,
				map.loadImage(balloonHoverpointImgUrl).then((image) => {
					if (image) {
						map.addImage("balloon-hoverpoint", image.data)
					}
				})

				// and a pattern-image for the routelines.
				map.loadImage(routelineImgUrl).then((image) => {
					if (image) {
						map.addImage("routeline", image.data)
					}
				})


				const directions = new CustomMapLibreGlDirections(map, {
					requestOptions: {
						alternatives: "true",
					},
					layers,
					sensitiveWaypointLayers: ["maplibre-gl-directions-waypoint"],
					sensitiveSnappointLayers: ["maplibre-gl-directions-snappoint"],
					sensitiveRoutelineLayers: ["maplibre-gl-directions-routeline"],
					sensitiveAltRoutelineLayers: [
						"maplibre-gl-directions-alt-routeline",
					],
				})
				
				setDirections(directions)

				directions.interactive = true
				directionsRef.current = directions

			})
			
			map.flyTo({
				center: [x, y],
				essential: true  // Ensures this action will interrupt other animations
			});
			
			
		}
	}, [location.pathname])

	return (
		<div className="flex">
			<p>
				Its completely up to you how to style the Directions features shown on
				the map. You can either use the default styles provided by the plugin
				(see other examples), easily modify the default features dimensions (see
				the
				<Link to="/examples/touch-friendly-features">
					Touch-Friendly Features example
				</Link>
				) or
				<strong>define your custom features styles from scratch</strong>.
			</p>
			<p>This example demonstrates the last option.</p>

			<div
				ref={mapRef}
				className="basis-full lg:basis-2/3 shadow-xl"
				style={{height: "500px", width: "100%"}}
			/>
			<button onClick={saveRoute}>
        Save the Route
        </button>
		<button onClick={loadRoute}>
          Load the saved Route
        </button>
		</div>
		
	)
}

export default App
