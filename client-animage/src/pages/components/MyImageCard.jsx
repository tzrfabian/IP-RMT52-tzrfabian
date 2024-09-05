import React from 'react'
import { animageApi } from '../../helpers/http-client';
import { useDispatch } from 'react-redux';
import { fetchMyImages } from '../../redux/slices/myImageSlices';
import Swal from 'sweetalert2';
import { toast, Slide, Flip, Zoom, Bounce } from 'react-toastify';


export default function MyImageCard({ images }) {
  const dispatch = useDispatch();
  const handleDeleteById = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
      if(result.isConfirmed) {
        const { data } = await animageApi.delete(`/api/images/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      console.log(data);
      dispatch(fetchMyImages());
      toast.success('Delete images success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
  <div className="min-h-[245px]">
    <img
      src={images.imgUrl}
      className="w-full rounded-lg"
      alt='card_img'
    />
  </div>
  <div className="p-6 text-left">
    <h3 className="text-xl font-bold">Name: {images.imgName}</h3>
    <p className="mt-3 text-sm leading-relaxed">
      Extra Prompt: {images.prompt ? images.prompt : '<You are not input any extra prompt>'}
    </p>
    <p className="mt-3 text-sm text-gray-500 leading-relaxed">
      Created At: {images.createdAt.split('T')[0]}
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
        onClick={() => handleDeleteById(images.id)}
        className="mt-6 px-5 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-red-700"
        >
        Delete
        </button>

    </div>
  </div>
</div>
  )
}
