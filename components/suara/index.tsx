import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface SuaraProps {
    kategori: string
}

export default function Suara(props : SuaraProps) {

    const {kategori} = props;
    
    let [j_suara, setSuara] = useState(0);
    let [total, setTotal] = useState();

    useEffect( ()=>{
        const getstate= async ()=>{
          const res = await fetch(`https://api.jabarresearch.com/api/aspirasi/count/${kategori}`);
          const get = await res.json();
          
          setSuara(await get.result);
          setTotal(await get.jumlah_data);
        }
        getstate();
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[j_suara, total]);

  return (
    <div className="bg-black flex px-16 justify-center items-center lg:w-6/12 w-full h-[450px] md:h-[500px] lg:h-full">
      <div className="w-10/12 sm:w-6/12 mt-20 lg:w-10/12">
          {/*<h1 className="font-extrabold text-white text-[140px] lg:text-[350px] md:text-[250px] items-center pt-16 -mt-28">{j_suara}%</h1>*/}
          <CircularProgressbarWithChildren
          value={j_suara}
          text={`${j_suara}%`}
          background
          backgroundPadding={6}
          className="font-bold"
          styles={buildStyles({
            backgroundColor: "white",
            textColor: "black",
            pathColor: "black",
            trailColor: "transparent",
            pathTransitionDuration: 2,
            textSize:"26px",
          })}>
          <h5 className="text-black items-center text-center mt-20 md:mt-24 lg:mt-28 xl:mt-36 2xl:mt-52 text-sm lg:text-md xl:text-lg">Dari {total} aspirasi <br/> Tidak puas dengan kinerja <br/>{kategori} Jawa Barat</h5>
          </CircularProgressbarWithChildren>
      </div>
    </div>
  )
}
