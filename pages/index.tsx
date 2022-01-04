import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


import Nav from '../components/nav'

import React, {useEffect} from 'react';
 
const councildistricts = require('./CouncilDistricts.json')
import * as turf from '@turf/turf'

    // added the following 6 lines.
    import mapboxgl from 'mapbox-gl';

       import { assertDeclareExportAllDeclaration } from '@babel/types';

const Home: NextPage = () => {


  function checkHideOrShowTopRightGeocoder() {
    var toprightbox = document.querySelector(".mapboxgl-ctrl-top-right")
   if (toprightbox) {
    var toprightgeocoderbox:any = toprightbox.querySelector(".mapboxgl-ctrl-geocoder");
    if (toprightgeocoderbox) {
      if (window.innerWidth >= 768) {
        console.log('changing to block')
        toprightgeocoderbox.style.display = 'block'
      } else {
        toprightgeocoderbox.style.display = 'none'
        console.log('hiding')
      }
    }
   }
  }

  var handleResize = () => {
    checkHideOrShowTopRightGeocoder()

  
  }


  const divRef:any = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
        console.log('map div', divRef)

        if (divRef.current) {
          console.log('app render')
        }

       // mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
//import locations from './features.geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoiY29tcmFkZWt5bGVyIiwiYSI6ImNrdjBkOXNyeDdscnoycHE2cDk4aWJraTIifQ.77Gid9mgpEdLpFszO5n4oQ';
 
const map = new mapboxgl.Map({
  container: divRef.current, // container ID
  style: 'mapbox://styles/comradekyler/ckxslkfs7kemm15mpb8700qoq', // style URL
  center: [-118.41,34], // starting position [lng, lat]
  zoom: 9 // starting zoom
});


const geocoder:any = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: map,
  proximity: {
    longitude: -118.41,
    latitude: 34
  },
  marker: true
  });

  var colormarker = new mapboxgl.Marker({
    color: '#41ffca'
  });

  const geocoderopt:any = 
    {
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: {
        color: '#41ffca'
      }
      }
  

  const geocoder2 = new MapboxGeocoder(geocoderopt);
  const geocoder3 = new MapboxGeocoder(geocoderopt);


 
     
geocoder.on('result', (event:any) => {
  var singlePointSet:any = map.getSource('single-point')
  singlePointSet.setData(event.result.geometry);
  console.log('event.result.geometry',event.result.geometry)
  console.log('geocoderesult', event)
});

geocoder.on('select', function(object:any){
  var coord = object.feature.geometry.coordinates;
  var singlePointSet:any = map.getSource('single-point')
  singlePointSet.setData(object.feature.geometry);
});

var geocoderId = document.getElementById('geocoder')



if (geocoderId) {
  console.log(
  'geocoder div found'
  )

  if (!document.querySelector(".geocoder input")) {
    geocoderId.appendChild(geocoder3.onAdd(map));

    var inputMobile = document.querySelector(".geocoder input");

    try {
      var loadboi =  document.querySelector('.mapboxgl-ctrl-geocoder--icon-loading')
      if (loadboi) {
        var brightspin:any = loadboi.firstChild;
     if (brightspin) {
      brightspin.setAttribute('style', 'fill: #e2e8f0');
     }
     var darkspin:any = loadboi.lastChild;
     if (darkspin) {
      darkspin.setAttribute('style', 'fill: #94a3b8');
     }
      }
     
    } catch (err) {
      console.error(err)
    }
  
    if (inputMobile) {
      inputMobile.addEventListener("focus", () => {
        //make the box below go away
       
        });
    }
  }


geocoder.on('result', (event:any) => {
  var singlePointSet:any = map.getSource('single-point')
  singlePointSet.setData(event.result.geometry);
  console.log('event.result.geometry',event.result.geometry)
  console.log('geocoderesult', event)
});

geocoder.on('select', function(object:any){
  var coord = object.feature.geometry.coordinates;
  var singlePointSet:any = map.getSource('single-point')
  singlePointSet.setData(object.feature.geometry);
});
}


window.addEventListener('resize', () => {
  console.log('resize')
  handleResize()
});  

map.on('load', () => {


map.addControl(
  geocoder2
  );

 checkHideOrShowTopRightGeocoder()

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

  checkHideOrShowTopRightGeocoder()
});

       

  }, [])

  return (
  
  <div className='h-screen flex flex-col'>
  <Nav/>     

           
  <div
      className=' outsideTitle max-h-screen flex-col flex z-50'
    >
        
  <div className='titleBox max-h-screen fixed mt-[3.8em] ml-2 md:mt-[3.8em] md:ml-3 break-words'>2021 Parking Citations Los Angeles</div>

  <div
    className={`geocoder md:hidden mt-[7.5em] xs:text-sm sm:text-base md:text-lg`} id='geocoder'></div>
</div>
    <div ref={divRef} style={{

    }} className="map-container h-full" />
     
    </div>
  )
}

export default Home;
