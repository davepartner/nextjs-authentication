import Login from '../../components/Auth/Login'


/**
 * This is the login page: renders the login component
 * @returns {JSX.Element}
 * @constructor
 */
export default function LoginPage(){
    return(
        <div>
            <h1>Login</h1>
            <Login/> {/**Embed the Login component */}
        </div>
    )
}