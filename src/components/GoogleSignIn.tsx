import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function GoogleSignIn() {
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse: CredentialResponse): void => {
        localStorage.setItem("token", JSON.stringify({
            token: credentialResponse.credential,
            name: "User"
        }));

        toast.success("Login Successfull 🎉");
        navigate('/');
    }

    const handleError = () => {
        toast.error("Failure While Logging In")
    }

    return (
        <GoogleOAuthProvider clientId='931774024078-17nqt0e40dm09mvrr28o2fa04mti3jal.apps.googleusercontent.com'>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="filled_blue"
                size="large"
                width="200"
            />
        </GoogleOAuthProvider>
    )
}

export default GoogleSignIn

