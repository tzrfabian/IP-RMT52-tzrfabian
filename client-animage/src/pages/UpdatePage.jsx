import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { animageApi } from '../helpers/http-client';
import { toast, Slide, Flip, Zoom, Bounce } from 'react-toastify';

export default function UpdatePage() {
  const { id } = useParams();
  console.log(id, '< id');
  const [image, setImage] = useState({});
  const fetchImageById = async () => {
    try {
      const {data} = await animageApi.get(`/api/images/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      console.log(data);
      setImage(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchImageById();
  }, [id]);

  const navigate = useNavigate();
  const [imgName, setImgName] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await animageApi.put(`/api/images/edit/${id}`, {imgName}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      console.log(response);
      navigate('/my-images');
      toast.success('Update Image Name Success!', {
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
    <div className='relative py-5'>
      <p className='text-center text-xl font-bold'>Update Image Detail</p>
      <div className='relative flex flex-col items-center mt-5'>
        <img className='max-w-sm rounded' src={image.data?.imgUrl} alt={image.data?.imgName}/>
        <p className='font-semibold'>ImgName: {image.data?.imgName}</p>
      </div>
      <div className='flex justify-center mt-5'>
          <form onSubmit={handleUpdate}>
            <input 
              type='text'
              className='px-4 py-2 rounded bg-white border border-gray-400 w-full outline-blue-500'
              value={imgName}
              placeholder='Input new ImgName'
              onChange={(e) => setImgName(e.target.value)}
            />
            <div className='flex justify-center mt-2'>
              <button type='submit' className='px-6 py-3 rounded-md text-white bg-indigo-600 transition-all hover:bg-indigo-900'>Update</button>
            </div>
          </form>
      </div>
    </div>
  )
}
