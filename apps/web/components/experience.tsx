import { useState } from "react";
import { Experience } from "../types/type"

export function Experience() {
  const emptyExp = {
    Company: "",
    Role: "",
    From: "",
    To: "",
    TechStack: [],
    RoleHighlights: []
  };
  const [addExperience, setAddExperience] = useState<boolean>(false);
  const [experience, setExperience] = useState<Experience>(emptyExp);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const saveExpHandler = () => {
    console.log(experience);
    setExperiences([...experiences, experience]);
    setAddExperience(false);
    setExperience(emptyExp);
  }

  const renderExperience = (experiences: Experience[]) => {
    return experiences.map((experience) => {
      return <div className="flex flex-col mt-8 border rounded border-primary p-5">
        <h4 className="text-2xl font-bold">{experience["Role"]} at {experience["Company"]}</h4>
        <div>
          <div className="flex flex-row align-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>

            <span className="text-xl">
              {experience["From"]} - {
                experience["To"] ? experience["To"] : "Present"
              }
              &nbsp;({(Number(experience["To"] ? experience["To"] : new Date().getFullYear())) - Number(experience["From"])} Years)
            </span>
          </div>
          <div className="flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
            <span className="text-xl font-bold">Tech Stack: </span>
          </div>
          <ul className="list-disc px-5">
            {experience["TechStack"].map((tech) => {
              return <li className="text-lg">{tech}</li>
            })}
          </ul>
          <div className="flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>

            <span className="text-xl font-bold">Role Highlights:</span>
          </div>
          <ul className="list-disc px-5">
            {experience["RoleHighlights"].map((highlight) => {
              return <li className="text-lg">{highlight}</li>
            })}
          </ul>
        </div>
      </div>
    })
  }

  return <div className="flex flex-col w-full py-3">
    <div className="flex flex-row justify-between">
      <h1 className="text-left text-4xl text-primary font-bold p-3">Experiences</h1>
      <button className="text-white text-lg font-semibold bg-secondary p-2 rounded m-3" onClick={() => setAddExperience(true)}> + Add Experience</button>
    </div>
    <div className="px-5">
      {
        addExperience && <div className="flex flex-col mt-8 border rounded border-primary p-5"
        >
          <h4 className="text-xl font-semibold">Add New Experince</h4>
          <div className="flex flex-col">
            <label>Company</label>
            <input type="text" className="border border-primary rounded p-2"
              onChange={(e) => {
                setExperience({
                  ...experience,
                  Company: e.target.value
                })
              }}
            />
            <label>Role</label>
            <input type="text" className="border border-primary rounded p-2"
              onChange={(e) => {
                setExperience({
                  ...experience,
                  Role: e.target.value
                })
              }}
            />
            <label>From</label>
            <input type="number" className="border border-primary rounded p-2"
              onChange={(e) => {
                setExperience({
                  ...experience,
                  From: e.target.value
                })
              }}
            />
            <label>To</label>
            <input type="number" className="border border-primary rounded p-2"
              onChange={(e) => {
                setExperience({
                  ...experience,
                  To: e.target.value
                })
              }}
            />
            <label>Tech Stack (comma separated)</label>
            <input type="text" className="border border-primary rounded p-2"
              onChange={(e) => {
                setExperience({
                  ...experience,
                  TechStack: e.target.value.split(",")
                })
              }}
            />
            <label>Role Highlights (comma separated) </label>
            <textarea className="border border-primary rounded p-2"
              onChange={(e) => {
                setExperience({
                  ...experience,
                  RoleHighlights: e.target.value.split(",")
                })
              }}
            />
            <button className="text-white text-lg font-semibold bg-secondary p-2 rounded my-3" onClick={saveExpHandler}> Save</button>
            <button className="text-white text-lg font-semibold bg-tertiary p-2 rounded" onClick={() => setAddExperience(false)}> Cancel</button>
          </div>
        </div>}
      {
        experiences.length == 0 ?
          <div className="flex flex-col mt-8 border rounded border-primary p-5">
            <h4 className="text-2xl font-bold">No Experiences Added</h4>
          </div> :
          renderExperience(experiences)
      }
    </div>
  </div>
}