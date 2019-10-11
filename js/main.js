require([
  "Canvas-Flowmap-Layer/CanvasFlowmapLayer",
  "esri/Graphic",
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!"
], function(
  CanvasFlowmapLayer,
  Graphic,
  Map,
  MapView,
  Home
) {

  //Create the map
  var map = new Map({
    basemap: "dark-gray-vector"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-95.381214, 29.742862 ],
    zoom: 8,
    ui: {
      components: ["zoom", "attribution"]
    }
  });

  view.when(function(){
    Papa.parse("data/Workplace_data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: handleCsvParsingComplete
    });
  });

  function handleCsvParsingComplete(results){
    var graphicsFromCsvRows = results.data.map(function(datum){
      return new Graphic({
        geometry: {
          type: "point",
          longitude: datum.h_lon,
          latitude: datum.h_lat
        },
        attributes: datum
      });
    });

    var canvasFlowmapLayer = new CanvasFlowmapLayer({
      graphics: graphicsFromCsvRows,

      //information about the unique origin-destination fields and geometries
      originAndDestinationFieldIds: {
        originUniqueIdField: "h_id",
        originGeometry: {
          x: "h_lon",
          y: "h_lat",
          spatialReference: {
            wkid: 4326
          }
        },
        destinationUniqueIdField: "e_id",
        destinationGeometry: {
          x: "e_lon",
          y: "e_lat",
          spatialReference: {
            wkid: 4326
          }
        }
      },
      pathProperties: {
        type: "classBreaks",
        field: "h_Workers",
        defaultSymbol: {
            strokeStyle: "rgba(237, 248, 177, 1)",
            lineWidth: 0.5,
            lineCap: "round"
        },
        classBreakInfos: [{
            classMinValue: 0,
            classMaxValue: 500,
            symbol: {
                strokeStyle: "rgba(255, 0, 0, 1)",
                lineWidth: 2,
                lineCap: "round"
            }
        },{
            classMinValue: 501,
            classMaxValue: 1000,
            symbol: {
                strokeStyle: "rgba(255, 0, 0, 1)",
                lineWidth: 4,
                lineCap: "round"
            }
        },{
            classMinValue: 1001,
            classMaxValue: 2500,
            symbol: {
                strokeStyle: "rgba(255,0,0,1)",
                lineWidth: 6,
                lineCap: "round"
            }
        },{
            classMinValue: 2501,
            classMaxValue: 100000,
            symbol: {
                strokeStyle: "rgba(255,0,0,1)",
                lineWidth: 8,
                lineCap: "round"
            }
        }]
      }
    });

    view.map.layers.add(canvasFlowmapLayer);

    view.whenLayerView(canvasFlowmapLayer).then(function(canvasFlowmapLayerView){
      //Set a couple of origin location on at launch
      canvasFlowmapLayerView.selectGraphicsForPathDisplayById("h_id", 1, true, "SELECTION_NEW");

      view.on("pointer-move", function(event){
        var screenPoint = {
          x: event.x,
          y: event.y
        };
        view.hitTest(screenPoint).then(function(response){
          if (!response.results.length){
            return;
          }

          response.results.forEach(function(result){
            if (result.graphic.layer === canvasFlowmapLayer){
              if (result.graphic.isOrigin){
                canvasFlowmapLayerView.selectGraphicsForPathDisplayById(
                  "h_id",
                  result.graphic.attributes.h_id,
                  result.graphic.attributes.isOrigin,
                  "SELECTION_NEW"
                );
              } else {
                canvasFlowmapLayerView.selectGraphicsForPathDisplayById(
                  "e_id",
                  result.graphic.attributes.e_id,
                  result.graphic.attributes.isOrigin,
                  "SELECTION_NEW"
                );
              }
            }
          });
        });
      });
    });
  }

  
});
