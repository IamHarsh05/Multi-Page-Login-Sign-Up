import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response) {
        toast.success(response.data.msg, {
          onClose: () => {
            if (user && !user.emailVerified) {
              navigate("/verification-mail-sent");
            } else {
              navigate("/");
            }
          },
        });
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <section className="h-screen bg-white">
      <div className="container h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-black dark:text-black">
          <div className="w-full">
            <div className="g-0  h-screen lg:flex lg:flex-wrap">
              {/* <!-- Left column container with background and description--> */}
              <div
                className="flex items-center rounded-b-lg lg:w-2/5 lg:rounded-r-lg lg:rounded-bl-none"
                style={{
                  background: "url(./13824.jpg)",
                  backgroundPosition: "left",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "rgba(255, 255, 255)",
                }}
              ></div>

              {/* <!-- Right column container--> */}
              <div className="px-12 md:px-10 lg:w-3/5">
                <div className="md:mx-6 md:px-28">
                  {/* <!--Logo--> */}
                  <div className="text-center">
                    <img
                      className="mx-auto w-48"
                      src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      alt="logo"
                    />
                    <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                      Log In to Dribbble
                    </h4>
                  </div>

                  <form onSubmit={onSubmit}>
                    <p className="mb-4">Log in with Your Details</p>

                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        autoComplete="on"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* <!--Password input--> */}
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="6+ characters"
                        name="password"
                        value={password}
                        onChange={onChange}
                        autoComplete="on"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        minLength={6}
                      />
                    </div>

                    {/* <!--Submit button--> */}
                    <div className="mb-12 pb-1 pt-1 text-center">
                      <div className="w-full">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                        >
                          Log In
                        </button>
                      </div>

                      {/* <!--Forgot password link--> */}
                      <a href="#!">Forgot password?</a>
                    </div>

                    {/* <!--Register button--> */}
                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2">Don't have an account?</p>
                      <Link to={"/register"}>
                        <div>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-black hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-black dark:hover:bg-opacity-10"
                          >
                            Register
                          </button>
                        </div>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default Login;
