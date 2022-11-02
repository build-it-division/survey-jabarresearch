import React, { useState, useEffect, ReactNode } from 'react';
import axios from "axios";
import Router from 'next/router';
import Suara from '../../../components/suara'
import Header from '../../../components/header';

interface DataProps {
    dataRegion:{
        cities: [],
    },
  }


export default function AspirasiCreate(props : DataProps) {

    const { dataRegion } = props;

    const options = [];
    age = {}
    var j = 0

    for(var i = 17; i <= 100; i++) {
      var age = {};

      age['age'] = i;
      age['id'] = j;
      options.push(age);
      j++
    }

    console.log(options)

    const kabupaten = dataRegion.cities;
    console.log(kabupaten);

    let [city, setCity] = useState({});
    let [kec, setKec] = useState({
        districts : []
    });
    let [kota, setKota] = useState('');

    const handlecity=(event: React.ChangeEvent<HTMLSelectElement>)=>{
        const getcityid= event.target.value;
        console.log(getcityid);
        setCity(city = getcityid);
        setKota(kota = getcityid);
        console.log(city);
    }

    useEffect( ()=>{
        const getstate= async ()=>{
          const reskec = await fetch(`https://api.jabarresearch.com/api/region/${city}`);
          const getkec = await reskec.json();
    
          setKec(await getkec);
        }
        getstate();
        
      },[city]);

      const [btnLoading, setLoading] = useState(false);
      const [btnDisable, setBtnDisable] = useState(false);

      const [nama, setNama] = useState('');
      const [email, setEmail] = useState('');
      const bidang = 'pendidikan';
      const [kecamatan, setKecamatan] = useState('');
      const [kepuasan, setKepuasan] = useState('');
      const [aspirasi, setAspirasi] = useState('');
      const [usia, setUsia] = useState('');
      const [image, setImage] = useState('');
  
      const handleFileChange = (e) => {

        //define variable for get value image data
        const imageData = e.target.files[0]

        //check validation file
        if (!imageData.type.match('image.*')) {

            //set state "image" to null
            setImage('');

            return
        }

        //assign file to state "image"
        setImage(imageData);
        }
  
      //method "storePost"
      const storePost = async (e: { preventDefault: () => void; }) => {
          e.preventDefault();

          setLoading(true);
          setBtnDisable(true);
  
          //define formData
          const formData = new FormData();
  
          //append data to "formData"
          formData.append('nama', nama);
          formData.append('kota', kota);
          formData.append('kecamatan', kecamatan);
          formData.append('bidang', bidang);
          formData.append('usia', usia);
          formData.append('kepuasan', kepuasan);
          formData.append('aspirasi', aspirasi);
          formData.append('email', email);
          formData.append('image', image);
          
          //send data to server
          await axios.post(`https://api.jabarresearch.com/api/aspirasi`, formData)
          .then(() => {
  
              //redirect
              alert(`Aspirasi anda berhasil dimasukkan!`);
              Router.push('/')
  
          })
          .catch((error) => {
  
              //assign validation on state
          })
          
      };
      
      console.log(kec)

    return (
        <>
        <Header theme="text-gray-700" />
        <div className="flex flex-col items-center w-full">
            <div className="w-full lg:h-[100vh] flex flex-col lg:flex-row">
                <Suara kategori="infrastruktur"/>
                <div className="mt-5 md:mt-0 flex flex-col justify-center items-center w-full lg:w-9/12 xl:w-6/12">
                    <h1 className="text-xl lg:text-xl font-semibold text-gray-600 md:mt-16">Untuk Pendidikan Jawa Barat yang Lebih Baik</h1>
                    <form onSubmit={ storePost } className="flex justify-center">
                    <div className="shadow-2xl overflow-hidden sm:rounded-lg xl:w-10/12">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    id="nama"
                                    autoComplete="given-name"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    value={nama} 
                                    onChange={(e) => setNama(e.target.value)}
                                    required
                                />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="usia" className="block text-sm font-medium text-gray-700">
                                    Usia
                                </label>
                                <select
                                    id="usia"
                                    name="usia"
                                    autoComplete="usia"
                                    onChange={(e) => setUsia(e.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>Pilih Usia</option>
                                    {options?.map((age)=>(
                                    <option key={age.id} value={age.age}>{age.age}</option>
                                    ))}
                                </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Foto/Gambar
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    onChange={handleFileChange}
                                />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Kota" className="block text-sm font-medium text-gray-700">
                                    Kota / Kabupaten
                                </label>
                                <select
                                    id="kota"
                                    name="kota"
                                    autoComplete="kota"
                                    onChange={(e)=> handlecity(e)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-   sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>Pilih Kota / Kabupaten</option>
                                    {kabupaten?.map((kab: { name: ReactNode; id: React.Key | null |  undefined; })=>(
                                    <option key={kab.id} value={kab.id} >{kab.name}</option>
                                    ))}
                                </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">
                                    Kecamatan
                                </label>
                                <select
                                    id="kecamatan"
                                    name="kecamatan"
                                    autoComplete="kecamatan"
                                    onChange={(e) => setKecamatan(e.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>Pilih Kecamatan</option>
                                    {kec.districts?.map((kecamatan: { name: ReactNode; id: React.Key | null |  undefined; })=>(
                                    <option key={kecamatan.id} value={kecamatan.id} >{kecamatan.name}</option>
                                    ))}
                                </select>
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="aspirasi" className="block text-sm font-medium text-gray-700">
                                     Apa yang membuat anda puas / tidak puas terhadap kinerja pemerintah dalam bidang tersebut?
                                    </label>
                                    <textarea
                                        id="aspirasi"
                                        name="aspirasi"
                                        rows={3}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="contoh : jalan rusak, lampu penerangan jalan padam, dan sebagainya."
                                        value={aspirasi}
                                        onChange={(e) => setAspirasi(e.target.value)}
                                    />
                                </div>
                                <div className="col-span-6 items-center lg:px-5 xl:px-20">
                                    <label htmlFor="Kepuasan" className="block text-sm font-medium text-gray-700 text-center">
                                        Apakah anda sudah puas dengan kinerja pemerintah Jawa Barat saat ini?
                                    </label>
                                    <div id="kepuasan" className="flex flex-row py-4 justify-between px-16">
                                        <button 
                                            className="text-lg w-1/2 2xl:w-[150px] 2xl:h-12 h-10 bg-gray-700 text-white font-semibold rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:bg-green-600 focus:ring-opacity-75"
                                            onClick={(e) => setKepuasan('puas')}
                                            disabled = {btnDisable}
                                            >
                                                { btnLoading
                                                    ? <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                                    </svg>
                                                    : null
                                                }
                                            Puas
                                        </button>
                                        <button 
                                            className="text-lg w-1/2 2xl:w-[150px] 2xl:h-12 h-10 bg-gray-700 text-white font-semibold rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:bg-red-600 focus:ring-opacity-75"
                                            onClick={(e) => setKepuasan('tidak')}
                                            disabled = {btnDisable}
                                            >
                                                 { btnLoading
                                                    ? <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                                    </svg>
                                                    : null
                                                }
                                                Tidak Puas
                                        </button>
                                    </div>  
                                </div> 
                            </div>
                                <h5 className="text-xs lg:text-xs font-regular text-gray-600 w-full">
                                * Jabar Research adalah media independen dan yang tidak berafiliasi dengan pihak manapun, segala data yang
                                dikirimkan dan dipublikasikan adalah data sebenarnya dari audiens.  
                                </h5>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`https://api.jabarresearch.com/api/region`)
    const dataRegion = await res.json()
  
    return {
      props: {  
        dataRegion,
      }
    }
    
}
    
    
