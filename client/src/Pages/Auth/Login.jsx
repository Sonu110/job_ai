import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { FaEye ,FaEyeSlash } from "react-icons/fa";
import { MyContext } from '../../context/context';

function Login() {
  
  const [hide , sethide] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setData , setPost} = useContext(MyContext)

 const navigator = useNavigate()
  const [loading , setloading] = useState(false)
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };



  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

const senddata =  async (event)=>{
  event.preventDefault();
  setloading(true)
  const formData =  new FormData()
  formData.append('username', username);
  formData.append('password', password);

  try {
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      body: new URLSearchParams( formData),
    }); 
    if (response.ok) {
      
      toast.success('successfully login')
      const data  =   await response.json()

      localStorage.setItem('token',data.user.token)
      
      
      console.log(data.user.catagory);
      if (data.user.catagory == "job_seeker") {
        setData(true);
      
        navigator('/userdashboard');
      } else {
        setPost(true);
        navigator('/companydashboard');
      }    




    } else {
      console.error('login failed');
      toast.error('successfully faild')
    }

  } catch (error) {
    
    console.log("error is ", error);
  }
  finally
  {
    setloading(false)
  }



}






  return (
    <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700 pt-10">
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src={logo}
                        alt="logo"
                      />
                     
                    </div>

                    <form  method='POST' onSubmit={senddata} >
                      <p className="mb-4">Login an account</p>
                  


                      <div className="relative mb-4">
                        <input
                          type="text"
                          className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 ${
                            username && 'filled'
                          }`}
                          id="username"
                          placeholder="Username , email , phone number"
                          value={username}
                          onChange={handleUsernameChange}
                        />
                        <label
                          htmlFor="username"
                          className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                            username && 'active-label'
                          }`}
                        >
                           email Or phone number
                        </label>
                      </div>
                      <div className="relative mb-4">
                        <div className=' flex'>

                        <input
                          type={`${hide ?'text':'password'}`}
                          className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 ${
                            password && 'filled'
                          }`}
                          id="password"
                          placeholder="passowrd"
                          
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                        <span className=' text-2xl px-7 cursor-pointer' onClick={()=> sethide(!hide)}>
{
  hide?<FaEyeSlash></FaEyeSlash>  : <FaEye></FaEye>
}
                        
                        </span>
                            </div>
                        <label
                          htmlFor="password"
                          className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                            password && 'active-label'
                          }`}
                        >
                          password
                        </label>
                      </div>

                  
                      {/* Similar inputs for phone and password */}

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                          type="submit"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                          style={{
                            background:
                              'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                          }}
                        >
                          {
                            loading ? "loading.......": "Login"
                          }
                        
                        </button>
                          <ToastContainer></ToastContainer>
                        <a href="#!">Terms and conditions</a>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 me-2">Do not Have an account?</p>
                        <Link to={'/siginup'}>

                        <button
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                          >
                          Restrations
                        </button>
                          </Link>
                      </div>
                    </form>
                  </div>
                </div>

                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                  style={{
                    background:
                      'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex
                      ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
