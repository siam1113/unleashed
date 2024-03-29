import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import { AuthContext } from "../components/authenticator";
import { ReactNode, useContext, useState } from "react";
import { ProfileHighlights } from "../components/profile-highlights";
import { Skills } from "../components/skills";
import { Experience } from "../components/experience";
import { NavBar } from "../components/navbar";
import { Personality } from "../components/personality";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<ReactNode>(<Personality />);
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
      setActiveTab(<Personality />)
    }

    if (e.target.innerText === 'Experiences') {
      setActiveTab(<Experience />)
    }
  }

  return <div className="flex flex-col w-full h-full">
    <NavBar />
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