import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

/* tslint:disable */
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
/* tslint:enable */

import React, {useEffect} from 'react';
 
const councildistricts = require('./CouncilDistricts.json')
import * as turf from '@turf/turf'

    // added the following 6 lines.
    import mapboxgl from 'mapbox-gl';

       import { assertDeclareExportAllDeclaration } from '@babel/types';

const Home: NextPage = () => {
  const divRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
        console.log('map div', divRef)

        if (divRef.current) {
          console.log('app render')
        }

        mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
//import locations from './features.geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoiY29tcmFkZWt5bGVyIiwiYSI6ImNrdjBkOXNyeDdscnoycHE2cDk4aWJraTIifQ.77Gid9mgpEdLpFszO5n4oQ';
 
const map = new mapboxgl.Map({
  container: divRef.current, // container ID
  style: 'mapbox://styles/comradekyler/ckxslkfs7kemm15mpb8700qoq', // style URL
  center: [-118.41,34], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

map.on('load', () => {
  map.addLayer({
    id: 'citybound',
    type: 'line',
    source: {
      type: 'geojson',
      data: councildistricts
    },
    paint: {
      "line-color": '#ddddff',
      'line-opacity': 0.0,
      'line-width': 2
    }
  })
  
  
  
  
  
  
  map.addLayer({
    id: 'cityboundfill',
    type: 'fill',
    source: {
      type: 'geojson',
      data:  councildistricts
    },
    paint: {
      'fill-color': '#ddffdd',
      'fill-opacity': 0.009
    }
  });
})


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
     
  // Add geolocate control to the map.
  map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
  );
       

  }, [])

  return (
  <div>
         
         <div
      className=' outsideTitle max-h-screen flex-col flex z-50'
    >
      <div className='titleBox max-h-screen mt-2 ml-2 md:mt-3 md:ml-3 break-words'>2021 Parking Citations Los Angeles</div>
</div>

    <div ref={divRef} style={{

    }} className="map-container" />
    </div>
  )
}

export default Home
