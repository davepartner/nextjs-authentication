/**
 * Logout API
 * - CLears the authentication cookie
 */

export default function handler(req, res){
    //clear the cookie by setting it to expire immediately
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
    res.status(200).json({message: 'Logged out successfully'});
}