import { useEffect, useState } from 'react'
import { animageApi } from '../helpers/http-client';
import MyImageCard from './components/MyImageCard';

export default function MyImages() {
    const[myImages, setMyImages] = useState([]);
    const fetchMyImages = async () => {
        try {
            const {data} = await animageApi.get('/api/my-images', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            console.log(data);
            setMyImages(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchMyImages();
    }, [])

  return (
    <div className='relative mb-7'>
        <div className='flex justify-center mt-12'>
            <p className='text-2xl font-semibold'>My Images Result</p>
        </div>
        <div className='flex flex-wrap gap-3 mt-5'>
            {myImages.map((myImage) => {
                return <MyImageCard
                    myImages={myImage}
                    key={myImage.id}
                />
            })}
        </div>
    </div>
  )
}
