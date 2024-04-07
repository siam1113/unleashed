import Image from "next/image"
import { renderProfileHighlights } from "../renderers/renderers"
Image
const server = process.env.NEXT_PUBLIC_SERVER;
export function ProfileHighlights(
  { photo, setPhoto, highlights, setHighlights }: { photo: string, setPhoto: Function, highlights: string, setHighlights: Function }) {

  const handleFileUpload = async (e: any) => {
    console.log(e.currentTarget.files)
    const file = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userid", sessionStorage.getItem("userId") as string);
    const response = await fetch(`${server}/profile/photo`, {
      method: "POST",
      body: formData
    })
    const data = await response.json();
    await setPhoto(data.photourl);
  }

  const handleGenerateProfileHighlights = async () => {
    const response = await fetch(`${server}/profile/generate-highlights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userid: sessionStorage.getItem("userId") })
    })
    const data = await response.json();
    data.highlights && alert("Highlights Generated Successfully");
    await setHighlights(data.highlights);
  }

  return <div className="flex flex-row w-full h-full justify-between overflow-hidden p-3">
    <div className="flex h-full relative flex-1">
      <Image src={photo ? photo : '/profile.png'} className="h-full object-cover object-top" fill alt="signup" />
      <input type="file" name="profilePhoto" className="w-full h-full absolute bottom-0 right-0 opacity-0"
        placeholder="Upload Your Photo"
        onInput={handleFileUpload}
      />
      {
        !photo && <span className="absolute bottom-0 bg-white text-primary w-full font-semibold p-5 rounded cursor-pointer text-center">Upload Your Profile Photo</span>
      }
    </div>
    <div className="flex flex-col w-3/5 p-3 overflow-scroll">
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-left text-4xl text-primary font-bold p-3">Profile Highlights</h1>
        <button className="text-xl font-semibold text-white bg-secondary p-3 mx-3 rounded self-center h-1/8" onClick={handleGenerateProfileHighlights}> Generate Profile Highlights</button>
      </div>
      {renderProfileHighlights(highlights)}
    </div>
  </div >
}