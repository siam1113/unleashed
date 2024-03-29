import Image from "next/image";
import { useState } from "react";
import TwoFactorAuth from "../components/2fa";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [qrCode, setQrCode] = useState(undefined);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const resJson = await response.json();
    console.log(resJson);
    const qrCode = resJson.qrcode;
    if (resJson.statusCode == 200) {
      setUserId(resJson.insertId);
      setQrCode(qrCode);
    }
    alert(resJson.message);
  }

  const handle2FA = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/setup-2fa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, code }),
    });
    const resJson = await response.json();
    if (resJson.verified && resJson.statusCode == 200) {
      alert(resJson.message);
      window.location.href = "/profile";
    } else {
      alert(resJson.message);
    }
  }

  return (
    <div className="flex flex-row justify-center w-screen h-screen">
      {qrCode == undefined ?
        <>
          <div className="flex flex-col w-1/2 self-center m-3 p-12">
            <h1 className="text-center text-2xl font-bold m-3">Sign Up</h1>
            <form className="flex flex-col">
              <input className="text-xl p-3 m-1 border rounded" type="text" placeholder="Your Full Name" onChange={(e) => setName(e.target.value)} />
              <input className="text-xl p-3 m-1 border rounded" type="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
              <input className="text-xl p-3 m-1 border rounded" type="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} />
              <button className="bg-primary text-white text-xl font-bold p-3 m-3 border rounded" onClick={handleSignup}>Sign Up</button>
              <a onClick={() => router.push("/login")} className="text-center text-primary text-xl font-bold cursor-pointer">Already have an account? Log In</a>
            </form>
          </div>
          <div className="w-1/2">
            <img src={"/signup.jpg"} className="h-screen object-cover" alt="signup cover" />
          </div>
        </> :
        <TwoFactorAuth enabled2FA={false} handle2FA={handle2FA} qrCode={qrCode} setCode={setCode} />
      }
    </div>
  );
}