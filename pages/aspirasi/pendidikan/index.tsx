import Head from 'next/head'
import Link from 'next/link'
import Header from '../../../components/header'
import Suara from '../../../components/suara'

export default function index() {
  return (
    <>
    <Header theme="text-gray-700"/>
    <div className="flex flex-col items-center bg-gray-100">
      <div className="w-full h-full lg:h-screen flex flex-col lg:flex-row">
          <Suara kategori="infrastruktur"/>
        <div className="mt-5 md:mt-0 p-10 xl:px-32 flex flex-col justify-center w-full lg:w-6/12">
          <h1 className="text-2xl md:text-left md:text-3xl xl:text-3xl">Warga <span className="font-bold">Jawa Barat</span> tidak puas dengan kinerja pemerintah provinsi dalam bidang infrastruktur</h1>
          <p className="text-left mt-4 text-gray-500 mb-6 text-lg">Bagaimana dengan suara anda?</p>
          <Link href="/aspirasi/pendidikan/create">
            <button className="text-lg w-1/2 2xl:w-1/3 h-12 bg-gray-700 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Ikuti Survey
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
