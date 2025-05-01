import "./license-loader";
import { getReference } from "@luciad/ria/reference/ReferenceProvider";

import { UrlTileSetModel } from "@luciad/ria/model/tileset/UrlTileSetModel";
import { RasterTileSetLayer } from "@luciad/ria/view/tileset/RasterTileSetLayer";
import { LayerType } from "@luciad/ria/view/LayerType";
import { createBounds } from "@luciad/ria/shape/ShapeFactory";

function createOpenStreetMapLayer() {
  // Create a model that applies the OpenStreetMap raster tiles' settings, including:
  // - the URL pattern consisting of baseUrl/{tileLevel}/{tileColumn}/{inverse tileRow}.png
  // - a Web Mercator projection
  // - a single top-level tile
  const webMercatorReference = getReference("EPSG:3857");
  const model = new UrlTileSetModel({
    baseURL: "https://a.tile.openstreetmap.org/{z}/{x}/{-y}.png",
    bounds: createBounds(webMercatorReference, [
      -20037508.3427892,
      2 * 20037508.3427892,
      -20037508.3427892,
      2 * 20037508.3427892,
    ]),
    level0Columns: 1,
    level0Rows: 1,
    reference: webMercatorReference,
  });
  // Create a layer for the model.
  return new RasterTileSetLayer(model, {
    layerType: LayerType.BASE,
    label: "OpenStreetMap",
  });
}


export {createOpenStreetMapLayer}