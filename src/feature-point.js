// feature-point.js

import "./license-loader";
import { createPoint } from "@luciad/ria/shape/ShapeFactory";
import { getReference } from "@luciad/ria/reference/ReferenceProvider";
import { MemoryStore } from "@luciad/ria/model/store/MemoryStore";
import { Feature } from "@luciad/ria/model/feature/Feature";
import { FeatureModel } from "@luciad/ria/model/feature/FeatureModel";
import { FeaturePainter } from "@luciad/ria/view/feature/FeaturePainter";
 


function createLuciadOfficeModel () {
    const reference = getReference("CRS:84");
    // Add the location of the Luciad office:
    // Create a point for the location.
    const luciadLocation = createPoint(reference, [4.66935, 50.8648]);
    // Create a feature containing the location and some properties.
    const luciadFeature = new Feature(
    luciadLocation,
    {
        name: "Luciad office",
        company: "Hexagon",
    },
    "id1"
    );
    // Add the feature to a data store and model.
    // The model is used to manage the data.
    // The store is the link between the model and the data provider, which is one hardcoded feature in this example.
    const store = new MemoryStore({data: [luciadFeature]});
    const model = new FeatureModel(store, {reference: reference});

    return model
}

// Add the model to a layer.
// The layer is used to visualize the data.
function createLocationPainter() {
    const featurePainter = new FeaturePainter();
    // Use a paintBody implementation that paints an icon at the feature's location.
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

export { createLuciadOfficeModel, createLocationPainter }