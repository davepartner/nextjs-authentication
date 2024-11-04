import {useState} from 'react';
import {router } from 'next/router'
import { Input } from 'shadcn-ui'
import { Button } from 'shadcn-ui'
/**
 * Component for the user registration from
 * Handle form inpute, send data to API and handle response
 */

//daveozoalor@gmail.com (CTO)
//udemy.com/user/davepartner 

export default function Login() {
    //set up state to hold theemail and password inputes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //handle form submission to register a new user
    const handleRegister = async (e) => {
        e.preventDefault(); //prevent default form submission

        //send the registeration data to the register API
        const res = await fetch('/api/auth/login', {
            method: 'POST', //define the request method
            headers: {
                'Content-Type': 'application/json' //specify JSON content type
            },
            body: JSON.stringify({ //send the email and password as JSON
                email,
                password
            })
        });

        //parse the response from the server
        const data = await res.json();
        if (res.ok){
            //login successful
            setMessage(data.message)
            router.push('/dashboard'); //redirect to login if authenticated

        }else{
            setMessage(data.error || 'Login failed')
        }
       // alert(data.message || data.error); //display the response
    };

    return(
        <div className="max-w-md mx-auto mt-20 p-8 border round-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>
        <form onSubmit={handleRegister} className="space-y-6">
            {/* Input field for email */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email"
             placeholder="Email" 
             value={email} //bind the email state
             onChange={(e) => setEmail(e.target.value)} //update email state on change
              />
              </div>
            {/* Input field for password */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
           
            <Input
            type="password"
            placeholder="password"
            value={password} //binding to the password state
            onChange={(e) => setPassword(e.target.value)} //update password state on change
            />
            </div>
            {/* Submit button to login */}

            <Button type="submit" className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600">Register</Button>
            {/* Display success or error mesaage */}
            {message && <p>{message}</p>}

        </form>

        </div>
    )
}