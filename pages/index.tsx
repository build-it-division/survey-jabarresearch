import Header from '../components/header'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import TopPartai from '../components/suara/toppartai';
import TopCapres from '../components/suara/topcapres';
import Suara from '../components/suara/circle';
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {

    let [j_suara, setSuara] = useState(0);
    let [total, setTotal] = useState();

    useEffect( ()=>{
        const getstate= async ()=>{
          const res = await fetch(`https://api.jabarresearch.com/api/aspirasi/count/all`);
          const get = await res.json();
          
          setSuara(await get.result);
          setTotal(await get.jumlah_data);
        }
        getstate();
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[j_suara, total]);

      //for slider
      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        autoPlay: true,
      };

      
  return (
    <>
    <Header theme="text-white"/>
    <div className="w-full flex flex-col items-center -z-10">
      <div className="w-full bg-black h-full lg:h-screen flex flex-col lg:flex-row justify-center px-10 lg:px-[100px] xl:px-[150px]">
        <div className="hero w-full flex flex-col justify-center xl:pt-[50px] lg:w-6/12 2xl:w-7/12 pt-28">
          <h1 className="text-[25px] text-white font-light md:text-4xl 2xl:text-5xl">Suarakan <span className="font-bold">aspirasi</span> anda <br />untuk <span className="font-bold">Jawa Barat</span> lebih baik</h1>
          <span className="text-white mt-4 mb-8 opacity-50 font-light text-sm md:w-8/12 md:text-sm lg:text-sm xl:text-sm">
          Jabar Research adalah media independen dan yang tidak berafiliasi dengan pihak manapun, segala data yang dikirimkan dan dipublikasikan adalah data sebenarnya dari audiens.
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 lg:w-full xl:w-10/12"> 
            <Link href="/aspirasi/infrastruktur">
            <button type="button" className="lg:w-[100px] w-[150px] 2xl:w-[150px] text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Infrastruktur
            </button>
            </Link>
            <Link href="/aspirasi/pendidikan">
            <button type="button" className="lg:w-[100px] w-[150px] 2xl:w-[150px] text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Pendidikan
            </button>
            </Link>
            <Link href="/aspirasi/ekonomi">
            <button type="button" className="lg:w-[100px] w-[150px] 2xl:w-[150px] text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Ekonomi
            </button>
            </Link>
            <Link href="/aspirasi/kesehatan">
            <button type="button" className="lg:w-[100px] w-[150px] 2xl:w-[150px] text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Kesehatan
            </button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-6/12 2xl:w-5/12 lg:flex flex-row justify-center items-center pb-12">
          <div className="w-10/12 sm:w-8/12 mt-20 md:w-6/12 lg:w-10/12 2xl:w-full mx-auto py-auto">
            {/*<h1 className="font-extrabold text-white text-[140px] lg:text-[350px] md:text-[250px] items-center pt-16 -mt-28">{j_suara}%</h1>*/}
            <CircularProgressbarWithChildren
            value={j_suara}
            background
            backgroundPadding={6}
            className="font-bold"
            styles={buildStyles({
              backgroundColor: "white",
              textColor: "black",
              pathColor: "black",
              trailColor: "transparent",
              pathTransitionDuration: 2,
              textSize:"32px",
            })}>
            <div className="my-auto mx-auto items-center text-center justify-center">
              <h2 className="text-black items-center text-center my-auto lg:-mb-8 text-[80px] lg:text-[120px] xl:text-[140px] 2xl:text-[180px] font-bold">{j_suara}%</h2>
              <h5 className="text-black items-center text-center text-sm lg:text-md xl:text-lg w-7/12 mx-auto">Masyarakat tidak puas dengan pemerintah Jawa Barat</h5>
            </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
      <div className="w-full lg:h-full flex flex-col lg:flex-row justify-center">
        <div className="mt-5 md:mt-0 p-10 flex flex-col justify-center w-full lg:w-6/12">
          <h1 className="mx-auto mb-4 text-gray-600 lg:text-xl font-semibold text-center ">Daftar 10 Calon Presiden dengan Voting Terbanyak</h1>
          <TopCapres />
          <div className="w-full text-center mt-12">
            <Link href="/2024/capres">
            <button type="button" className="w-[200px] text-white bg-black border border-gray-300 focus:outline-none hover:bg-gray-300 hover:text-gray-600 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Ikuti Survey
            </button>
            </Link>
          </div>
        </div>
        <div className="mt-5 md:mt-0 p-10 flex flex-col justify-center bg-gray-200 w-full lg:w-6/12">
          <h1 className="mx-auto mt-5 lg:mt-0 mb-4 text-gray-600 lg:text-xl font-semibold">Daftar 10 Partai dengan Voting Terbanyak</h1>
          <TopPartai />
          <div className="w-full text-center mt-12 mb-6 lg:mb-0">
            <Link href="/2024/parpol">
            <button type="button" className="w-[200px] text-white bg-black border border-gray-300 focus:outline-none hover:bg-gray-300 hover:text-gray-600 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Ikuti Survey
            </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
      <Slider {...settings} className="overflow-hidden">
        <div className="w-full">
          <div className="w-full h-full flex flex-col lg:flex-row justify-center bg-black px-10 lg:px-[100px] xl:px-[150px] pb-12">
            <Suara kategori="infrastruktur"/>
            <div className="hero w-full flex flex-col justify-center xl:pt-[50px] lg:w-6/12 2xl:w-7/12">
              <h1 className="text-[28px] text-white font-light md:text-3xl 2xl:text-4xl">Warga <span className="font-bold">Jawa Barat</span> tidak puas dengan kinerja pemerintah provinsi dalam bidang infrastruktur</h1>
              <span className="text-white mt-4 mb-8 opacity-50 font-light text-sm md:w-[600px] md:text-sm lg:text-sm xl:text-sm">
              Jabar Research adalah media independen dan yang tidak berafiliasi dengan pihak manapun, segala data yang dikirimkan dan dipublikasikan adalah data sebenarnya dari audiens.
              </span>
              <div className="flex flex-row"> 
                <Link href="/aspirasi/infrastruktur">
                <button type="button" className="w-[200px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Selengkapnya
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full h-full flex flex-col lg:flex-row justify-center bg-black px-10 lg:px-[100px] xl:px-[150px] pb-12">
            <Suara kategori="ekonomi"/>
            <div className="hero w-full flex flex-col justify-center xl:pt-[50px] lg:w-6/12 2xl:w-7/12">
              <h1 className="text-[28px] text-white font-light md:text-3xl 2xl:text-4xl">Warga <span className="font-bold">Jawa Barat</span> tidak puas dengan kinerja pemerintah provinsi dalam bidang ekonomi</h1>
              <span className="text-white mt-4 mb-8 opacity-50 font-light text-sm md:w-[600px] md:text-sm lg:text-sm xl:text-sm">
              Jabar Research adalah media independen dan yang tidak berafiliasi dengan pihak manapun, segala data yang dikirimkan dan dipublikasikan adalah data sebenarnya dari audiens.
              </span>
              <div className="flex flex-row"> 
                <Link href="/aspirasi/ekonomi">
                <button type="button" className="w-[200px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Selengkapnya
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full h-full flex flex-col lg:flex-row justify-center bg-black px-10 lg:px-[100px] xl:px-[150px] pb-12">
            <Suara kategori="pendidikan"/>
            <div className="hero w-full flex flex-col justify-center xl:pt-[50px] lg:w-6/12 2xl:w-7/12">
              <h1 className="text-[28px] text-white font-light md:text-3xl 2xl:text-4xl">Warga <span className="font-bold">Jawa Barat</span> tidak puas dengan kinerja pemerintah provinsi dalam bidang pendidikan</h1>
              <span className="text-white mt-4 mb-8 opacity-50 font-light text-sm md:w-[600px] md:text-sm lg:text-sm xl:text-sm">
              Jabar Research adalah media independen dan yang tidak berafiliasi dengan pihak manapun, segala data yang dikirimkan dan dipublikasikan adalah data sebenarnya dari audiens.
              </span>
              <div className="flex flex-row"> 
                <Link href="/aspirasi/pendidikan">
                <button type="button" className="w-[200px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Selengkapnya
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full h-full flex flex-col lg:flex-row justify-center bg-black px-10 lg:px-[100px] xl:px-[150px] pb-12">
            <Suara kategori="kesehatan"/>
            <div className="hero w-full flex flex-col justify-center xl:pt-[50px] lg:w-6/12 2xl:w-7/12">
              <h1 className="text-[28px] text-white font-light md:text-3xl 2xl:text-4xl">Warga <span className="font-bold">Jawa Barat</span> tidak puas dengan kinerja pemerintah provinsi dalam bidang kesehatan</h1>
              <span className="text-white mt-4 mb-8 opacity-50 font-light text-sm md:w-[600px] md:text-sm lg:text-sm xl:text-sm">
              Jabar Research adalah media independen dan yang tidak berafiliasi dengan pihak manapun, segala data yang dikirimkan dan dipublikasikan adalah data sebenarnya dari audiens.
              </span>
              <div className="flex flex-row"> 
                <Link href="/aspirasi/kesehatan">
                <button type="button" className="w-[200px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Selengkapnya
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </Slider>
      </div>
    </div>
    </>
  )
}

