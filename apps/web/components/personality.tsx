import { useEffect, useState } from "react"
import { Personality } from "../types/type"

export function Personality({ personality, setPersonality }: { personality: Personality, setPersonality: Function }) {
  const [editPersonality, setEditPersonality] = useState<boolean>(false)
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

  useEffect(() => {
    const addPersonality = async () => {
      if (personality.provider != "") {
        await fetch("http://localhost:8080/profile/personality", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: sessionStorage.getItem("userId"), personality }),
        });
      }
    }
    addPersonality()
  }, [personality])

  return <div className="flex flex-col w-full h-full p-3">
    <div className="flex flex-row justify-between">
      <h1 className="text-left text-4xl text-primary font-bold p-3">Personality</h1>
      {!editPersonality && <button className="text-white text-lg font-semibold bg-secondary p-2 rounded m-3" onClick={() => setEditPersonality(true)}> Edit Personality</button>}
    </div>
    <div className="flex flex-col w-full h-full">
      {
        editPersonality && <div className="flex flex-col mt-8 border rounded border-primary p-5"
        >
          <h3 className="text-xl font-semibold">Add New Personality</h3>
          <div className="flex flex-col">
            <label>Provider</label>
            <input type="text" className="border border-primary rounded p-2"
              value={personality.provider}
              onChange={(e) => {
                setPersonality({
                  ...personality,
                  provider: e.target.value
                })
              }}
            />
            <label>Type</label>
            <input type="text" className="border border-primary rounded p-2"
              value={personality.type}
              onChange={(e) => {
                setPersonality({
                  ...personality,
                  type: e.target.value
                })
              }}
            />
            <label>Introverted</label>
            <input type="number" className="border border-primary rounded p-2"
              value={personality.traits.introverted}
              onChange={(e) => {
                setPersonality({
                  ...personality,
                  traits: {
                    ...personality.traits,
                    introverted: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Observant</label>
            <input type="number" className="border border-primary rounded p-2"
              value={personality.traits.observant}
              onChange={(e) => {
                setPersonality({
                  ...personality,
                  traits: {
                    ...personality.traits,
                    observant: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Feeling</label>
            <input type="number" className="border border-primary rounded p-2"
              value={personality.traits.feeling}
              onChange={(e) => {
                setPersonality({
                  ...personality,
                  traits: {
                    ...personality.traits,
                    feeling: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Judging</label>
            <input type="number" className="border border-primary rounded p-2"
              value={personality.traits.judging}
              onChange={(e) => {
                setPersonality({
                  ...personality,
                  traits: {
                    ...personality.traits,
                    judging: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Assertive</label>
            <input type="number" className="border border-primary rounded p-2"
              value={personality.traits.assertive}
              onChange={(e) => {
                setPersonality({
                  ...personality,
                  traits: {
                    ...personality.traits,
                    assertive: parseInt(e.target.value)
                  }
                })
              }}
            />
            <label>Report Link</label>
            <input type="text" className="border border-primary rounded p-2"
              value={personality.reportLink}
              onChange={(e) => {
                setPersonality({
                  ...personality,
                  reportLink: e.target.value
                })
              }}
            />
            <button className="text-white text-lg font-semibold bg-secondary p-2 rounded my-3" onClick={(e) => {
              e.preventDefault()
              setEditPersonality(false)
              setPersonality(personality)
            }}>Done</button>
          </div>
        </div>
      }
      {true ? renderPersonality(personality) : <div className="flex flex-col mt-8 border rounded border-primary p-5">
        <h4 className="text-2xl font-bold">No Experiences Added</h4>
      </div>}
    </div>
  </div>
}