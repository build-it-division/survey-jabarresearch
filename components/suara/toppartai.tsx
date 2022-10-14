import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


export default function TopPartai() {

    let [dataTopPartai, setTopPartai] = useState([]);

    useEffect( ()=>{
        const getstate= async ()=>{
          const res = await fetch(`https://api.jabarresearch.com/api/top/partai`);
          const get = await res.json();
          setTopPartai(get);
        }
        getstate();
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    var label= new Array();
    var color= new Array();
    var vote= new Array();

    for(let i = 0; i < Object.keys(dataTopPartai).length; i++) {

        label.push(dataTopPartai[i].singkatan);
        color.push(dataTopPartai[i].color);
        vote.push(dataTopPartai[i].vote);
    }
    
    const data = {
    labels: label,
    datasets: [{
      data: vote,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1
    }],
    }

  return (
    <div className="w-full flex flex-col">
        <Bar
        data={data}
        width={400}
        height={300}
        options={{
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                    }
                    },
                    y: {
                    grid: {
                        display: false
                    }
                    },
            },
            plugins: {
                legend: {
                    display: false
                },
            },
            indexAxis: "y",
        }}
        />
    </div>
  )
}