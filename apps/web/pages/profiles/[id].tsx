import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { renderExperience, renderPersonality, renderProfileHighlights, renderSkills } from "../../renderers/renderers";
import { Experience, Skill, Personality } from "../../types/type";
import Image from "next/image"
import { Loader } from "../../components/loader";
const server = process.env.NEXT_PUBLIC_SERVER;
const emptyPersonality: Personality = {
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
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState<any>("Profile Highlights");
  const [name, setName] = useState<string>("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [personality, setPersonality] = useState<Personality>(emptyPersonality);
  const [photo, setPhoto] = useState<string>("");
  const [highlights, setHighlights] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  console.log("ID: ", id);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${server}/profile?userid=${id}`, {
        method: "GET",
      });
      const resJson = await response.json();
      return resJson;
    }

    setLoading(true);
    fetchProfile().then((response) => {
      const profile = response["profile"];
      if (profile) {
        setSkills([...profile.skills]);
        setExperiences([...profile.experiences]);
        setPersonality(profile.personality);
        setPhoto(profile.photo);
        setHighlights(profile.highlights);
        setName(profile.name);
        setLoading(false);
        return;
      } else {
        setLoading(false);
        return;
      }
    });
  }, [id])

  if (loading) return <Loader />;
  if (!name) return <div className="flex flex-col h-full w-full align-center justify-center">
    <span className="text-4xl self-center">😕</span>
    <strong className="text-xl self-center">Profile Not Found</strong>
  </div>

  return <div className="flex flex-col w-full h-full border">
    <div className="flex flex-row w-full bg-primary fixed top-0 z-10">
      <span className="w-full text-white text-center text-3xl font-bold p-3">⛲ {name}'s Unleashed ⛲</span>
    </div>
    <div className="w-full flex flex-col font-serif border border-primary rounded mt-2 sticky top-16 z-10">
      <div className="flex flex-row w-full h-full">
        {
          ['Profile Highlights', 'Personality', 'Skills', 'Experiences'].map((item) => {
            return <span className="flex-1 p-3 text-white border rounded text-lg font-semibold bg-green-700 cursor-pointer font-sans" onClick={(e) => setActiveTab(e.currentTarget.textContent)}>{item}</span>
          })
        }
      </div>
    </div>
    <div className="flex flex-col w-full h-full pt-14 overflow-hidden">
      {activeTab === 'Profile Highlights' &&
        <div className="flex flex-row h-full w-full p-3">
          <div className="w-1/3 relative h-screen">
            <Image src={photo ? photo : '/profile.png'} fill alt="signup" />
          </div>
          <div className="flex flex-col grow overflow-y-scroll">
            {renderProfileHighlights(highlights)}
          </div>
        </div>

      }
      <div className="w-full h-full overflow-y-scroll p-3">
        {activeTab === 'Personality' && renderPersonality(personality)}
        {activeTab === 'Skills' && renderSkills(skills)}
        {activeTab === 'Experiences' && renderExperience(experiences)}
      </div>
    </div>
  </div>
}