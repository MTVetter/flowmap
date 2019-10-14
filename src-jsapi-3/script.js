require([
    "Canvas-Flowmap-Layer/CanvasFlowmapLayer",
    "esri/graphic",
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/renderers/SimpleRenderer",
    "esri/InfoTemplate",
    "esri/dijit/HomeButton",
    "dojo/on",
    "dojo/domReady!"
], function(
    CanvasFlowmapLayer,
    Graphic,
    Map,
    FeatureLayer,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Color,
    SimpleRenderer,
    InfoTemplate,
    HomeButton,
    on
){
    document.addEventListener("click", function(){
        document.getElementById("welcomePanel").style.display = "none";
    });

    //Reference the buttons
    var austinLayerButton = document.getElementById("austinLayerButton");
    var brazoriaLayerButton = document.getElementById("brazoriaLayerButton");
    var chambersLayerButton = document.getElementById("chambersLayerButton");
    var coloradoLayerButton = document.getElementById("coloradoLayerButton");
    var fortBendLayerButton = document.getElementById("fortBendLayerButton");
    var galvestonLayerButton = document.getElementById("galvestonLayerButton");
    var harrisLayerButton = document.getElementById("harrisLayerButton");
    var libertyLayerButton = document.getElementById("libertyLayerButton");
    var matagordaLayerButton = document.getElementById("matagordaLayerButton");
    var montgomeryLayerButton = document.getElementById("montgomeryLayerButton");
    var walkerLayerButton = document.getElementById("walkerLayerButton");
    var wallerLayerButton = document.getElementById("wallerLayerButton");
    var whartonLayerButton = document.getElementById("whartonLayerButton");

    //Create the map
    var map = new Map("map",{
        basemap: "dark-gray-vector",
        center: [-95.381214, 29.742862],
        zoom: 8
    });

    //Create a home button to return the user to the default map zoom
    var home = new HomeButton({
        map: map
    }, "HomeButton");
    home.startup();

    //Add the county boundaries
    //Create a renderer for the counties so that you can see the flow map lines
    var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
        new Color([255,255,255]), 2),new Color([255,255,255,0])
      );
    var renderer = new SimpleRenderer(sfs);
    var counties = new FeatureLayer("https://gis.h-gac.com/arcgis/rest/services/Census_ACS/Census_ACS_5Yr_Counties/MapServer/0",{
        opacity: 0.2,
        outFields: ["*"]
    });
    counties.setRenderer(renderer);

    map.addLayer(counties);

    map.on("load", function(){
        var austin = new CanvasFlowmapLayer({
            id: "austinLayer",
            visible: true,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        var brazoria = new CanvasFlowmapLayer({
            id: "brazoriaLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        var chambers = new CanvasFlowmapLayer({
            id: "chambersLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        var colorado = new CanvasFlowmapLayer({
            id: "coloradoLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        var fortbend = new CanvasFlowmapLayer({
            id: "fortBendLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
                    classMaxValue: 10000000,
                    symbol: {
                        strokeStyle: "rgba(255,0,0,1)",
                        lineWidth: 8,
                        lineCap: "round"
                    }
                }]
            },
            wrapAroundCanvas: true
        });

        var galveston = new CanvasFlowmapLayer({
            id: "galvestonLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        var harris = new CanvasFlowmapLayer({
            id: "harrisLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
                    classMaxValue: 10000000,
                    symbol: {
                        strokeStyle: "rgba(255,0,0,1)",
                        lineWidth: 8,
                        lineCap: "round"
                    }
                }]
            },
            wrapAroundCanvas: true
        });

        var liberty = new CanvasFlowmapLayer({
            id: "libertyLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        var matagorda = new CanvasFlowmapLayer({
            id: "matagordaLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        var montgomery = new CanvasFlowmapLayer({
            id: "montgomeryLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
                    classMaxValue: 10000000,
                    symbol: {
                        strokeStyle: "rgba(255,0,0,1)",
                        lineWidth: 8,
                        lineCap: "round"
                    }
                }]
            },
            wrapAroundCanvas: true
        });

        var walker = new CanvasFlowmapLayer({
            id: "walkerLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        var waller = new CanvasFlowmapLayer({
            id: "wallerLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        var wharton = new CanvasFlowmapLayer({
            id: "whartonLayer",
            visible: false,
            originAndDestinationFieldIds: {
                originUniqueIdField: "h_id",
                originGeometry: {
                    x: "h_lon",
                    y: "h_lat",
                    spatialReference: {
                        wkid: 4326
                    }
                },
                destinationUniqueIdField: "d_id",
                destinationGeometry: {
                    x: "d_lon",
                    y: "d_lat",
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
            },
            wrapAroundCanvas: true
        });

        map.addLayers([austin, brazoria, chambers, colorado, fortbend, galveston, harris, liberty, matagorda, montgomery, walker, waller, wharton]);

        //Call function to populate the layers with graphics
        createGraphicsFromCsv("data/austin_home.csv", austin);
        createGraphicsFromCsv("data/brazoria_home.csv", brazoria);
        createGraphicsFromCsv("data/chambers_home.csv", chambers);
        createGraphicsFromCsv("data/colorado_home.csv", colorado);
        createGraphicsFromCsv("data/fortbend_home.csv", fortbend);
        createGraphicsFromCsv("data/galveston_home.csv", galveston);
        createGraphicsFromCsv("data/harris_home.csv", harris);
        createGraphicsFromCsv("data/liberty_home.csv", liberty);
        createGraphicsFromCsv("data/matagorda_home.csv", matagorda);
        createGraphicsFromCsv("data/montgomery_home.csv", montgomery);
        createGraphicsFromCsv("data/walker_home.csv", walker);
        createGraphicsFromCsv("data/waller_home.csv", waller);
        createGraphicsFromCsv("data/wharton_home.csv", wharton);

        //Use Papa Parse to load and read the CSV data
        function createGraphicsFromCsv(csvFilePath, canvasLayer){
            var infoTemplate = new InfoTemplate();
            infoTemplate.setTitle("Working in <b>${d_county} County</b>")
            infoTemplate.setContent("<b>${h_Workers} workers</b> living in <b>${h_county} County</b> travel to <b>${d_county} County</b> for work.");

            Papa.parse(csvFilePath,{
                download: true,
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function(results){
                    var csvGraphics = results.data.map(function(datum){
                        return new Graphic({
                            geometry: {
                                x: datum.h_lon,
                                y: datum.h_lat,
                                spatialReference: {
                                    wkid: 4326
                                }
                            },
                            attributes: datum,
                            infoTemplate: infoTemplate
                        });
                    });
    
                    //Add all graphics to the canvas flowmap layer
                    canvasLayer.addGraphics(csvGraphics);
                }
            });
        }

        //Add a listener to handle when a user mouses over a point
        var clickListners = [];
        clickListners.push(on.pausable(austin, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(brazoria, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(chambers, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(colorado, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(fortbend, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(galveston, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(harris, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(liberty, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(matagorda, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(montgomery, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(walker, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(waller, "mouse-over", handleLayerInteraction));
        clickListners.push(on.pausable(wharton, "mouse-over", handleLayerInteraction));

        //Interaction function that creates a new selection of the data
        function handleLayerInteraction(evt){
            var canvasLayer = evt.graphic.getLayer();
            if (evt.isOriginGraphic){
                canvasLayer.selectGraphicsForPathDisplay(evt.sharedOriginGraphics, "SELECTION_NEW");
            } else {
                canvasLayer.selectGraphicsForPathDisplay(evt.sharedDestinationGraphics, "SELECTION_NEW");
            }
        }

        //actions for the buttons
        austinLayerButton.addEventListener('click', toggleActiveLayer);
        brazoriaLayerButton.addEventListener('click', toggleActiveLayer);
        chambersLayerButton.addEventListener('click', toggleActiveLayer);
        coloradoLayerButton.addEventListener('click', toggleActiveLayer);
        fortBendLayerButton.addEventListener('click', toggleActiveLayer);
        galvestonLayerButton.addEventListener('click', toggleActiveLayer);
        harrisLayerButton.addEventListener('click', toggleActiveLayer);
        libertyLayerButton.addEventListener('click', toggleActiveLayer);
        matagordaLayerButton.addEventListener('click', toggleActiveLayer);
        montgomeryLayerButton.addEventListener('click', toggleActiveLayer);
        walkerLayerButton.addEventListener('click', toggleActiveLayer);
        wallerLayerButton.addEventListener('click', toggleActiveLayer);
        whartonLayerButton.addEventListener('click', toggleActiveLayer);

        //Create function for when the user clicks a button
        function toggleActiveLayer(evt){
            austinLayerButton.classList.add("btn-clear");
            brazoriaLayerButton.classList.add("btn-clear");
            chambersLayerButton.classList.add("btn-clear");
            coloradoLayerButton.classList.add("btn-clear");
            fortBendLayerButton.classList.add("btn-clear");
            galvestonLayerButton.classList.add("btn-clear");
            harrisLayerButton.classList.add("btn-clear");
            libertyLayerButton.classList.add("btn-clear");
            matagordaLayerButton.classList.add("btn-clear");
            montgomeryLayerButton.classList.add("btn-clear");
            walkerLayerButton.classList.add("btn-clear");
            wallerLayerButton.classList.add("btn-clear");
            whartonLayerButton.classList.add("btn-clear");

            austin.hide();
            brazoria.hide();
            chambers.hide();
            colorado.hide();
            fortbend.hide();
            galveston.hide();
            harris.hide();
            liberty.hide();
            matagorda.hide();
            montgomery.hide();
            walker.hide();
            waller.hide();
            wharton.hide();

            map.getLayer(evt.target.id.split("Button")[0]).show();
            evt.target.classList.remove("btn-clear");
        }

    });
});