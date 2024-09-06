import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <>
  <div className="relative">
    <div className="px-4 sm:px-10">
      <div className="mt-16 max-w-4xl mx-auto text-center relative z-10">
        <div className='flex justify-center'>
          <img className='mx-auto' src='../src/assets/ANIMAGE_Transparent.png'/>
        </div>
        <h1 className="md:text-6xl text-4xl font-extrabold mb-6 md:!leading-[75px]">
          Welcome to Animage
        </h1>
        <p className="text-base">
          Animage is a cutting-edge online platform that leverages artificial intelligence to transform your ordinary images into stunning anime-style artwork. With just a few clicks, you can turn your photos, illustrations, or even digital paintings into captivating anime characters.
        </p>
        <div className="mt-10">
          <Link to={'/generate-image'}>
            <button className="px-6 py-3 rounded-xl text-white bg-indigo-600 transition-all hover:bg-indigo-900">
              Try it Now!
            </button>
          </Link>
        </div>
      </div>
      <hr className="my-10 border-gray-300" />
      <p className='text-center text-4xl font-bold mb-6 md:!leading-[75px]'>Example Result</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
        <img
          src="https://i.imgur.com/UfWJPlT.jpeg"
          className="w-56 rounded mx-auto"
          alt="google-logo"
        />
        <img
          src="https://i.imgur.com/pDJm1Ru.jpeg"
          className="w-56 rounded mx-auto"
          alt="facebook-logo"
        />
        <img
          src="https://i.imgur.com/5tM6beP.jpeg"
          className="w-56 rounded mx-auto"
          alt="linkedin-logo"
        />
        <img
          src="https://i.imgur.com/A7d0qKX.jpeg"
          className="w-56 rounded mx-auto"
          alt="pinterest-logo"
        />
      </div>
    </div>
    <img
      src="https://readymadeui.com/bg-effect.svg"
      className="absolute inset-0 w-full h-full"
    />
  </div>
  <div className="px-4 sm:px-10">
    <div className="mt-32 max-w-7xl mx-auto">
      <div className="mb-16 max-w-2xl text-center mx-auto">
        <h2 className="md:text-4xl text-3xl font-extrabold mb-6">
          Our Features
        </h2>
        <p className="mt-6">
        Here are some of the features we provide.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-8">
        <div className="sm:p-6 p-4 flex bg-white rounded-md border shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-12 h-12 mr-6 bg-blue-50 p-3 rounded-md shrink-0"
            viewBox="0 0 32 32"
          >
            <path
              d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z"
              data-original="#000000"
            />
            <path
              d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"
              data-original="#000000"
            />
          </svg>
          <div>
            <h3 className="text-xl font-semibold mb-2">Image Generator</h3>
            <p>
              An AI will process your image, changing into Anime Style
            </p>
          </div>
        </div>
        <div className="sm:p-6 p-4 flex bg-white rounded-md border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-12 h-12 mr-6 bg-blue-50 p-3 rounded-md shrink-0"
          viewBox="0 0 24 24"
          >
          <path
            d="M12 3v10.586l3.707-3.707 1.414 1.414-6 6-6-6 1.414-1.414L11 13.586V3h1zM5 19h14v2H5v-2z"
          />
        </svg>

          <div>
            <h3 className="text-xl font-semibold mb-2">Upload to Cloud</h3>
            <p>Your images were saved in cloud</p>
          </div>
        </div>
        <div className="sm:p-6 p-4 flex bg-white rounded-md border">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-12 h-12 mr-6 bg-blue-50 p-3 rounded-md shrink-0"
            viewBox="0 0 24 24"
            >
            <path
            d="M20 4H4C2.895 4 2 4.895 2 6v12c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2V6c0-1.105-.895-2-2-2zM4 6h16v.511L12 11.511 4 6.511V6zm0 12V8.511l7.292 4.878a1 1 0 0 0 1.416 0L20 8.511V18H4z"
            />
            </svg>

          <div>
            <h3 className="text-xl font-semibold mb-2">Mail</h3>
            <p>
              You can send your generated image to your E-mail
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer className=" px-4 sm:px-10 py-12 mt-32 ">
  <hr className='border-gray-300 bg-slate-100' />
  <div className="flex justify-center mt-5">
    <p className="text-center">
      Animage @
      <a
        href="https://readymadeui.com/"
        target="_blank"
        className="hover:underline mx-1"
      >
        2024
      </a>
      All Rights Reserved.
    </p>
  </div>
</footer>
</>

  )
}