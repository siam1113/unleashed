import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import { AuthContext } from "../components/authenticator";
import { ReactNode, useContext, useState } from "react";
import { ProfileHighlights } from "../components/profile-highlights";
import { Skills } from "../components/skills";
import { Experience } from "../components/experience";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<ReactNode>(<Skills />);
  const router = useRouter();
  const context = useContext(AuthContext);
  const handleLogout = () => {
    context.setIsAuthenticated(false);
    router.push("/");
  }

  const profileNavHandler = (e: any) => {
    if (e.target.innerText === 'Profile Highlights') {
      setActiveTab(<ProfileHighlights />)
    }
    if (e.target.innerText === 'Skills') {
      setActiveTab(<Skills />)
    }
    if (e.target.innerText === 'Personality') {
      setActiveTab(<div>Personality</div>)
    }

    if (e.target.innerText === 'Experiences') {
      setActiveTab(<Experience />)
    }
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
        {
          ['Profile Highlights', 'Personality', 'Skills', 'Experiences'].map((item) => {
            return <span className="flex-1 p-3 text-white border rounded text-lg font-semibold bg-green-700 cursor-pointer font-sans" onClick={profileNavHandler}>{item}</span>
          })
        }
      </div>
      {activeTab}
    </div>
  </div>
}