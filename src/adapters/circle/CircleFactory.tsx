import { Circle, LatLng } from "leaflet";

const createCircle = (longitude: number, latitude : number, radius : number, color: string) : Circle => {
    return new Circle(new LatLng(latitude, longitude), {
        radius: radius,
        color: color,
        stroke: false,
        fillColor: color,
        fillOpacity: 0.5,
    });
};

export default createCircle;