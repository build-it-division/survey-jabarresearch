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


export default function TopCapres() {

    let [dataTopCapres, setTopCapres] = useState([]);
    console.log(dataTopCapres);

    useEffect( ()=>{
        const getstate= async ()=>{
          const res = await fetch(`https://api.jabarresearch.com/api/top/capres`);
          const get = await res.json();
          setTopCapres(get);
        }
        getstate();
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    var label= new Array();
    var vote= new Array();

    for(let i = 0; i < Object.keys(dataTopCapres).length; i++) {

        label.push(dataTopCapres[i].presiden);
        vote.push(dataTopCapres[i].vote);
    }
    
    const data = {
    labels: label,
    datasets: [{
      data: vote,
      backgroundColor: ['rgba(0, 0, 0, 1)','rgba(0, 0, 0, 0.9)','rgba(0, 0, 0, 0.8)','rgba(0, 0, 0, 0.7)','rgba(0, 0, 0, 0.6)','rgba(0, 0, 0, 0.5)','rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0.3)','rgba(0, 0, 0, 0.2)','rgba(0, 0, 0, 0.1)'],
      borderColor: ['rgba(0, 0, 0, 1)','rgba(0, 0, 0, 0.9)','rgba(0, 0, 0, 0.8)','rgba(0, 0, 0, 0.7)','rgba(0, 0, 0, 0.6)','rgba(0, 0, 0, 0.5)','rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0.3)','rgba(0, 0, 0, 0.2)','rgba(0, 0, 0, 0.1)'],
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