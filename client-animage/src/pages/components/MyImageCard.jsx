import React from 'react'

export default function MyImageCard({ myImages }) {
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
  <div className="min-h-[245px]">
    <img
      src={myImages.imgUrl}
      className="w-full rounded-lg"
      alt='card_img'
    />
  </div>
  <div className="p-6 text-left">
    <h3 className="text-xl font-bold">Name: {myImages.imgName}</h3>
    <p className="mt-3 text-sm leading-relaxed">
      Extra Prompt: {myImages.prompt ? myImages.prompt : '<You are not input any extra prompt>'}
    </p>
    <p className="mt-3 text-sm text-gray-500 leading-relaxed">
      Created At: <p className='font-bold'>{myImages.createdAt.split('T')[0]}</p>
    </p>
    <div className='flex items-center gap-2'>
        <button
        type="button"
        className="mt-6 px-5 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-teal-700"
        >
        ➤ to 📧
        </button>
        <button
        type="button"
        className="mt-6 px-5 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-orange-600 hover:bg-orange-700"
        >
        Edit
        </button>
        <button
        type="button"
        className="mt-6 px-5 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700"
        >
        Delete
        </button>

    </div>
  </div>
</div>
  )
}
