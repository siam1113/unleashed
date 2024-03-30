import { useState } from "react";
import TwoFactorAuth from "../components/2fa";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState(undefined);
  const [qrCode, setQrCode] = useState(undefined);
  const [enabled2FA, setEnabled2FA] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(email, password);
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const resJson = await response.json();
    console.log(resJson);
    if (resJson.userId) {
      resJson.userId && setUserId(resJson.userId);
      setEnabled2FA(resJson.enable2FA);
      setQrCode(resJson.qrcode);
    }
    resJson.message && alert(resJson.message);
  }

  const handle2FA = async (e: any) => {
    e.preventDefault();
    const endpoint = enabled2FA ? "verify-2fa" : "setup-2fa";
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, userId }),
    });
    const resJson = await response.json();
    console.log(resJson);
    if (resJson.statusCode == 200 && userId) {
      alert(resJson.message);
      sessionStorage.setItem("userId", userId);
      window.location.href = "/profile";
    } else { alert(resJson.message); }

  }

  return <div className="flex flex-row justify-center w-screen h-screen">
    {userId == undefined ?
      <>
        <div className="flex flex-col w-1/2 self-center m-3 p-12">
          <h1 className="text-center text-2xl font-bold m-3">Log In</h1>
          <form className="flex flex-col">
            <input className="text-xl p-3 m-1 border rounded" type="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
            <input className="text-xl p-3 m-1 border rounded" type="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-primary text-white text-xl font-bold p-3 m-3 border rounded" onClick={(e) => handleLogin(e)}>Log In</button>
            <a onClick={() => router.push("/signup")} className="text-center text-primary text-xl font-bold cursor-pointer">Don't have an account? Sign Up</a>
          </form>
        </div>
        <div className="w-1/2">
          <img src={"/signup.jpg"} className="h-screen object-cover" alt="signup cover" />
        </div>
      </> :
      <>
        <TwoFactorAuth enabled2FA={enabled2FA} handle2FA={handle2FA} qrCode={qrCode} setCode={setCode} />
      </>
    }
  </div>
}