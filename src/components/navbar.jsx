import { Link } from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth";
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useNavigate } from "react-router-dom";


export const Navbar=()=>{
    const [user]=useAuthState(auth);
    const navigate= useNavigate();
    const logoutUser=async ()=>{
        await signOut(auth);
        navigate("/login")
    }
    
    return(
        <div className="navbar">
            <div className="links">
                <Link to="/" >Home</Link>
                {!user? <Link to="/login">Login</Link>:
                <Link to="/createpost">Create Post</Link>}

            </div>
            <div className="user">
                {user && (
                    <>
                <p>{user?.displayName}</p>
                <img alt="user" src={user?.photoURL || " "} />
                <button onClick={logoutUser}><LogoutSharpIcon/></button>
                    </>
                )}
            </div>
        </div>
    )
}