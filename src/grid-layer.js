import "./license-loader";

import { LonLatPointFormat } from "@luciad/ria/shape/format/LonLatPointFormat";
import { LonLatGrid } from "@luciad/ria/view/grid/LonLatGrid";
import { GridLayer } from "@luciad/ria/view/grid/GridLayer";
 

 
function createGridLayer() {
  //Define scale ranges and create a grid
  const settings = [{
    scale: 40000.0E-9,
    deltaLon: 1 / 60,
    deltaLat: 1 / 60
  },  {
    scale: 5000.0E-9,
    deltaLon: 1 / 2,
    deltaLat: 1 / 2
  }, {
    scale: 1000.0E-9,
    deltaLon: 1,
    deltaLat: 1
  },   {
    scale: 20.0E-9,
    deltaLon: 10,
    deltaLat: 10
  }, {
    scale: 9.0E-9,
    deltaLon: 20,
    deltaLat: 20
  }, {
    scale: 5.0E-9,
    deltaLon: 30,
    deltaLat: 30
  }, {
    scale: 0,
    deltaLon: 45,
    deltaLat: 45
  }];
  const grid = new LonLatGrid(settings);
 
  //Set the default styling for grid lines and labels
  grid.fallbackStyle = {
    labelFormat: new LonLatPointFormat({
      pattern: "lat(+DM),lon(+DM)"
    }),
    originLabelFormat: new LonLatPointFormat({
      pattern: "lat(+D),lon(+D)"
    }),
    originLineStyle: {
      color: "rgba(230, 20, 20, 0.6)",
      width: 2
    },
    lineStyle: {
      color: "rgba(210,210,210,0.6)",
      width: 1
    },
    originLabelStyle: {
      fill: "rgba(210,210,210,0.8)",
      halo: "rgba(230, 20, 20, 0.8)",
      haloWidth: 3,
      font: "12px sans-serif"
    },
    labelStyle: {
      fill: "rgb(220,220,220)",
      halo: "rgb(102,102,102)",
      haloWidth: 3,
      font: "12px sans-serif"
    }
  };
 
  //Use simplified labels when zoomed out a lot.
  const degreesOnlyFormat = new LonLatPointFormat({
    pattern: "lat(+D),lon(+D)"
  });

  grid.setStyle(grid.scales.indexOf(0), {
    labelFormat: degreesOnlyFormat
  });
  grid.setStyle(grid.scales.indexOf(5.0E-9), {
    labelFormat: degreesOnlyFormat
  });
  grid.setStyle(grid.scales.indexOf(9.0E-9), {
    labelFormat: degreesOnlyFormat
  });
  grid.setStyle(grid.scales.indexOf(20.0E-9), {
    labelFormat: degreesOnlyFormat
  });
  grid.setStyle(grid.scales.indexOf(1000.0E-9), {
    labelFormat: degreesOnlyFormat
  });
  grid.setStyle(grid.scales.indexOf(5000.0E-9), {
    labelFormat: degreesOnlyFormat
  });
  grid.setStyle(grid.scales.indexOf(40000.0E-9), {
    labelFormat: degreesOnlyFormat
  });
  return new GridLayer(grid, {
    label: "Grid"
  });
}

export {createGridLayer as createGridLayer}