import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import { AuthContext } from "../components/authenticator";
import { useContext } from "react";

const profile = {
  "Personality": {
    "Innovative": "Push boundaries, seek new solutions.",
    "Visionary": "See possibilities, foresee trends.",
    "Determined": "Persist, achieve against odds."
  },
  "Skill": {
    "Leadership": "Inspire, foster innovation.",
    "Problem-solving": "Tackle challenges creatively.",
    "Adaptability": "Adjust quickly, pivot when needed."
  },
  "Experience": {
    "Entrepreneurship": "Lead successful ventures.",
    "Space Exploration": "Make space travel affordable.",
    "Electric Vehicles": "Drive innovation in transportation."
  }
}



export default function Profile() {
  const router = useRouter();
  const context = useContext(AuthContext);
  const handleLogout = () => {
    context.setIsAuthenticated(false);
    router.push("/");
  }

  const renderProfile = (profile: any) => {
    return Object.keys(profile).map((key) => {
      return <div className="flex flex-col w-full">
        <h3 className="text-left text-3xl text-secondary font-bold p-3 border-b-4 rounded p-3 border-secondary">{key}</h3>
        <ul className="flex flex-col list-disc px-16 font-sans">
          {Object.keys(profile[key]).map((subKey) => {
            return <li className="text-2xl my-3"><strong>{subKey}:</strong> {profile[key][subKey]}</li>
          })}
        </ul>
      </div>
    })
  }
  return <div className="flex flex-col h-screen w-screen">
    <div className="w-full p-3 flex flex-row justify-between bg-primary mt-2">
      <ul className="flex flex-row">
        <li className="p-3 text-white border border-primary rounded text-lg font-medium bg-green-700 me-1">Find Your Team</li>
        <li className="p-3 text-white border border-primary rounded text-lg font-medium bg-green-700 me-1">Your Profile</li>
      </ul>
      <Button color="p-3 text-white border border-primary rounded text-lg font-medium bg-green-600" onClick={handleLogout} >Logout</Button>
    </div>
    <div className="w-full flex flex-col font-serif border border-primary rounded mt-2">
      <div className="flex flex-row w-full h-full">
        <span className="grow p-3 text-white border rounded text-lg font-medium bg-green-700">Profile Highlights</span>
        <span className="p-3 text-white border rounded text-lg font-medium bg-green-700">Personality</span>
        <span className="p-3 text-white border rounded text-lg font-medium bg-green-700">Skills</span>
        <span className="p-3 text-white border rounded text-lg font-medium bg-green-700">Experiences</span>
      </div>
      <div className="flex flex-row w-full h-full">
        <div className="w-1/2">
          <img src={"/person.jpg"} className="h-full w-full object-cover" alt="signup" />
        </div>
        <div className="flex flex-col w-full h-full">
          <h1 className="text-left text-4xl text-primary font-bold p-3">Profile Highlights</h1>
          {renderProfile(profile)}
        </div>
      </div>
    </div>
  </div>
}