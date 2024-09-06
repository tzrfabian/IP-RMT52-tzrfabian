import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { animageApi } from "../helpers/http-client";
import { toast, Slide, Flip, Zoom, Bounce } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await animageApi.post('/api/register', dataForm);
      console.log(response.data, '<< register');
      navigate('/login');
      toast.success('Register Success!', {
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

  const handleOnChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  }

  async function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      const {data} = await animageApi.post('/api/login/google', {
        googleToken: response.credential
      });
      localStorage.setItem("access_token", data.access_token);
      console.log(data, '<< login google');
      navigate('/');
      toast.success('Login Success!', {
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
  useEffect(() => {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" }  // customization attributes
        );
      //   google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
    
  return (
    <div className="font-[sans-serif]">
  <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
    <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
      <div>
        <img className="w-auto" src="https://i.imgur.com/4AmAvNJ.png" alt="img" />
        <h2 className="lg:text-4xl font-extrabold lg:leading-[55px] text-gray-800">
          Register Your Account Here
        </h2>
        <div className="flex items-center">
          <p className="text-sm mt-12 text-gray-800">
            Do you have an account?{" "}
          </p>
          <Link to={'/login'}>
            <p
                className="text-blue-600 mt-12 font-semibold hover:underline ml-1"
            >
                Login here
            </p>
          </Link>
        </div>
      </div>
      <form onSubmit={handleRegister} className="max-w-md md:ml-auto w-full">
        <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Register</h3>
        <div className="space-y-4">
          <div>
            <input
              name="username"
              type="text"
              autoComplete="username"
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
              placeholder="Username"
              value={dataForm.username}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <input
              name="email"
              type="text"
              autoComplete="email"
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
              placeholder="Email address"
              value={dataForm.email}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
              placeholder="Password"
              value={dataForm.password}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="!mt-8">
          <button
            type="submit"
            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Register Now
          </button>
        </div>
        <div className="space-x-6 flex justify-center mt-8">
          <button type="button" id="buttonDiv" className="border-none outline-none">
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}
