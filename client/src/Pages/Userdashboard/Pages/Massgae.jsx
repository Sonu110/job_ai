import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../../context/context';
import { Link, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Selecton from '../../../components/Selecton';
import { FaArrowLeft } from 'react-icons/fa';

function Massgae() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [recived , setrecived] = useState([]);
    const [chatuserdata , setchatuser] = useState([]);
    const [massageuserdata, setmassageuserdata] = useState([]);
    const [Loading,setLoading] = useState(true);
    const {userdata} = useContext(MyContext);
    const [socket, setSocket] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const {id} = useParams();
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [size, setSize] = useState(false);

    console.log("the received message", recived);

    useEffect(() => {
        const socket = io('http://localhost:3000');
        setSocket(socket);
        // Connect to the socket server
        socket.on('connect', () => {
            console.log('Connected with socket ID:', socket.id);
        });
    
        socket.emit('joinnewchatroom', { userId: userdata.data?._id });
    
        socket.on('message', (text) => { // Listen for 'messages' event
            console.log('Message received:', text);
            // Update received messages
            setrecived((prevMessages) => [...prevMessages, text]);
        });
        socket.on('typing', (isTyping) => { // Listen for typing event
         
          setIsTyping(isTyping);
      });
    
        // Clean up function
        return () => {
            socket.disconnect();
        };
    }, [massageuserdata]);

    useEffect(() => {
        const profile = async () => {
            const token = localStorage.getItem('token');
    
            if (token) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/chatuserdata/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        
                        setchatuser(data.data);
                    }
                } catch (error) {
                    console.log('error is ', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
    
        profile();
    }, [id]);

    const fetchUserData = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            setShowMessageBox(true);

            if (token) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/massageuserdata/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setmassageuserdata(data.data);
                }
            }
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };


    useEffect(() => {
      // Function to handle resizing of the window
      const handleResize = () => {
          if (window.innerWidth <= 1000) {
              setSize(true); // Set size to true if window width is 700px or less
             
          } else {
              setSize(false); // Set size to false otherwise
          }
      };

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Initial check for window size
      handleResize();

      // Clean up function to remove event listener on component unmount
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        socket.emit('typing', { roomId: massageuserdata?._id, isTyping: true });
    };
  
    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            sendMessage();
        }
    };
  
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
  
    const sendMessage = () => {
        // Create a new message object
        const currentTime = new Date();
        const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

        const newMessage = {
            text: inputValue,
            sender: 'user', // Assuming the user is sending the message
            timestamp: formattedTime,
        };
        socket.emit('message', { recipientId: massageuserdata?._id, text: inputValue, timestamp: formattedTime }); // Emit message
        socket.emit('typing', { roomId: massageuserdata?._id, isTyping: false }); // Emit message
      
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputValue('');
    };

    const allMessages = [...recived, ...messages];

    // Convert timestamps to milliseconds since the epoch
    allMessages.forEach(message => {
        const [hours, minutes, seconds] = message.timestamp.split(':');
        const timestampInMilliseconds = new Date(2000, 0, 1, hours, minutes, seconds).getTime();
        console.log("time so", timestampInMilliseconds);
        message.timestampMilliseconds = timestampInMilliseconds;
    });
    
    // Sort messages based on timestamp in milliseconds
    allMessages.sort((a, b) => a.timestampMilliseconds - b.timestampMilliseconds);
    
    // Remove the temporary timestampMilliseconds property
    allMessages.forEach(message => delete message.timestampMilliseconds);


    const handleBackButtonClick = () => {
      setShowMessageBox(false); // Set showMessageBox state to false when back button is clicked
      history.goBack(); // Go back to the previous page
  };

    return (
        <div>
            <div className='mt-24'>
                <div className="w-full" style={{ backgroundColor: '#fff' }}></div>
                <div className="container mx-auto">
                    <div className="h-[80vh]">
                        <div className="flex border border-grey rounded shadow-lg h-full">
                            <div className={`w-full md:w-1/3 border flex flex-col ${showMessageBox && size ? 'hidden' : 'block'}`}>
                                <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                                    <div>
                                        <img className="w-10 h-10 rounded-full" src={`${import.meta.env.VITE_API_URL}/${userdata.data?.file}`} alt="User"/>
                                    </div>
                                </div>
                                <div className="py-2 px-2 bg-grey-lightest">
                                    <input type="text" className="w-full px-2 py-2 text-sm" placeholder="Search or start new chat"/>
                                </div>
                                <div className="bg-gray-100 flex-1 overflow-auto gap-2">
                                    {Loading ? <Selecton /> : (
                                        chatuserdata.map((i) => (
                                            <div onClick={() => fetchUserData(i?._id)} key={i._id} className="px-3 bg-blue-200 mt-1 flex items-center bg-grey-light cursor-pointer">
                                                <div>
                                                    <img className="h-12 w-12 rounded-full" src={`${import.meta.env.VITE_API_URL}/${i?.file}`} alt="User"/>
                                                </div>
                                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                    <div className="flex items-bottom justify-between">
                                                        <p className="text-grey-darkest">
                                                            {i?.username}
                                                        </p>
                                                        <p className="text-xs text-grey-darkest">
                                                            12:45 pm
                                                        </p>
                                                    </div>
                                                    <p className="text-grey-dark mt-1 flex justify-between text-sm">
                                                        last massage 
                                                        <span className='p-1 px-3 rounded-full bg-red-600 text-white text-sm'>1</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            {massageuserdata.length <= 0 ? (
                                <div className='flex items-center justify-center w-full'>
                                    <div className='bg-white shadow-2xl flex p-5 items-center gap-5 px-10'>
                                        <div>
                                            <img className="w-10 h-10 rounded-full" src={`${import.meta.env.VITE_API_URL}/${userdata.data?.file}`} alt="User"/>
                                        </div>
                                        <div className="text">
                                            Hello {userdata.data?.username}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={`w-full md:w-2/3 border flex flex-col ${showMessageBox? 'flex' : 'hidden'} `}  style={{ flexDirection: 'column', flexGrow: 1 }}>
                                    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                                        <div className="flex items-center">
                                            <span className='m-2 mr-10 cursor-pointer' onClick={() => setShowMessageBox(!showMessageBox)}><FaArrowLeft /></span>
                                            <div>
                                                <img className="w-10 h-10 rounded-full"  src={`${import.meta.env.VITE_API_URL}/${massageuserdata?.file}`} alt="User"/>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-grey-darkest">
                                                    {massageuserdata?.username}
                                                </p>
                                                <p className="text-grey-darker text-xs mt-1">
                                                    Live
                                                    <span className='ml-3 p-[0.005rem] px-[0.5rem] rounded-full bg-green-600'></span>
                                                    {isTyping && <span> typing.......</span>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-auto" style={{ backgroundColor: '#DAD3CC' }}>
                                        <div className="py-2 px-3">
                                            <div className="flex justify-center mb-2">
                                                <div className="rounded py-2 px-4" style={{ backgroundColor: '#DAD3CC' }}>
                                                    <p className="text-sm uppercase">
                                                        February 20, 2018
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-center mb-4">
                                                <div className="rounded py-2 px-4" style={{ backgroundColor: '#FCF4CB' }}>
                                                    <p className="text-xs">
                                                        Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                {allMessages.map((message, index) => (
                                                    <div key={index} className={`flex justify-${message.sender === 'user' ? 'end' : 'start'} mb-2`}>
                                                        <div className="text-wrap max-w-xs rounded py-2 px-3 break-words" style={{ backgroundColor: message.sender === 'user' ? '#E2F7CB' : '#F2F2F2' }}>
                                                            <p className="text-sm mt-1">{message.text}</p>
                                                            <p className="text-xs text-grey-dark">{message.timestamp}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-grey-lighter px-4 py-4 flex items-center justify-between">
                                        <div className='w-full'>
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                onKeyPress={handleKeyPress}
                                                className='w-full bg-gray-100 p-2'
                                                placeholder='Enter the message'
                                            />
                                        </div>      
                                        <button onClick={handleSendMessage} className='bg-blue-400 w-40 p-2'>Send</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Massgae;
