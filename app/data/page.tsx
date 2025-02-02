"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../utils/constants'
import { logOut } from '@/actions/auth'

const Page = () => {
    const [error, setError] = useState<null|string>(null);
    const [isVerified, setIsVerified] = useState(false);
  
    useEffect(() => {
        // Get the token from cookies
    
            axios.post(`${API}/auth/verify`, { token:null }, { withCredentials: true })
                .then((response) => {
                    console.log(response.data);
                    setIsVerified(true);
                    // You can also do something with the response, like setting user data
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.response?.data?.message || "Something went wrong");
                    setIsVerified(false);
                });
        
    }, []); // Empty array to ensure the effect runs only once on mount

    return (
        <div>
          <form
               action={logOut}
             >
               <button type="submit">Sign Out</button>
             </form>
        </div>
    );
};

export default Page;
