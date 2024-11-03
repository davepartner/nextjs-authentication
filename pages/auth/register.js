import Register from '../../components/Auth/Register'


/**
 * This is the register page: renders the register component
 * @returns {JSX.Element}
 * @constructor
 */
export default function RegisterPage(){
    return(
        <div>
            <h1>Register</h1>
            <Register/> {/**Embed the Register component */}
        </div>
    )
}