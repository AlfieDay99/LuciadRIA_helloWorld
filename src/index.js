import "./license-loader";
import { WebGLMap } from "@luciad/ria/view/WebGLMap.js";
import { getReference } from "@luciad/ria/reference/ReferenceProvider";
import {createBounds} from '@luciad/ria/shape/ShapeFactory';

import { createOpenStreetMapLayer } from "./osm-layer"
import { createGridLayer } from "./grid-layer"
import { createLuciadOfficeModel } from "./feature-point"

//Create a new 2D map instance, and display it in the div with the "map" id
const webMercatorReference = getReference("EPSG:3857");
const map = new WebGLMap("map", {
  reference: webMercatorReference,
});

// Add OpenStreetMap background layer.
const backgroundLayer = createOpenStreetMapLayer();
map.layerTree.addChild(backgroundLayer, "bottom");

const gridLayer = createGridLayer();
map.layerTree.addChild(gridLayer, "top");

// Setup the placemark with automatic map fitting
createLuciadOfficeModel(map);

map.mapNavigator.defaults.snapToScaleLevels = true;
 
// Fit on an area around the Luciad office and the city of Leuven.
map.mapNavigator.fit({
  bounds: createBounds(getReference("CRS:84"), [4.5446, 0.23, 50.8386, 0.05]),
  animate: true,
});