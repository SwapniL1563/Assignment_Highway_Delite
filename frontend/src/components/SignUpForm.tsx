import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:5000/api/auth";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();



  const handleSendOtp = async () => {
    if(!name || !email || !dob) {
        setError("Please fill all required fields");
        return;
    }

    setLoading(true);
    setError("");

    try {
        await axios.post(`${API_BASE}/signup-otp`,{
            name,email,dateOfBirth:dob,
        });

        setOtpSent(true);
    } catch (err:any) {
        setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
        setLoading(false);
    }
  }

  const handleVerifyOtp = async () => {
    if(!otp) {
        setError("Please enter OTP");
        return;
    }

    setLoading(true);
    setError("");

    try {
        const res = await axios.post(`${API_BASE}/verify-otp`,{
            email,otp
        });
        localStorage.setItem("token",res.data.token);
        navigate("/dashboard");
    } catch(error:any) {
        setError(error.response?.data?.message || "Invalid OTP");
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className=" w-full max-w-md flex items-center justify-center bg-white">
        <div className='flex flex-col gap-4 px-2  py-10 w-full'>
        <h2 className='text-4xl font-bold text-start text-[#232323]'>Sign up</h2>
        <p className='text-lg text-[#969696] mb-2'>Sign up to enjoy the feature of HD</p>

        {error && (
            <p className='text-red-500 font-medium '>{error}</p>
        )}

        <input className='border border-[#D9D9D9] p-2 outline-[#367AFF] rounded-md' type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
        <input className='border border-[#D9D9D9] p-2 outline-[#367AFF] rounded-md' type="date" name="date" value={dob} title='dob' onChange={(e) => setDob(e.target.value)} id="" />
        <input className='border border-[#D9D9D9] p-2 outline-[#367AFF] rounded-md' type="email" placeholder='Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        {!otpSent && (
            <button className='w-full bg-[#367AFF] text-white rounded-md p-3 mt-2 text-lg font-medium' onClick={handleSendOtp} disabled={loading}>{loading ? "Sending OTP..." : "Get OTP"}</button>
        )}

        {otpSent && (
            <>
            <input className='border border-[#D9D9D9] p-2 outline-[#367AFF] rounded-md' type="text" placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button className='w-full bg-[#367AFF] text-white rounded-md p-3 mt-2 text-lg font-medium' onClick={handleVerifyOtp}>{loading ? "Verifying..." : "Verify OTP"}</button>
            </>
        )}

        <p className='text-[#969696] text-lg text-center mt-2'>Already have an account? {" "} <span onClick={()=>navigate("/")} className='text-[#367AFF] underline cursor-pointer'>Sign in</span></p>
        </div>
    </div>
  )
}

export default SignUpForm