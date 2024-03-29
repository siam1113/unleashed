import { useState } from "react"
import { Personality } from "../types/type"

export function Personality() {
  const personality: Personality = {
    provider: "16 Personalities",
    type: "Defender (ISFJ-A)",
    traits: {
      introverted: 62,
      observant: 66,
      feeling: 69,
      judging: 69,
      assertive: 78
    },
    reportLink: "https://www.16personalities.com/profiles/468759a1d6f9b"
  }

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

  const [personalityType, setPersonalityType] = useState<Personality>(emptyPersonality)
  const [addPersonality, setAddPersonality] = useState<boolean>(false)

  const renderPersonality = (personality: Personality) => {
    return <div className="flex flex-col w-full h-full p-3">
      <div className="flex flex-row">
        <span className="text-4xl text-primary font-bold p-3">Personality Type: </span>
        <span className="text-4xl text-primary font-bold p-3">{personality.type}</span>
      </div>
      <div className="flex flex-row">
        <span className="text-2xl text-primary font-bold p-3">Provider: </span>
        <span className="text-2xl text-primary font-bold p-3">{personality.provider}</span>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl text-primary font-bold p-3">Traits</h2>
        <div className="flex flex-row">
          {
            Object.keys(personality.traits).map((trait) => {
              return <div className="flex flex-col w-1/5 p-3 text-center">
                <h3 className="text-lg font-semibold">{trait.toUpperCase()}</h3>
                <p>{personality.traits[trait]}%</p>
              </div>
            })
          }
        </div>
        <a href={personality.reportLink} className="text-2xl text-primary font-bold p-3">View Full Report</a>
      </div>
    </div>
  }

  return <div className="flex flex-col w-full h-full p-3">
    <div className="flex flex-row justify-between">
      <h1 className="text-left text-4xl text-primary font-bold p-3">Personality</h1>
      {personalityType.provider == "" && <button className="text-white text-lg font-semibold bg-secondary p-2 rounded m-3" onClick={() => setAddPersonality(true)}> + Add Personality</button>}
      {
        personalityType.provider != "" && <button className="text-white text-lg font-semibold bg-rose-500 p-2 rounded m-3" onClick={() => {
          setPersonalityType(emptyPersonality)
        }}>Remove Personality</button>
      }
    </div>
    <div className="flex flex-col w-full h-full">
      {
        addPersonality && <div className="flex flex-col mt-8 border rounded border-primary p-5"
        >
          <h3 className="text-xl font-semibold">Add New Personality</h3>
          <div className="flex flex-col">
            <label>Provider</label>
            <input type="text" className="border border-primary rounded p-2"
              onChange={(e) => {
                setPersonalityType({
                  ...personalityType,
                  provider: e.target.value
                })
              }}
            />
            <label>Type</label>
            <input type="text" className="border border-primary rounded p-2"
              onChange={(e) => {
                setPersonalityType({
                  ...personalityType,
                  type: e.target.value
                })
              }}
            />
            <label>Introverted</label>
            <input type="number" className="border border-primary rounded p-2"
              onChange={(e) => {
                setPersonalityType({
                  ...personalityType,
                  traits: {
                    ...personalityType.traits,
                    introverted: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Observant</label>
            <input type="number" className="border border-primary rounded p-2"
              onChange={(e) => {
                setPersonalityType({
                  ...personalityType,
                  traits: {
                    ...personalityType.traits,
                    observant: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Feeling</label>
            <input type="number" className="border border-primary rounded p-2"
              onChange={(e) => {
                setPersonalityType({
                  ...personalityType,
                  traits: {
                    ...personalityType.traits,
                    feeling: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Judging</label>
            <input type="number" className="border border-primary rounded p-2"
              onChange={(e) => {
                setPersonalityType({
                  ...personalityType,
                  traits: {
                    ...personalityType.traits,
                    judging: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Assertive</label>
            <input type="number" className="border border-primary rounded p-2"
              onChange={(e) => {
                setPersonalityType({
                  ...personalityType,
                  traits: {
                    ...personalityType.traits,
                    assertive: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Report Link</label>
            <input type="text" className="border border-primary rounded p-2"
              onChange={(e) => {
                setPersonalityType({
                  ...personalityType,
                  reportLink: e.target.value
                })
              }}
            />
            <button className="text-white text-lg font-semibold bg-secondary p-2 rounded my-3" onClick={(e) => {
              e.preventDefault()
              setAddPersonality(false)
              setPersonalityType(personalityType)
            }}>Add Personality</button>
          </div>
        </div>
      }
      {!addPersonality && personalityType.provider! + "" ? renderPersonality(personalityType) : <div className="flex flex-col mt-8 border rounded border-primary p-5">
        <h4 className="text-2xl font-bold">No Experiences Added</h4>
      </div>}
    </div>
  </div>
}