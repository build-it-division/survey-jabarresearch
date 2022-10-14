/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Logo from '../../assets/images/logo.png'
import Link from 'next/link'
import Router from "next/router"

interface ThemeProps {
  theme : string
}


const navigation2 = [
  { name: 'Beranda', href: '/ ', current: false},
  { name: 'Berita', href: 'https://jabarresearch.com', current: false },
]

const navigation = [
  { name: 'Beranda', href: '/ ', current: false},
  { name: 'Berita', href: 'https://jabarresearch.com', current: false },
  { name: 'Kategori : ', href: '#', current: false},
  { name: 'Infrastruktur', href: '/aspirasi/infrastruktur', current: false },
  { name: 'Kesehatan', href: '/aspirasi/kesehatan', current: false },
  { name: 'Pendidikan', href: '/aspirasi/pendidikan', current: false },
  { name: '2024 : ', href: '#', current: false},
  { name: 'Partai Politik', href: '/2024/parpol', current: false },
  { name: 'Calon Presiden', href: '/2024/capres', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar(props : ThemeProps) {

  const {theme} = props;
  const [dataInsight, setDataInsight] = useState({
    data : []
  });

    useEffect(() => {
      fetch(`https://api.jabarresearch.com/api/insight`)
        .then((res) => res.json())
        .then((dataInsight) => {
          setDataInsight(dataInsight)
        })
    }, [])

    const handleInsight = (slug, e) => {
      Router.push("/insight/"+slug).then(() => Router.reload());
    }

  console.log(dataInsight.data[0])

  return (
    <Disclosure as="nav" className="bg-transparent -mb-20">
      {({ open }) => (
        <>
          <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto px-2 sm:px-6 lg:px-8 py-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex-shrink-0 flex items-center">
                  {/*<h1 className="text-white lg:text-xl font-bold">Jabar Research.</h1>*/}
                  <Image src={Logo} width={150} height={50} alt="image"/>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation2.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : `${theme} hover:bg-gray-700 hover:text-white`,
                          'px-3 py-2 rounded-md text-md font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className={classNames(` ${theme} hover:bg-gray-700 hover:text-white`,`block px-3 py-2 rounded-md text-md font-medium`)}>
                          Kategori
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 px-4 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/aspirasi/infrastruktur"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                <a className="hover:text-gray-400">Infrastruktur</a>
                              </Link>
                            )}
                          </Menu.Item>
                          <br/>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/aspirasi/ekonomi"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                <a className="hover:text-gray-400">Ekonomi</a>
                              </Link>
                            )}
                          </Menu.Item>
                          <br/>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/aspirasi/pendidikan"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                <a className="hover:text-gray-400">Pendidikan</a>
                              </Link>
                            )}
                          </Menu.Item>
                          <br/>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/aspirasi/kesehatan"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                <a className="hover:text-gray-400">Kesehatan</a>
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className={classNames(` ${theme} hover:bg-gray-700 hover:text-white`,`block px-3 py-2 rounded-md text-md font-medium`)}>
                          2024
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 px-4 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/2024/parpol"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                <a className="hover:text-gray-400">Partai Politik</a>
                              </Link>
                            )}
                          </Menu.Item>
                          <br/>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/2024/capres"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                <a className="hover:text-gray-400">Calon Presiden</a>
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className={classNames(` ${theme} hover:bg-gray-700 hover:text-white`,`block px-3 py-2 rounded-md text-md font-medium`)}>
                          Insight
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 px-4 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {dataInsight.data.map((insight) => (
                          <a key={insight.id}>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick = {(e) => handleInsight(insight.slug, e)}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  <a className="hover:text-gray-400" href="#">{insight.title}</a>
                                </a>
                              )}
                            </Menu.Item>
                          </a>
                        ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-2 h-[450px]">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
