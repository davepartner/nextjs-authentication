import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

/**
 * Dashboard page
 * - fetch user data from the dashboard API
 * - redirect to login page if not authenticated
 */
export default function Dashboard(){
    const [user, setUser] = useState(null)
    const router = useRouter();

    useEffect(()=> {
        //call the dashboard API to fetch user data
        const fetchUserData = async () => {
            const res = await fetch('/api/dashboard');
            if(res.ok){ //authentication successful
                const data = await res.json();
                setUser(data.user); //set user data if authenticated
            }else{
                router.push('/auth/login'); //redirect to login if authenticated
            }
        };

        fetchUserData();
    }, [router]);

    //HandleLogout by calling the logout API and redirecting to the login page
    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
        });
        router.push('/auth/login'); //redirect to login page
    }
    return (
        <div>
            {user ? (
                <>
                <h1>Welcome, {user.email}</h1>
                <button onClick={handleLogout}>Logout</button>
                </>
            ): (
                <p>Loading...</p>
            )}
        </div>
    );
}