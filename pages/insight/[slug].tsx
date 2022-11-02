/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import Header from "../../components/header";
import Suara from "../../components/suara";
import Router from "next/router";
import axios from "axios";
import Image from "next/image";
import Hero from "../../assets/images/insight.png"; 

interface QuestProps {
  dataQuestion : {
    data : [
      {
        insight_questions: any,
        title: any
      }
    ]
  }
}

export default function DetailInsight(props : QuestProps) {

    //declaration slug(dynamic routing)
    const router = useRouter();
    const {slug} = router.query;
    const {dataQuestion} = props;
    const question = dataQuestion.data[0].insight_questions
    const Title = dataQuestion.data[0].title

    let [FormStart, SetFormStart] = useState('hidden');
    let [essaycontent, SetEssayContent] = useState('');
    let [essay, SetEssay] = useState([]);
    let [email, setEmail] = useState('');

    const [btnLoading, setLoading] = useState(false);
    const [btnDisable, setBtnDisable] = useState(false);


    let [result, SetResult] = useState([]);

    //inisiasi result awal
    const handleStartForm = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      SetFormStart('visible')

      try {
        for(let i = 0; i < question.length; i++) {
          const essay_id = parseInt(String(question[i].insight_id)+String(question[i].id));
            //
            if(question[i].type === 'polling') {
              let data = {insight_id : question[i].insight_id, insight_question_id : question[i].id, insight_answer_id : '', insight_essay_code : '', email : email};
              SetResult((result) => [...result, data])
            } else {
              let data = {insight_id : question[i].insight_id, insight_question_id : question[i].id, insight_answer_id : '', insight_essay_code : essay_id, email : email};
              let dataEssay = {code : essay_id, insight_id : question[i].insight_id, insight_question_id : question[i].id, content : essaycontent}
              SetResult((result) => [...result, data])
              SetEssay((essay) => [...essay, dataEssay ])
            }
            
            
        }
      } catch(e) {
        console.log(e)
      }

    }

    //merubah sesuai jawaban pilgan yang dipilih
    const handleChangeAnswer = (id, e) => {
      const data = result.map(i => {
        if(id === i.insight_question_id) {
          i.insight_answer_id = parseInt(e.target.value)
        }
        return i;
      })

      SetResult(data);
    }

    //merubah sesuai jawaban essay yang dipilih
    const handleChangeEssay = (id, e) => {
      const data = essay.map(i => {
        const essay_id = parseInt(String(i.insight_id)+String(i.insight_question_id));
        if(id === i.insight_question_id) {
          i.content = e.target.value
        }
        return i;
      })

      SetEssayContent(e.target.value)

      SetEssay(data);
    }

    //insert data to database
    const storeAllResult = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      setLoading(true);
      setBtnDisable(true);
      for(let i = 0; i < essay.length; i++) {
        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('code',essay[i].code);
        formData.append('insight_id',essay[i].insight_id);
        formData.append('insight_question_id',essay[i].insight_question_id);
        formData.append('content',essay[i].content);
        
        //send data to server
        await axios.post(`https://api.jabarresearch.com/api/insight/storeEssay`, formData)
        .then(() => {

            //redirect
            console.log("essay berhasil masuk")

        })
        .catch((error) => {

          console.log(error);
        })
     }

      for(let i = 0; i < result.length; i++) {
        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('insight_id',result[i].insight_id);
        formData.append('insight_question_id',result[i].insight_question_id);
        formData.append('insight_answer_id',result[i].insight_answer_id);
        formData.append('insight_essay_code',result[i].insight_essay_code);
        formData.append('email',email);
        
        //send data to server
        await axios.post(`https://api.jabarresearch.com/api/insight/storeResult`, formData)
        .then(() => {

            //redirect
            console.log("result berhasil")

        })
        .catch((error) => {

          console.log(result[i].insight_id,result[i].insight_question_id,result[i].insight_answer_id, result[i].insight_essay_code, result[i].email);
        })

      }

      alert("data berhasil diinput")
      Router.push('/');
    };

      console.log(dataQuestion);

  return (
    <>
        <Header theme="text-gray-700" />
        <div className="flex flex-col items-center w-full">
            <div className="w-full lg:h-screen flex flex-col lg:flex-row">
              <div className="bg-black flex px-14 justify-center items-center lg:w-6/12 w-full h-[500px] md:h-[500px] lg:h-full">
                <div className="px-10 mt-12">
                  <Image
                  src={Hero}
                  width="500"
                  height="500"
                  className="mt-12"
                />
                </div>
              
              </div>
                <div className="mt-5 md:mt-0 flex flex-col justify-center items-center w-full lg:w-6/12">
                    <h1 className="md:text-lg text-lg lg:text-2xl font-semibold text-gray-600 md:mt-10 text-center px-8">Berikan Pendapatmu Mengenai {Title}</h1>
                    { FormStart == 'hidden' ?
                      <button
                        onClick={(e) => handleStartForm(e)}
                        className="flex justify-center py-2 px-4 my-5 lg:w-1/4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                      >
                        Mulai Survey
                      </button>
                    :
                      <form onSubmit={storeAllResult} className="justify-items-center">
                      <div className="shadow-2xl overflow-hidden sm:rounded-lg w-10/12 mx-auto">
                          <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-1 gap-6">
                                <div className="">
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
                                      placeholder="example@jabarresearch.com"
                                  />
                                  </div>
                                  { question.map((quest) => (
                                    <div key={quest.id}>
                                      {
                                        quest.type === "polling" ? 
                                          (
                                          <div className="col-span-6">
                                          <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">
                                              {quest.content}
                                          </label>
                                          <select
                                              id={quest.id}
                                              name={quest.id}
                                              autoComplete={quest.id}
                                              onChange={e => handleChangeAnswer(quest.id, e)}
                                              required
                                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          >
                                              <option value="">Pilih Jawaban</option>
                                              {quest.insight_answers?.map( answer =>(
                                              <option key={answer.id} value={answer.id} >{answer.content}</option>
                                              ))}
                                          </select>
                                          </div>
                                          )
                                        :
                                          (
                                            <div className="col-span-6">
                                              <label htmlFor="aspirasi" className="block text-sm font-medium text-gray-700">
                                              {quest.content}
                                              </label>
                                              <textarea
                                                  id={quest.id}
                                                  name={quest.id}
                                                  rows={3}
                                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                  placeholder=""
                                                  required
                                                  value={essaycontent}
                                                  onChange={e => handleChangeEssay(quest.id, e)}
                                              />
                                            </div>
                                          )
                                      }
                                      </div>
                                  )) }
                              </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                              type="submit"
                              disabled = {btnDisable}
                              className="inline-flex justify-center py-2 px-4 w-full lg:w-1/4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
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
                          </div>
                      </div>
                      </form>
                    }
                    <h5 className="text-xs lg:text-xs font-regular text-gray-600 2xl:pb-5 mt-5 md:mt-5 w-10/12">
                        * Jabar Research adalah media independen dan yang tidak berafiliasi dengan pihak manapun, segala data yang
                        dikirimkan dan dipublikasikan adalah data sebenarnya dari audiens.  
                    </h5>
                </div>
            </div>
        </div>
        </>
  )
}

export async function getServerSideProps({params}) {
  const res = await fetch(`https://api.jabarresearch.com/api/insight/kategori/${params.slug}`)
  const dataQuestion = await res.json()

  return {
    props: {  
      dataQuestion,
    }
  }
  
}
