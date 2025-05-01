import { createPoint } from "@luciad/ria/shape/ShapeFactory";
import { MemoryStore } from "@luciad/ria/model/store/MemoryStore";
import { Feature } from "@luciad/ria/model/feature/Feature";
import { FeatureModel } from "@luciad/ria/model/feature/FeatureModel";
import { FeatureLayer } from "@luciad/ria/view/feature/FeatureLayer";
import { FeaturePainter } from "@luciad/ria/view/feature/FeaturePainter";

export function createPlacemark(map, reference) {
  // Create a point for the location
  const luciadLocation = createPoint(reference, [4.66935, 50.8648]);
  
  // Create a feature containing the location and some properties
  const luciadFeature = new Feature(
    luciadLocation,
    {
      name: "Luciad office",
      company: "Hexagon",
    },
    "id1"
  );

  // Add the feature to a data store and model
  const store = new MemoryStore({
    data: [luciadFeature],
  });
  
  const model = new FeatureModel(store, {
    reference: reference,
  });

  // Add the model to a layer
  const layer = new FeatureLayer(model, {
    label: "Luciad office",
    painter: createLocationPainter(),
    selectable: true,
  });

  // Fit the map to the area around the feature
  map.mapNavigator.defaults.snapToScaleLevels = true;
  map.mapNavigator.fit({
    bounds: createBounds(reference, [4.5446, 0.23, 50.8386, 0.05]),
    animate: true,
  });

  // Add the layer to the map
  map.layerTree.addChild(layer, "top");
}

function createLocationPainter() {
  const featurePainter = new FeaturePainter();
  
  featurePainter.paintBody = function (
    geoCanvas,
    feature,
    shape,
    layer,
    map,
    paintState
  ) {
    let destinationStyle = {
      url: "images/location.svg",
      width: paintState.selected ? "110%" : "100%",
      height: paintState.selected ? "110%" : "100%",
    };
    geoCanvas.drawIcon(shape, destinationStyle);
  };

  return featurePainter;
}

function createBounds(reference, [x, width, y, height]) {
  return {
    reference: reference,
    x: x,
    y: y,
    width: width,
    height: height
  };
} 