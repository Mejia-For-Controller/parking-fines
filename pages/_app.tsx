import '../styles/globals.css'
import type { AppProps } from 'next/app';
import styles from '../styles/Home.module.css'
import './../node_modules/mapbox-gl/dist/mapbox-gl.css'
import './App.css';

import './../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './mapboxdark.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
