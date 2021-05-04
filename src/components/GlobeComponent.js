import Globe from 'react-globe.gl';
import datasets from "./datasets/world_population.csv"

import * as d3 from "d3"
import React, {useEffect, useRef, useState} from 'react';
import XLSX from 'xlsx';

function GlobeComponent() {
    const [places, setPlaces] = useState([]);
    const globeEl =useRef()
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
                var lon=[]
                var lat=[]
                var pop=[]
                var iso=[]
                var cities=[]
                var countries=[]
                var place=[]
                wc_data.map(data=>{
                    lon.push(data[2]);
                    lat.push(data[3]);
                    pop.push(data[9]);
                    cities.push(data[0])


                })
                lon.shift();
                lat.shift();
                pop.shift();
                cities.shift()


            });
    })

    return <>
        <Globe

        globeImageUrl={process.env.PUBLIC_URL+"/images/earth-dark.jpg"}
        backgroundImageUrl={process.env.PUBLIC_URL+"/images/night-sky.png"}

        />;

    </>;
}

export default GlobeComponent;
