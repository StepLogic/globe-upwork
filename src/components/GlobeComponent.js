import Globe from 'react-globe.gl';
import datasets from "./datasets/world_population.csv"

import * as d3 from "d3"
import React, {useEffect, useRef, useState} from 'react';
import XLSX from 'xlsx';

function GlobeComponent() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch("/datasets/worldcities.xlsx",{
            credentials: 'same-origin'
        }).then(res =>res.arrayBuffer())
            .then(ab => {
                const wb = XLSX.read(ab, { type: "array" });
                const wc = wb.Sheets["worldcities"];
                const arcs=wb.Sheets["Sheet1"];
                const wc_data = XLSX.utils.sheet_to_json(wc, {header:1});
                const arcs_data= XLSX.utils.sheet_to_json(arcs, {header:1});
                var place=[]
                wc_data.map(data=>{
                    lon.push(data[2]);
                    lat.push(data[3]);
                    pop.push(data[9]);
                    places.push(data[0])


                })
                lon.shift();
                lat.shift();
                pop.shift();
                globeEl.current.labelData=place

            });
    })

    return <>
        <Globe

        globeImageUrl={process.env.PUBLIC_URL+"/images/earth-dark.jpg"}
        backgroundImageUrl={process.env.PUBLIC_URL+"/images/night-sky.png"}
        labelsData={places}
        labelLat={d => d.properties.latitude}
        labelLng={d => d.properties.longitude}
        labelText={d => d.properties.name}
        labelSize={d => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelDotRadius={d => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelColor={() => 'rgba(255, 165, 0, 0.75)'}
        labelResolution={2}
        />;

    </>;
}

export default GlobeComponent;
