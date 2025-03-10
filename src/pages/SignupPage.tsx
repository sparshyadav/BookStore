import { useState } from "react";
import loginImage from "../assets/logi-image.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [errorField, setErrorField] = useState("");

    const navigate = useNavigate();

    function handleSubmit() {
        setErrorField("");

        if (!/^[A-Za-z ]+$/.test(name)) {
            setErrorField("name");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorField("email");
            return;
        }
        if (password.length < 6) {
            setErrorField("password");
            return;
        }
        if (!/^\d{10}$/.test(mobile)) {
            setErrorField("mobile");
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
                        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/')}>
                            <div className="text-[25px] text-[#878787]">LOGIN</div>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer">
                            <div className="text-[25px]">SIGNUP</div>
                            <div className="w-[45%] text-center border border-[#A03037] h-[5px] bg-[#A03037] rounded-[5px]"></div>
                        </div>
                    </div>
                    <div className="w-[75%] flex flex-col gap-3">
                        <div>
                            <label className="text-[12px]">Full Name: </label>
                            <Input
                                className="w-[80%]"
                                placeholder="Enter full name"
                                status={errorField === 'name' ? 'error' : ''}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errorField === "name" && (
                                <span className="text-[10px] text-[red]">
                                    Enter a valid name (Only alphabets).
                                </span>
                            )}
                        </div>
                        <div>
                            <label className="text-[12px]">Email Id: </label>
                            <Input
                                className="w-[80%]"
                                placeholder="Enter email"
                                status={errorField === 'email' ? 'error' : ''}
                                value={email}
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
                                status={errorField === 'password' ? 'error' : ''}
                                value={password}
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
                        <div>
                            <label className="text-[12px]">Mobile Number: </label>
                            <Input
                                className="w-[80%]"
                                placeholder="Enter mobile number"
                                status={errorField === 'mobile' ? 'error' : ''}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                            {errorField === "mobile" && (
                                <span className="text-[10px] text-[red]">
                                    Enter a valid 10-digit mobile number.
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        className="bg-[#A03037] w-[75%] h-[40px] text-white rounded-[3px] hover:bg-[#861F2A] transition duration-300 cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
