import { Circle, LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './Map.css';

interface Props {
    viewCoords: LatLngExpression,
    viewZoom: number,
    circles: Circle[]
}

function Map({ viewCoords, viewZoom, circles }: Props ) {

    let map : any = null;

    useEffect(() => {
        if (map !== null) {
            map.remove();
        }

        map = L.map("map").setView(viewCoords, viewZoom);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiYmFydGJhcmVuZHMiLCJhIjoiY2t4NXF4anptMjhuYjJycHpucno0OGcxdiJ9.Ny_5hUJJRxJkbJDpFEY47A'
        }).addTo(map);
        circles.forEach(x => x.addTo(map));
    }, [])

    return <div id="map"></div>
}

export default Map;