import { ReactNode, useEffect, useState } from "react";
import { ProfileHighlights } from "../components/profile-highlights";
import { Skills } from "../components/skills";
import { Experiences } from "../components/experience";
import { NavBar } from "../components/navbar";
import { Personality } from "../components/personality";
import { Skill, Experience, Personality as PType } from "../types/type";

const server = process.env.NEXT_PUBLIC_SERVER;
const emptyPersonality: PType = {
  provider: "",
  type: "",
  traits: {
    introverted: 0,
    observant: 0,
    feeling: 0,
    judging: 0,
    assertive: 0
  },
  reportLink: ""
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState<ReactNode>("Profile Highlights");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [personality, setPersonality] = useState<PType>(emptyPersonality);
  const [photo, setPhoto] = useState<string>("");
  const [highlights, setHighlights] = useState<string>("");

  useEffect(() => {
    console.log("SERVER: ", server)
    const userid = sessionStorage.getItem("userId");
    const fetchProfile = async () => {
      const response = await fetch(`${server}/profile?userid=${userid}`, {
        method: "GET",
      });
      const resJson = await response.json();
      console.log("PROFILE: ", resJson);
      return resJson["profile"];
    }
    fetchProfile().then((profile) => {
      if (profile) {
        console.log("SKILLS: ", profile.skills);
        console.log("EXPERIENCES: ", profile.experiences);
        setSkills([...profile.skills]);
        setExperiences([...profile.experiences]);
        profile.personality.traits != undefined && setPersonality(profile.personality);
        setPhoto(profile.photo);
        console.log("HIGHLIGHTS: ", profile.highlights);
        setHighlights(profile.highlights);
        return;
      }
    });
  }, [])

  return <div className="flex flex-col w-full h-full">
    <NavBar />
    <div className="w-full flex flex-col font-serif border border-primary rounded mt-2">
      <div className="flex flex-row w-full">
        {
          ['Profile Highlights', 'Personality', 'Skills', 'Experiences'].map((item) => {
            return <span className="flex-1 p-3 text-white border rounded text-lg font-semibold bg-green-700 cursor-pointer font-sans" onClick={(e) => setActiveTab(e.currentTarget.textContent)}>{item}</span>
          })
        }
      </div>
      {activeTab === 'Profile Highlights' && <ProfileHighlights photo={photo} setPhoto={setPhoto} highlights={highlights} setHighlights={setHighlights} />}
      {activeTab === 'Personality' && <Personality personality={personality} setPersonality={setPersonality} />}
      {activeTab === 'Skills' && <Skills skills={skills} setSkills={setSkills} />}
      {activeTab === 'Experiences' && <Experiences experiences={experiences} setExperiences={setExperiences} />}
    </div>
  </div>
}