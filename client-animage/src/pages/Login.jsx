import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { animageApi } from "../helpers/http-client";
import { toast, Slide, Flip, Zoom, Bounce } from 'react-toastify';

export default function Login() {

  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await animageApi.post('/api/login', dataForm);
      localStorage.setItem("access_token", response.data.access_token);
      console.log(response.data, '<< login');
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
      console.log(data, '<< login');
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
        <img className="w-auto" src="https://cdn.discordapp.com/attachments/1226840467929305120/1281125007119880253/ANIMAGE_Transparent.png?ex=66da9423&is=66d942a3&hm=1dbf6388a8c6d9c4aa7fe0f2285521dd42cdc3d0d41564ffdc570a5c057da27e&" alt="img" />
        <h2 className="lg:text-4xl font-extrabold lg:leading-[55px] text-gray-800">
        Login to Gain an Access
        </h2>
        <p className="text-sm mt-6 text-gray-800">
          Immerse yourself in a hassle-free login journey with our intuitively
          designed login form. Effortlessly access your account.
        </p>
        <div className="flex items-center">
          <p className="text-sm mt-12 text-gray-800">
            Don't have an account?{" "}
          </p>
          <Link to={'/register'}>
            <p
              className="mt-12 text-blue-600 font-semibold hover:underline ml-1"
            >
              Register here
            </p>
          </Link>
        </div>
      </div>
      <form onSubmit={handleLogin} className="max-w-md md:ml-auto w-full">
        <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Login</h3>
        <div className="space-y-4">
          <div>
            <input
              name="email"
              type="text"
              autoComplete="email"
              required=""
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
              required=""
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
            Log in
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
