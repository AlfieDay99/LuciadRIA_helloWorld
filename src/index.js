import "./license-loader";
import { WebGLMap } from "@luciad/ria/view/WebGLMap.js";
import { getReference } from "@luciad/ria/reference/ReferenceProvider";
 
//Create a new 2D map instance, and display it in the div with the "map" id
const webMercatorReference = getReference("EPSG:3857");
const map = new WebGLMap("map", {
  reference: webMercatorReference,
});