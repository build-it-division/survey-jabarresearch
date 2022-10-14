/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import React, { useState, useEffect, ReactNode } from 'react';
import Header from "../../../components/header";
import Router from "next/router";
import {Bar} from 'react-chartjs-2';
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


interface CapresProps {
    dataCapres : any[],
    dataTopCapres : any[]
}

export default function Capres(props : CapresProps) {

    const {dataCapres} = props;
    const {dataTopCapres} = props;

    console.log(dataCapres)
    console.log(dataTopCapres[1])
    
    var label= new Array();
    var vote= new Array();

    for(let i = 0; i < Object.keys(dataTopCapres).length; i++) {

        label.push(dataTopCapres[i].presiden);
        vote.push(dataTopCapres[i].vote);
    }

    const capres = dataCapres;
    
    const data = {
    labels: label,
    datasets: [{
      data: vote,
      backgroundColor: ['rgba(0, 0, 0, 1)','rgba(0, 0, 0, 0.9)','rgba(0, 0, 0, 0.8)','rgba(0, 0, 0, 0.7)','rgba(0, 0, 0, 0.6)','rgba(0, 0, 0, 0.5)','rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0.3)','rgba(0, 0, 0, 0.2)','rgba(0, 0, 0, 0.1)'],
      borderColor: ['rgba(0, 0, 0, 1)','rgba(0, 0, 0, 0.9)','rgba(0, 0, 0, 0.8)','rgba(0, 0, 0, 0.7)','rgba(0, 0, 0, 0.6)','rgba(0, 0, 0, 0.5)','rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0.3)','rgba(0, 0, 0, 0.2)','rgba(0, 0, 0, 0.1)'],
      borderWidth: 1
    }],
    }

    let [capresId, setCapres] = useState({});
    let [jmlVote, setJmlVote] = useState(0);
    
    const handleCapres=(event: React.ChangeEvent<HTMLSelectElement>)=>{
        const getid= event.target.value;
        console.log(getid);
        setCapres(capresId = getid);
        console.log(capresId)
    }

    useEffect( ()=>{
       const getstate= async ()=>{
          const rescapres = await fetch(`https://api.jabarresearch.com/api/capres/${capresId}`);
          const getcapres = await rescapres.json();
    
          setJmlVote(jmlVote = getcapres.vote);
          
        }
        getstate();
        
      },[capresId]);

      const [btnLoading, setLoading] = useState(false);
        const [btnDisable, setBtnDisable] = useState(false);

      const storeVote = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        setLoading(true);
        setBtnDisable(true);

        //define formData
        const formData = new FormData();

        let hasil = jmlVote + 1

        //append data to "formData"
        formData.append('vote', hasil.toString());
        formData.append('_method', 'PUT');
        
        //send data to server
        await axios.post(`https://api.jabarresearch.com/api/capres/${capresId}`, formData)
        .then(() => {

            //redirect
            alert(`Voting anda berhasil!`);
            Router.reload();

        })
        .catch((error) => {

          alert(error);
        })
    };


  return (
    <div className="">
        <Header theme="text-gray-700" />
        <div className="flex flex-col items-center bg-gray-100">
            <div className="w-full h-screen flex flex-col lg:flex-row">
                <div className="bg-gray-900 flex px-16 justify-center items-center lg:w-5/12 w-full h-full md:h-full lg:h-screen">                    
                    <form onSubmit={storeVote} className="justify-items-center w-full">
                        <div className="shadow-2xl overflow-hidden rounded-lg lg:w-10/12 mx-auto">
                            <div className="px-4 py-5 bg-white sm:p-6 w-full flex justify-between flex-col md:flex-row">
                                <div className="w-full lg:w-10/12">
                                    <label htmlFor="partai" className="block text-md font-medium text-gray-700">
                                        Tentukan pilihan anda :
                                    </label>
                                    <select
                                        id="partai"
                                        name="partai"
                                        autoComplete="partai"
                                        onChange={(e) => handleCapres(e)}
                                        className="mt-1 mb-6 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                    >
                                        <option>Pilih Calon Presiden</option>
                                        {capres.map((capres)=>(
                                        <option key={capres.id} value={capres.id} >{capres.presiden}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="submit"
                                        disabled = {btnDisable}
                                        className="flex justify-center py-2 px-4 lg:w-1/4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        { btnLoading
                                                    ? <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                                    </svg>
                                                    : null
                                                }
                                        Kirim
                                    </button>
                                    <h4 className="my-4">Jumlah Vote Saat Ini : {jmlVote} orang</h4>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-5 md:mt-0 px-10 xl:px-32 flex flex-col justify-center w-full lg:w-7/12">
                    <h1 className="mx-auto mb-4 text-gray-600 lg:text-xl font-semibold">Daftar 10 Calon Presiden dengan Voting Terbanyak</h1>
                    <div className="w-full flex flex-col">
                        <Bar
                        data={data}
                        // @ts-ignore
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
                    <h5 className="text-xs lg:text-xs font-regular text-gray-600 2xl:pb-5 md:mt-5 w-full">
                        * Jabar Research adalah media independen dan yang tidak berafiliasi dengan pihak manapun, segala data yang
                        dikirimkan dan dipublikasikan adalah data sebenarnya dari audiens.  
                    </h5>
                </div>
            </div>
        </div>
    </div>
  )
}

export async function getServerSideProps() {
    const res = await fetch(`https://api.jabarresearch.com/api/capres`)
    const dataCapres = await res.json()

    const restop = await fetch(`https://api.jabarresearch.com/api/top/capres`)
    const dataTopCapres = await restop.json()
  
    return {
      props: {  
        dataCapres,
        dataTopCapres,
      }
    }
    
}
