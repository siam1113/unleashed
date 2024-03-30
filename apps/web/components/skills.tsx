import React, { useEffect, useState } from "react"
import { Skill } from "../types/type"
import { renderSkills } from "../renderers/renderers"

export function Skills({ skills, setSkills }: { skills: Skill[], setSkills: React.Dispatch<React.SetStateAction<Skill[]>> }) {
  const emptySkill: Skill = {
    Name: "",
    Introduction: "",
    Proficiency: "",
    Experience: "",
    References: []
  }
  const [addSkill, setAddSkill] = useState(false)
  const [skill, setSkill] = useState<Skill>(emptySkill)

  useEffect(() => {
    const addSkill = async () => {
      if (skills.length > 0) {
        await fetch("${process.env.SERVER}/profile/skills", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: sessionStorage.getItem("userId"), skills }),
        });
      }
    }
    addSkill()
  }, [skills])

  const saveSkillHandler = async () => {
    setSkills((currentSkills: Skill[]) => [...currentSkills, skill])
    setAddSkill(false)
    setSkill(emptySkill)
  }

  return <div className="flex flex-row w-full h-full">
    <div className="flex flex-col w-full h-full p-3">
      <div className="flex flex-row justify-between">
        <h1 className="text-left text-4xl text-primary font-bold p-3">Skills & Abilities</h1>
        <button className="text-white text-lg font-semibold bg-secondary p-2 rounded m-3" onClick={() => setAddSkill(true)}> + Add Skill</button>
      </div>
      {
        addSkill && <div className="flex flex-col mt-8 border-2 rounded border-primary p-5 m-6">
          <h4 className="text-xl font-semibold">Add New Skill</h4>
          <div className="flex flex-col">
            <label>Name</label>
            <input type="text" className="border border-primary rounded p-2"
              onChange={(e) => {
                setSkill({
                  ...skill,
                  Name: e.target.value
                })
              }}
            />
            <label>Introduction</label>
            <textarea className="border border-primary rounded p-2"
              onChange={(e) => {
                setSkill({
                  ...skill,
                  Introduction: e.target.value
                })
              }}
            />
            <label>Proficiency</label>
            <select className="border border-primary rounded p-2"
              onChange={(e) => {
                setSkill({
                  ...skill,
                  Proficiency: e.target.value
                })
              }}
              required
            >
              <option value="">Select Proficiency</option>
              <option value="Beginner">Beginner</option>
              <option value="Competent">Competent</option>
              <option value="Proficient">Proficient</option>
              <option value="Expert">Expert</option>
            </select>
            <label>Experience</label>
            <select className="border border-primary rounded p-2"
              onChange={(e) => {
                setSkill({
                  ...skill,
                  Experience: e.target.value
                })
              }}
              required
            >
              <option selected value="">Select Experience</option>
              <option value="2 Years">2 years</option>
              <option value="3 Years">3 years</option>
              <option value="4 Years">4 years</option>
              <option value="5 Years">5 years</option>
            </select>
            <label>References (URL's comma separated)</label>
            <input type="text" className="border border-primary rounded p-2"
              onChange={(e) => {
                setSkill({
                  ...skill,
                  References: e.target.value.split(",").map((url) => {
                    const provider = url.slice(url.indexOf("//"), url.indexOf(".")).replace("//", "");
                    return {
                      provider: provider ? provider.toUpperCase() : "Unknow Provider",
                      url: url
                    }
                  })
                })
              }}
            />
            <button type="submit" className="text-white text-lg font-semibold bg-secondary p-2 rounded my-3" onClick={saveSkillHandler}> Save</button>
            <button className="text-white text-lg font-semibold bg-tertiary p-2 rounded" onClick={() => setAddSkill(false)}> Cancel</button>
          </div>
        </div>
      }
      {skills.length == 0 ?
        <div className="flex flex-col mt-8 border rounded border-primary p-5">
          <h4 className="text-2xl font-bold">No Skills Added</h4>
        </div> : renderSkills(skills)
      }
    </div>
  </div >
}