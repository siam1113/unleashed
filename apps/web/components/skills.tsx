import { useState } from "react"
import { Skill } from "../types/type"

export function Skills() {
  const emptySkill: Skill = {
    Name: "",
    Introduction: "",
    Proficiency: "",
    Experience: "",
    References: []
  }

  const [addSkill, setAddSkill] = useState(false)
  const [skill, setSkill] = useState<Skill>(emptySkill)
  const [skills, setSkills] = useState<Skill[]>([]);
  const renderSkills = (profile: any) => {
    return <div className="flex flex-row flex-wrap p-5">
      {skills.map((skill) => {
        return <div className="grow flex flex-col w-1/5 p-5 border border-2 rounded border-primary m-1">
          <h4 className="text-2xl font-bold">{skill.Name}</h4>
          <p className="text-lg mt-1 mb-3">{skill.Introduction}</p>
          <div className="flex flex-row mt-1">
            <div className="flex flex-row me-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
              <strong className="text-lg font-bold ms-1">Proficiency:</strong>
            </div>
            <span className="text-lg font-medium"> {skill.Proficiency}</span>
          </div>
          <div className="flex flex-row mt-1">
            <div className="flex flex-row me-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
              <strong className="text-lg font-bold ms-1">Experience:</strong>
            </div>
            <span className="text-lg font-medium"> {skill.Experience}</span>
          </div>
          <div className="flex flex-col mt-1">
            <div className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              <h5 className="text-lg font-bold ms-1">References:</h5>
            </div>
            <div className="flex flex-row w-full">
              {skill.References.map((reference) => {
                return <a href={reference.url} className="text-sm font-medium bg-slate-300 m-1 p-2 border rounded">{reference.provider}</a>
              })}
            </div>
          </div>
        </div>
      })}
    </div>
  }

  const saveSkillHandler = () => {
    if (skill.Name != "" || skill.Introduction != "" || skill.Proficiency != "" || skill.Experience != "" || skill.References.length > 0) {
      setSkills([...skills, skill])
      setSkill(emptySkill)
      setAddSkill(false)
    }
    else
      alert("Please fill all the fields")
  }

  return <div className="flex flex-row w-full h-full">
    <div className="flex flex-col w-full h-full p-3">
      <div className="flex flex-row justify-between">
        <h1 className="text-left text-4xl text-primary font-bold p-3">Skills & Abilities</h1>
        <button className="text-white text-lg font-semibold bg-secondary p-2 rounded m-3" onClick={() => setAddSkill(true)}> + Add Skill</button>
      </div>
      {
        addSkill && <div className="flex flex-col mt-8 border-2 rounded border-primary p-5 m-6">
          <h4 className="text-xl font-semibold">Add New Experince</h4>
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
                    return {
                      provider: "Provider",
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