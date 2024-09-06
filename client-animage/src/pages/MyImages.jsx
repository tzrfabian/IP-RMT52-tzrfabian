import { useEffect, useState } from 'react'
import { animageApi } from '../helpers/http-client';
import MyImageCard from './components/MyImageCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyImages } from '../redux/slices/myImageSlices';

export default function MyImages() {
    const dispatch = useDispatch();
    const images = useSelector((state) => state.images.list);

    useEffect(() => {
        dispatch(fetchMyImages());
    }, [dispatch]);

  return (
    <div className='relative mb-7'>
        <div className='flex justify-center mt-12'>
            <p className='text-2xl font-semibold'>My Images Result</p>
        </div>
        <div className='flex flex-wrap gap-3 mt-5'>
            {images.map((image) => {
                return <MyImageCard
                    images={image}
                    key={image.id}
                />
            })}
        </div>
    </div>
  )
}
