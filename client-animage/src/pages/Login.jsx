import { useEffect } from "react"

export default function Login() {

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
    }
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: process.env.GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
          );
        //   google.accounts.id.prompt(); // also display the One Tap dialog
    });

  return (
    <div className="font-[sans-serif]">
  <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
    <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
      <div>
        <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
          Seamless Login for Exclusive Access
        </h2>
        <p className="text-sm mt-6 text-gray-800">
          Immerse yourself in a hassle-free login journey with our intuitively
          designed login form. Effortlessly access your account.
        </p>
        <p className="text-sm mt-12 text-gray-800">
          Don't have an account{" "}
          <a
            href="javascript:void(0);"
            className="text-blue-600 font-semibold hover:underline ml-1"
          >
            Register here
          </a>
        </p>
      </div>
      <form className="max-w-md md:ml-auto w-full">
        <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Login</h3>
        <div className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required=""
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
              placeholder="Email address"
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
            />
          </div>
        </div>
        <div className="!mt-8">
          <button
            type="button"
            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Log in
          </button>
        </div>
        <div className="space-x-6 flex justify-center mt-8">
          <button type="button" id="buttonDiv" className="border-none outline-none">
          </button>
          <button type="button" className="border-none outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
              viewBox="0 0 512 512"
            >
              <path
                fill="#1877f2"
                d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z"
                data-original="#1877f2"
              />
              <path
                fill="#fff"
                d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z"
                data-original="#ffffff"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  )
}
