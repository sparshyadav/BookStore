import { useState } from "react";
import loginImage from "../assets/logi-image.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorField, setErrorField] = useState("");

    const navigate = useNavigate();

    function handleSubmit() {
        setErrorField("");

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorField("email");
            return;
        }
        if (password.length < 6) {
            setErrorField("password");
            return;
        }

        alert("Form submitted successfully!");
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#ADADAD]">
            <div className="flex items-center max-md:flex-col">
                <div className="h-[390px] w-[350px] rounded-l-[21px] ml-2 bg-[#F5F5F5] flex items-center justify-center flex-col gap-[25px] max-md:hidden">
                    <div>
                        <img
                            className="h-[245px] w-[245px] rounded-[50%]"
                            src={loginImage}
                            alt="No Image Found"
                        />
                    </div>
                    <p className="font-bold text-[20px]">ONLINE BOOK SHOPPING</p>
                </div>
                <div className="h-[450px] w-[390px] rounded-[6px] z-40 shadow-xl shadow-grey-400 bg-[#FFFFFF] flex flex-col items-center justify-center gap-[15px] max-[475px]:w-[325px]">
                    <div className="w-[75%] flex justify-between">
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className="text-[25px] ">LOGIN</div>
                            <div className="w-[45%] text-center border border-[#A03037] h-[5px] bg-[#A03037] rounded-[5px]"></div>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/signup')}>
                            <div className="text-[25px] text-[#878787]">SIGNUP</div>
                        </div>
                    </div>
                    <div className="w-[75%] flex flex-col gap-3">
                        <div>
                            <label className="text-[12px]">Email Id: </label>
                            <Input
                                className={`w-[80%] ${errorField === 'email' ? 'border border-red-500' : ''}`}
                                placeholder="Enter email"
                                value={email}
                                status={errorField === 'email' ? 'error' : ''}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errorField === "email" && (
                                <span className="text-[10px] text-[red]">
                                    Enter a valid email address.
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="text-[12px]">Password: </label>
                            <Input.Password
                                placeholder="Enter password"
                                value={password}
                                status={errorField === 'password' ? 'error' : ''}
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errorField === "password" && (
                                <span className="text-[10px] text-[red]">
                                    Password must be at least 6 characters.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='w-[75%] flex flex-col gap-3'>
                        <button
                            className="bg-[#A03037] w-[100%] h-[40px] text-white rounded-[3px] hover:bg-[#861F2A] transition duration-300 cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                        <div className="w-[100%] flex gap-3">
                            <div className="w-[40%] flex justify-center items-center">
                                <div className="w-[100%] border border-[#b7b6b6]"></div>
                            </div>
                            <p className="text-[#a8a8a8]">OR</p>
                            <div className="w-[40%] flex justify-center items-center">
                                <div className="w-[100%] border border-[#b7b6b6]"></div>
                            </div>
                        </div>
                        <div className="w-full flex justify-between">
                            <button className="w-[45%] h-[40px] bg-[#4266B2] text-white px-4 py-2 rounded-md hover:bg-[#375293] transition duration-300 cursor-pointer">
                                Facebook
                            </button>
                            <button className="w-[45%] h-[40px] bg-[#E4E4E4] text-black px-4 py-2 rounded-md hover:bg-[#CFCFCF] transition duration-300 cursor-pointer">
                                Google
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
