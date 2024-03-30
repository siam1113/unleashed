import { Experience, Personality, Skill, Trait } from "../types/type"
import Markdown from 'react-markdown'

export const renderPersonality = (personality: Personality) => {
  return <div className="flex flex-col w-full h-full px-3 font-serif">
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
          Object.keys(personality.traits).map((trait: string) => {
            return <div className="flex flex-col w-1/5 p-3 text-center">
              <h3 className="text-lg font-semibold">{trait.toUpperCase()}</h3>
              <p>{personality.traits[trait as keyof (Trait)]}%</p>
            </div>
          })
        }
      </div>
      <a href={personality.reportLink} className="text-2xl text-primary font-bold p-3">View Full Report</a>
    </div>
  </div>
}

export const renderSkills = (skills: Skill[]) => {
  console.log("SKILLS: ", skills);
  return <div className="flex flex-row flex-wrap px-5">
    {skills.map((skill) => {
      return <div className="grow flex flex-col w-1/5 p-5 border border-2 rounded border-primary m-1">
        <h4 className="text-2xl font-bold">{skill.Name}</h4>
        <p className="text-lg mt-1 mb-3">{skill.Introduction}</p>
        <div className="flex flex-row mt-2">
          <div className="flex flex-row me-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 mx-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
            <strong className="text-lg font-bold ms-1">Proficiency:</strong>
          </div>
          <span className="text-lg font-medium"> {skill.Proficiency}</span>
        </div>
        <div className="flex flex-row mt-2">
          <div className="flex flex-row me-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 mx-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>
            <strong className="text-lg font-bold ms-1">Experience:</strong>
          </div>
          <span className="text-lg font-medium"> {skill.Experience}</span>
        </div>

        {skill.References.length > 0 && <div className="flex flex-col mt-2">
          <div className="flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 mx-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
            <h5 className="text-lg font-bold ms-1">References:</h5>
          </div>
          <div className="flex flex-row w-full mx-3 my-1">
            {skill.References.map((reference) => {
              return <a href={reference.url} className="text-sm font-medium bg-secondary text-white m-1 p-2 border rounded">{reference.provider}</a>
            })}
          </div>
        </div>
        }
      </div>
    })}
  </div>
}

export const renderExperience = (experiences: Experience[]) => {
  return experiences.map((experience) => {
    return <div className="flex flex-col mb-3 border rounded border-primary p-5">
      <h4 className="text-2xl mb-3"><strong>{experience["Role"]} </strong> at <em>{experience["Company"]}</em></h4>
      <div className="flex flex-row align-center p-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-6 h-6 mx-3">
          <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
          <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
        </svg>
        <span className="text-xl self-center">
          <strong>{experience["From"]} - {
            experience["To"] ? experience["To"] : "Present"
          }
          </strong>
          &nbsp;({(Number(experience["To"] ? experience["To"] : new Date().getFullYear())) - Number(experience["From"])} Years)
        </span>
      </div>

      <div className="flex flex-col align-center p-3">
        <div className="flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 mx-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
          </svg>
          <span className="text-xl font-bold">Tech Stack</span>
        </div>
        <ul className="flex flex-row px-5 my-3 mx-3">
          {experience["TechStack"].map((tech) => {
            return <li className="text-white font-semibold text-xs font-sans mx-1 p-2 border rounded bg-secondary">{tech}</li>
          })}
        </ul>
      </div>

      <div className="flex flex-col align-center p-3">
        <div className="flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6 mx-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>

          <span className="text-xl font-bold">Role Highlights</span>
        </div>
        <ul className="px-5 mx-3 my-3">
          {experience["RoleHighlights"].map((highlight) => {
            return <li className="text-lg"> ⚡ {highlight}</li>
          })}
        </ul>
      </div>
    </div>
  })
}

export const renderProfileHighlights = (highlights: string[]) => {
  if (highlights.length == 0) {
    return <div className="flex flex-col w-full h-full">
      <span className="text-3xl text-primary font-bold p-5">No Highlights Generated Yet</span>
    </div>
  }
  console.log("HIGHLIGHTS: ", highlights);
  return highlights.map((highlight) => {
    const header = highlight.split("-")[0];
    const point = highlight.split("-")[1]?.split(":")[0]
    const content = highlight.split(":")[1]
    console.log("HEADER: ", header);
    console.log("POINT: ", point);
    return <div className="flex flex-col w-full h-full font-serif mx-3" >
      <span className="text-3xl text-primary font-bold mx-3"><Markdown>{header}</Markdown></span>
      <span className={"text-xl text-white bg-tertiary border rounded font-semibold inline " + (point != undefined && "p-2")}><Markdown>{point}</Markdown></span>
      <span className="text-xl px-5 mb-3 p-2 inline"><Markdown>{content}</Markdown></span>
    </div >
  });
}
