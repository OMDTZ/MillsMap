
var defaultMaxBounds = L.latLngBounds(
    [-13.33, 27.583], // latmin, longmin
    [0.500, 44.450]  // latmax, longmax
);

const createMap = () => {
    // center of the map
    var center = [-6.23, 34.9];
    // Create the map
    var map = new L.map('mapid', {
        fullscreenControl: true,
        maxBounds: defaultMaxBounds,
        minZoom: 6,
        maxBoundsViscosity: 1.0

    }).setView(center, 7);

    map.scrollWheelZoom.disable();
 
var styleUrl = 'https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

var accessToken = 'pk.eyJ1IjoiYWxpY28xMSIsImEiOiJja2xhazBneTIwNmFrMm9xcnN2YXMxcHY4In0.43WpCsYZZoQlKlKrBcpqBA';
var username = 'alico11';
var styleId = 'ckltbjipi2aeb17t1m9obft0p';

L.tileLayer(styleUrl, {
    username: username,
    style_id: styleId,
    accessToken: accessToken,
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(map); 

    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors' +
            '</a> ',
        tileSize: 256,
    });
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var googleTer = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    var hotLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 20,
    })
    var mqi = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{LOD}/{X}/{Y}.png", {
        subdomains: ['otile1', 'otile2', 'otile3', 'otile4']
    });
    var baseMaps = {
        "OpenStreetMap": osmLayer,
        "HOTOSM": hotLayer
    } //here more layers: https://www.tutorialspoint.com/leafletjs/leafletjs_getting_started.htm

    // osmLayer.addTo(map);
    //L.geoJSON(geojsonFeature).addTo(map);


    // L.control.browserPrint({ position: 'topleft', title: 'Print ...' }).addTo(map);
    // add a scale at at your map.
    L.control.scale().addTo(map);
    return map
}

const createMapIcons = (map) => {
    //Printing
    L.easyPrint({
        title: 'My awesome print button',
        position: 'bottomright',
        sizeModes: ['A4Portrait', 'A4Landscape']
    }).addTo(map);

    // Add Legend
    var legend = L.control({ position: "bottomleft" });
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'legend');
        var legendContent = document.getElementById('legend-content').innerHTML;
        div.innerHTML = legendContent;
        return div;
    };
    legend.addTo(map);

    // Add toggle open/close filters button
    var toggleFiltersButton = L.control({ position: "topright" });
    toggleFiltersButton.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'toggle_filters');
        var button = `
                            <button class="toggle_filters__button">
                                    <svg height="30" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                                    </svg>
                            </button>
                        </div>
        `;
        div.innerHTML = button;
        return div;
    };
    toggleFiltersButton.addTo(map);

    // Add scroll indicator
    var scroll = L.control({ position: "bottomright" });
    scroll.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'scroll_indicator');
        var button = `
        <svg fill="white" height="70" viewBox="0 0 24 24" style="transform: rotate(270deg);">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
      </svg>
        `;
        div.innerHTML = button;
        return div;
    };
    scroll.addTo(map);

    // open/close filters when clicking on the button
    $('.toggle_filters__button').click(function () {
        $('.map_filters').toggleClass('hide');
        // modify the button border and background color when the filters are open
        if ($('.map_filters').hasClass('hide')) {
            $('.toggle_filters__button').css('border-color', '#30619c');
            $('.toggle_filters__button').css('background', '#30619c');
        } else {
            $('.toggle_filters__button').css('border-color', '#ffc107');
            $('.toggle_filters__button').css('background', '#ffc107');
        }
    });
}

function drawMarkers(data) {
    var schoolIcon = L.icon({
        iconUrl: 'static/static_figures/School.svg',
        iconSize: [30, 30], // size of the icon
    });

    // Now the promise chain that uses the mills and machines
    customMarker = L.Marker.extend({
        options: {
            Id: 'Custom data!',
        }
    });
    var cross_data = crossfilter(data);
    var groupname = "marker-select";
    var facilities = cross_data.dimension(function (d) {
        // return d.index; 
        return d.school_details_school_name + '' + d.school_details_Status_school_registration_number;
    });
    var facilitiesGroup = facilities.group().reduce(
        function (p, v) { // add
            p.coordinatesDescription_coodinates_coordinates = v.coordinatesDescription_coodinates_coordinates;
            p.school_details_school_name = v.school_details_school_name;
            p.school_details_Location_addr_region = v.school_details_Location_addr_region;
            p.school_details_Location_addr_district = v.school_details_Location_addr_district;
            p.school_details_Location_addr_ward_shehiya = v.school_details_Location_addr_ward_shehiya;
            p.school_details_school_name = v.school_details_school_name;
            p.geo = v.geo;
            ++p.count;
            return p;
        },
        function (p, v) { //remove
            --p.count;
            return p;
        },
        function () { // init
            return { count: 0 };
        }
    );

    var schoolName = cross_data.dimension(function (d) {
        return d.school_details_school_name + '' + d.school_details_Status_school_registration_number;
    });
    new dc.TextFilterWidget("#search", groupname)
        .dimension(schoolName);

    var mapChart = dc_leaflet.markerChart("#mapid", groupname);
    mapChart
        .dimension(facilities)
        .group(facilitiesGroup)
        .map(map)
        .cluster(true)
        .valueAccessor(function (kv) {
            return kv.value.count;
        })
        .locationAccessor(function (kv) {
            return kv.value.geo;
        })
        .rebuildMarkers(true)
        .popup(function (kv) {
            var tooltip =
                "<dt>School name: " + kv.value.school_details_school_name + "</dt>" +
                "<dt>Region: " + kv.value.school_details_Location_addr_region + "</dt>" +
                "<dt>District: " + kv.value.school_details_Location_addr_district + "</dt>" +
                "<dt>Ward: " + kv.value.school_details_Location_addr_ward_shehiya + "</dt>"
            return tooltip
        })
        .filterByArea(true)
        .marker(function (kv) {
            marker = new customMarker([
                kv.value.coordinatesDescription_coodinates_coordinates[1],
                kv.value.coordinatesDescription_coodinates_coordinates[0]],
                {
                    Id: (kv.key).toString(),
                    icon: schoolIcon,
                });

            marker.on('mouseover', function (ev) {
                ev.target.openPopup();
            });
            return marker;
        });


    //     Select menus

    fetch("static/js/filter_graphic_config.csv")
        .then(res => res.text())
        .then(csv => {
            console.log("jahahahahhaha")
            console.log("csv", csv)
            var lines = csv.split("\n");
            console.log("lines", lines)

            var filters = [];

            // NOTE: If your columns contain commas in their values, you'll need
            // to deal with those before doing the next step 
            // (you might convert them to &&& or something, then covert them back later)
            // jsfiddle showing the issue https://jsfiddle.net/
            var headers = lines[0].split(",");

            for (var i = 1; i < lines.length; i++) {

                var obj = {};
                var currentline = lines[i].split(",");

                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }

                filters.push(obj);

            }
            console.log("filters", filters)


            /*
            
            */
            // var select1 = new dc.SelectMenu('#selectschool_details_Location_addr_subward')
            // var data_dimension = cross_data.dimension(function (d) { return d.school_details_Location_addr_subward; })
            // select1
            //     .dimension(data_dimension)
            //     .group(data_dimension.group())
            //     .controlsUseVisibility(true);

            // let id = '#selectschool_details_Location_addr_subward'
            // var data_dimension = cross_data.dimension(function (d) {
            //     return d['school_details_Location_addr_subward']
            // // });
            // var selectDimension = new dc.SelectMenu(id, groupname);
            // selectDimension
            //     .dimension(data_dimension)
            //     .group(data_dimension.group())
            //     // .multiple(true)
            //     .controlsUseVisibility(true);
            // selectDimension.title(function (subs) {
            //     return subs.key;
            // })

            // Test
            // let supermarketItems = crossfilter([
            //     { name: "banana", category: "fruit", country: "Malta", outOfDateQuantity: 3, quantity: 12 },
            //     { name: "apple", category: "fruit", country: "Greece", outOfDateQuantity: 1, quantity: 9 },
            //     { name: "apple", category: "fruit", country: "Spain", outOfDateQuantity: 1, quantity: 9 },
            //     { name: "tomato", category: "vegetable", country: "Spain", outOfDateQuantity: 2, quantity: 25 }
            // ])
            // console.log(supermarketItems)
            // // console.log(quantityByCategory.all())

            // // let dimensionCountry = supermarketItems.dimension(item => item.country)
            // let dimensionCountry = supermarketItems.dimension(function (d) { return d.country; })

            // var selectMenu = new dc.SelectMenu('#selectTest', 'test');
            // selectMenu
            //     .dimension(dimensionCountry)
            //     .group(dimensionCountry.group())
            // // .multiple(true)
            // // .controlsUseVisibility(true);
            // selectMenu.title(function (subs) {
            //     return subs.key;
            // })
            // datatable = new dc.DataTable('#datatable', 'test');

            // datatable
            //     .dimension(dimensionCountry)
            //     // .section(function (d) { return d.name; })
            //     .columns(['name', 'category'])
            // // .size(data.length);
            // dc.renderAll('test');







            // datatable2 = new dc.DataTable('#datatable2', groupname);

            // datatable2
            //     .dimension(data_dimension)
            //     // .section(function (d) { return d.name; })
            //     .columns(['selectschool_details_Location_addr_subward', 'school_details_school_name', 'school_details_Location_addr_subward', 'geo'])


            for (let index in filters) {
                let id = '#select' + filters[index]['key']
                if (filters[index]['array_column'] == 1) {
                    let data_dimension = cross_data.dimension(function (d) {
                        return d[filters[index]['key']] ? d[filters[index]['key']] : "No answer";
                    }, true);
                    console.log(filters[index]['name'])
                    let selectDimension = new dc.SelectMenu(id, groupname);
                    selectDimension
                        .dimension(data_dimension)
                        .group(data_dimension.group())
                    // .multiple(true)
                    // .controlsUseVisibility(true);
                    selectDimension.title(function (subs) {
                        return subs.key;
                    })
                } else {
                    let data_dimension = cross_data.dimension(function (d) {
                        return d[filters[index]['key']] ? d[filters[index]['key']] : "No answer";
                    });
                    console.log(filters[index]['name'])
                    let selectDimension = new dc.SelectMenu(id, groupname);
                    selectDimension
                        .dimension(data_dimension)
                        .group(data_dimension.group())
                        .multiple(filters[index]['multiple_select'] == 1)
                    // .controlsUseVisibility(true);
                    selectDimension.title(function (subs) {
                        return subs.key;
                    })
                }

            }


            /* Create the infographics based on the filter_graphic_config.js file */
            for (let index in filters) {
                const id = '#infographic' + filters[index]['key']
                if (filters[index]['chart'] == 0) continue
                if (filters[index]['array_column'] == 1) {
                    var data_dimension = cross_data.dimension(function (d) {
                        return d[filters[index]['key']] ? d[filters[index]['key']] : "No answer";
                    }, true);
                } else {
                    var data_dimension = cross_data.dimension(function (d) {
                        return d[filters[index]['key']] ? d[filters[index]['key']] : "No answer";
                    });
                }
                if (filters[index]['piechart'] == 1) {
                    var chartGroup = data_dimension.group().reduceCount();
                    var pieChart = dc.pieChart(id, groupname)
                        .dimension(data_dimension)
                        .group(chartGroup)
                        .slicesCap(10)
                    pieChart
                        .legend(
                            dc.legend()
                                .highlightSelected(true)
                                .legendText(function (d, i) { return d.name.charAt(0).toUpperCase() + d.name.slice(1); })
                                .itemHeight(13)
                        )
                        .width(550)
                } else {
                    var chartGroup = data_dimension.group();
                    var barChart = dc.barChart(id, groupname)
                    barChart
                        .x(d3.scaleBand())
                        .xUnits(dc.units.ordinal)
                        .brushOn(false)
                        .dimension(data_dimension)
                        .barPadding(0.1)
                        .outerPadding(0.05)
                        .elasticY(true)
                        .width(450)
                        .group(chartGroup);
                }


            }

            // dc.renderAll(groupname);

            //  Reset the filters
            d3.select('#resetFilters')
                .on('click', function () {
                    console.log('reseted filters')
                    dc.filterAll(groupname);
                    dc.redrawAll(groupname);
                });
            dc.renderAll(groupname);

        });
    dc.redrawAll()

}

