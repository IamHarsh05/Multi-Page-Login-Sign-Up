import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const auth = localStorage.getItem("isAuthenticated");

  const [formData, setFormData] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    password: user ? user.password : "",
  });

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (auth !== null) localStorage.setItem("isAuthenticated", false);
    const updatedUser = { ...user, [e.target.name]: e.target.value };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("isAuthenticated", true);
      const response = await register(username, email, password);
      console.log(response);
      if (response && response.msg === "User already exists") {
        toast.error(response.msg);
        navigate("/register");
      } else {
        toast.success(response.msg);
        // Store user details in local storage
        localStorage.setItem(
          "user",
          JSON.stringify({ ...formData, emailVerified: false })
        );
        navigate("/profile-edit");
      }
    } catch (error) {
      navigate("/register");
      toast.error(error);
      // Handle error here, such as displaying an error message to the user
    }
  };

  return (
    <>
      <section className="h-screen bg-white">
        <div className="container h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-black dark:text-black">
            <div className="w-full">
              <div className="g-0  h-full lg:flex lg:flex-wrap">
                {/* <!-- Left column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-2/5 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background: "url(./13824.jpg)",
                    backgroundPosition: "left",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
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
                        Sign up to Dribbble
                      </h4>
                    </div>

                    <form onSubmit={onSubmit}>
                      <p className="mb-4">Please Fill Your Details</p>
                      {/* <!--Username input--> */}
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Username
                        </label>
                        <input
                          id="username"
                          type="text"
                          placeholder="Username"
                          name="username"
                          value={username}
                          onChange={onChange}
                          autoComplete="on"
                          required
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

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

                      {auth ? (
                        <Link to={"/profile-edit"}>
                          {/* <!--Submit button--> */}
                          <div className="mb-12 pb-1 pt-1 text-center">
                            <div className="w-full">
                              <button
                                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                style={{
                                  background:
                                    "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                }}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <>
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
                                Create Account
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {/* <!--login button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Already have an account?</p>
                        <Link to={"/login"}>
                          <div>
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-black hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-black dark:hover:bg-opacity-10"
                            >
                              Log In
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
      </section>
    </>
  );
};

export default Register;
