
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  

import logo from '../../assets/images/logo.png'
  import { FaEye ,FaEyeSlash } from "react-icons/fa";
function Signup() {
  const [hide , sethide] = useState(false)
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const [catagory, setcatagory] = useState('')
  const [file, setfile]=useState(null)
  const [loading , setloading] = useState(false)
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePhoneChange = (event) => {
    const input = event.target.value;
    if (input.length <= 10) {
      setPhone(input);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true)
    if (phone.length !== 10) {
      toast.error('Phone number should be exactly 10 digits.');
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('catagory', catagory);
    
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('file', file);


    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        body:formData,
      });
      if (response.ok) {
        console.log('Registration successful');
        toast.success('successfully register')
      } else {
        console.error('Registration failed');
        toast.error('successfully faild')
      }
    } catch (error) {
      toast.error('successfully faild')
      console.error('Error during registration:', error);
    }
    finally
    {
      
      setloading(false)
    }
  };




  return (
    <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10  pt-24">
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

                    <form onSubmit={handleSubmit} method='POST'encType="multipart/form-data" >
                      <p className="mb-4">Please register an account</p>
                      <label htmlFor="catagory" >Select  catagory</label>
                    <div className="relative mb-4 bg-white-200 border border-solid border-red-100 rounded-md">
                  


                    <select name="catagory" id="catagroy" className=' w-full p-2' required onChange={(e)=>setcatagory(e.target.value)}>
                    <option value="" selected>selected</option>
                    <option value="job_seeker">Job seeker</option>
                    <option value="job_giver">job giver</option>
                      

                    </select>
                    </div>


                      <div className="relative mb-4">
                        <input
                          type="text"
                          className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 ${
                            username && 'filled'
                          }`}
                          id="username"
                          placeholder="Username"
                          value={username}
                          onChange={handleUsernameChange}
                          required
                        />
                        <label
                          htmlFor="username"
                          className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                            username && 'active-label'
                          }`}
                        >
                          Username
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

                      <div className="relative mb-4">
                        <input
                          type="email"
                          className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 ${
                            email && 'filled'
                          }`}
                          id="email"
                          placeholder="email"
                          value={email}
                          onChange={(e)=> setemail(e.target.value)}
                          required
                        />
                        <label
                          htmlFor="email"
                          className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                            email && 'active-label'
                          }`}
                        >
                          email
                        </label>
                      </div>


                      <div className="relative mb-4">
                        <input
                          type="number"
                          className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 ${
                            phone && 'filled'
                          }`}
                          id="phone"
                          placeholder="phone number"
                          value={phone}
                          onChange={handlePhoneChange}
                          required
                        />
                        <label
                          htmlFor="phone"
                          className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                            phone && 'active-label'
                          }`}
                        >
                          phone
                        </label>
                      </div>
                      <div className="relative mb-4 flex flex-col ">
    <label htmlFor="file" className="cursor-pointer mb-2 text-red-500">Upload photo</label>
    <input
    type="file"
    id="file"
    name="file" // Ensure this is set to "file"
    accept="image/*"
    onChange={(e) => setfile(e.target.files[0])}
    required
/>
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
                            loading ? 'Register....':'Register'
                          }
                        </button>
                     
        <ToastContainer />
                        <a href="#!">Terms and conditions</a>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 me-2">Have an account?</p>
                        <Link to={'/login'}>
                        <button
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                          >
                          Login
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

export default Signup;
