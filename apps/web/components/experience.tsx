import { useEffect, useState } from "react";
import { Experience } from "../types/type"
import { renderExperience } from "../renderers/renderers";
const server = process.env.NEXT_PUBLIC_SERVER;

export function Experiences({ experiences, setExperiences }: { experiences: Experience[], setExperiences: Function }) {
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
  const saveExpHandler = () => {
    setExperiences([...experiences, experience]);
    setAddExperience(false);
    setExperience(emptyExp);
  }

  useEffect(() => {
    const addExperiences = async () => {
      await fetch(`${server}/profile/experiences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: sessionStorage.getItem("userId"), experiences }),
      });
    }
    addExperiences()
  }, [experiences])

  const deleteExpHandler = (e: any) => {
    console.log(e.currentTarget.value)
    const [role, company] = e.currentTarget.value.split('|')
    console.log(role, company)
    const filteredExperiences = experiences.filter((exp) => exp.Role != role && exp.Company != company);
    setExperiences(filteredExperiences);
  }


  return <div className="flex flex-col w-full p-3">
    <div className="flex flex-row justify-between">
      <h1 className="text-left text-4xl text-primary font-bold p-3">Experiences</h1>
      <button className="text-white text-lg font-semibold bg-secondary p-2 rounded m-3" onClick={() => setAddExperience(true)}> + Add Experience</button>
    </div>
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
        renderExperience(experiences, deleteExpHandler)
    }
  </div>
}