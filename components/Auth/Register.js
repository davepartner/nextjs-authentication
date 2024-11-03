import {useState} from 'react';


/**
 * Component for the user registration from
 * Handle form inpute, send data to API and handle response
 */

//daveozoalor@gmail.com (CTO)
//udemy.com/user/davepartner 

export default function Register() {
    //set up state to hold theemail and password inputes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    //handle form submission to register a new user
    const handleRegister = async (e) => {
        e.preventDefault(); //prevent default form submission

        try{
        //send the registeration data to the register API
        const res = await fetch('/api/auth/register', {
            method: 'POST', //define the request method
            headers: {
                'Content-Type': 'application/json' //specify JSON content type
            },
            body: JSON.stringify({ //send the email and password as JSON
                email,
                password
            }),
        });

        //parse the response from the server
        const data = await res.json();
        if (res.ok){
            setMessage(data.message)
        }else{
            setMessage(data.error || 'Registration failed')
        }
       // alert(data.message); //display the response
    }catch (error){
        setMessage('An error occured, please try again');
        console.error('registration failed', error);
    }
    };

    return(
        <form onSubmit={handleRegister}>
            {/* Input field for email */}
            <label>Email</label>
            <input type="email"
             placeholder="Email" 
             value={email} //bind the email state
             onChange={(e) => setEmail(e.target.value)} //update email state on change
              />
            {/* Input field for password */}
            <input
            type="password"
            placeholder="password"
            value={password} //binding to the password state
            onChange={(e) => setPassword(e.target.value)} //update password state on change
            />

            {/* Submit button */}
            <button type="submit">Register</button>
            {message && <p>{message}</p>}

        </form>
    )
}