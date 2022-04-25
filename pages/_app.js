import '../styles/globals.css'
import * as React from 'react';

//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
