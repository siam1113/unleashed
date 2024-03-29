import Image from "next/image"
Image
export function ProfileHighlights() {
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

  const renderProfile = (profile: any) => {
    return Object.keys(profile).map((key) => {
      return <div className="flex flex-col w-full">
        <h3 className="text-left text-3xl text-secondary font-bold mx-5 border-b-4 rounded my-3 p-1 border-secondary">{key}</h3>
        <ul className="flex flex-col list-disc px-16">
          {Object.keys(profile[key]).map((subKey) => {
            return <li className="text-2xl my-3"><strong>{subKey}:</strong> {profile[key][subKey]}</li>
          })}
        </ul>
      </div>
    })
  }

  return <div className="flex flex-row w-full h-full">
    <div className="w-1/3 relative">
      <Image src={"/person.jpg"} fill alt="signup" />
    </div>
    <div className="flex flex-col grow">
      <h1 className="text-left text-4xl text-primary font-bold p-3">Profile Highlights</h1>
      {renderProfile(profile)}
    </div>
  </div>
}