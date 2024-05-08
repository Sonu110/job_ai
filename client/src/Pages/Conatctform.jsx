import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../context/context';

function Conatctform() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const senddata = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/email`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        toast.success('Message sent successfully');
      } else {
        console.error('Failed to send message');
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error('An error occurred while sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="gradient-form h-full flex  items-center justify-center  dark:bg-neutral-700 pt-10  min-h-screen">
    <div className="container h-full p-10  ">
      <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
        <div className="w-full">
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div className="g-0 lg:flex lg:flex-wrap">
            <div
                className="flex  hidden sm:block items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                style={{
                  background:
                    ' linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1)  100%)',
                }}
              >
                <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                <h4 className="mb-6 text-xl font-semibold">
  Welcome  to Our Job Portal contact page
</h4>
<p className="mb-4 text-sm">
Connect with us to explore new opportunities and career advancements. By reaching out, you can seamlessly communicate your inquiries, feedback, or collaboration interests. We value your engagement and aim to provide prompt and personalized responses to address your needs effectively. Stay informed about the latest updates, job openings, and industry insights by staying connected with us. 
</p>
                </div>
              </div>

              
              <div className="px-4 md:px-0 lg:w-6/12">
                <div className="md:mx-6 md:p-12 p-10">
                  

                  <form  method='POST' onSubmit={senddata} >
                    <p className="mb-4">Contact us  </p>
                


                    <div className="relative mb-4">
                      <input
                        type="text"
                        className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 ${
                          name && 'filled'
                        }`}
                        id="name"
                        placeholder="name , email , phone number"
                        value={name}
                        onChange={handleNameChange}
                      />
                      <label
                        htmlFor="name"
                        className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                          name && 'active-label'
                        }`}
                      >
                       Email
                      </label>
                    </div>
                    <div className="relative mb-4">
                      <input
                        type="text"
                        className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 ${
                          email && 'filled'
                        }`}
                        id="email"
                        placeholder="email , email , phone number"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <label
                        htmlFor="email"
                        className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                          email && 'active-label'
                        }`}
                      >
                         phone number
                      </label>
                    </div>





                    <div className="relative mb-4">
                      <div className=' flex'>

                      <textarea
                        className={`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0 ${
                          message && 'filled'
                        }`}
                        id="message"
                        placeholder="massage"
                        
                        value={message}
                        onChange={handleMessageChange}
                        required
                      />
                   
                          </div>
                      <label
                        htmlFor="message"
                        className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                          message && 'active-label'
                        }`}
                      >
                        Massage
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
                            'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1)  100%)',
                        }}
                      >
                        {
                          loading ? "contacting.......": "Contact  us"
                        }
                      
                      </button>
                        <ToastContainer></ToastContainer>
                    
                    </div>

                  
                  </form>
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

export default Conatctform;
