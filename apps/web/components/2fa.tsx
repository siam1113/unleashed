import Image from "next/image";

export default function TwoFactorAuth({ enabled2FA, qrCode, setCode, handle2FA }: any) {
  return (
    <>
      {
        enabled2FA ?
          <>
            <div className="flex flex-col w-1/2 self-center m-3 p-12">
              <h1 className="text-center text-2xl font-bold m-3">Two Factor Authentication</h1>
              <h2 className="text-center text-xl my-3">Please enter your 2FA code below and verify</h2>
              <form className="flex flex-col">
                <input className="text-xl p-3 m-y1 border rounded" type="number" placeholder="Your 2FA code" onChange={(e) => setCode(e.target.value)} />
                <button className="bg-primary text-white text-xl font-bold p-3 my-3 border rounded" onClick={handle2FA}>Verify</button>
              </form>
            </div>
            <div className="w-1/2">
              <img src={"/signup.jpg"} className="h-screen object-cover" alt="signup cover" />
            </div>
          </>
          :
          <>
            <div className="flex flex-col w-1/2 self-center m-3 p-12">
              <h1 className="text-center text-2xl font-bold m-3">Two Factor Authentication</h1>
              <h2 className="text-center text-xl mt-3">Scan the QR Code below</h2>
              <Image className="self-center mb-3" src={qrCode} width={300} height={300} alt="qr code" />
              <form className="flex flex-col">
                <input className="text-xl p-3 m-y1 border rounded" type="number" placeholder="Your 2FA code" onChange={(e) => setCode(e.target.value)} />
                <button className="bg-primary text-white text-xl font-bold p-3 my-3 border rounded" onClick={handle2FA}>Verify</button>
              </form>
            </div>
            <div className="w-1/2">
              <img src={"/signup.jpg"} className="h-screen object-cover" alt="signup cover" />
            </div>
          </>
      }
    </>);
}