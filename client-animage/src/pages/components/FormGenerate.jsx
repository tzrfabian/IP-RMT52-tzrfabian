import { useState } from "react"
import { animageApi } from "../../helpers/http-client"
import { useNavigate } from "react-router-dom";
import { toast, Slide, Flip, Zoom, Bounce } from 'react-toastify';

export default function FormGenerate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imgName: '',
        prompt: ''
    });
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create form data object
        const dataForm = new FormData();
        dataForm.append('File', file);
        dataForm.append('imgName', formData.imgName);
        dataForm.append('prompt', formData.prompt);
    
        try {
          const {data} = await animageApi.post('/api/images', dataForm, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });

          console.log('Image generated successfully:', data);
          navigate('/my-images');
          toast.success('Generate Image Success!', {
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
        } catch (error) {
          console.log(err);
        }
    };

  return (
<div className="container">
    <div className="font-[sans-serif] max-w-md mx-auto">
    <p className="text-center mb-5">Generate Image</p>
    <label className="text-base text-gray-500 font-semibold mb-2 block">
        Upload file
    </label>
    <input
        type="file"
        className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
        onChange={handleFileChange}
    />
    <p className="text-xs text-gray-400 mt-2">
        Only PNG & JPG are Allowed.
    </p>
    </div>

    <div className="flex flex-col justify-center max-w-lg mx-auto px-4 space-y-6 font-[sans-serif] text-[#333] my-5">
        <div>
            <form onSubmit={handleSubmit}>
                <label className="my-2 text-base font-semibold block">Name</label>
                <input
                type="text"
                name="imgName"
                placeholder="Input your image name"
                className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                value={formData.imgName}
                onChange={handleInputChange}
                />
                <label className="my-2 text-base font-semibold block">Extra Prompt (Optional)</label>
                <input
                type="text"
                name="prompt"
                placeholder="Input extra prompt"
                className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                value={formData.prompt}
                onChange={handleInputChange}
                />
                <div className="flex justify-center my-3">
                    <button type="submit" className="px-6 py-3 rounded-md text-white bg-indigo-600 transition-all hover:bg-indigo-900">Generate</button>
                </div>
            </form>
        </div>
    </div>

    </div>
  )
}
