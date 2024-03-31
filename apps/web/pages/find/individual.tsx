import { useState } from "react";
import { NavBar } from "../../components/navbar";
import { renderSearchResults } from "../../renderers/renderers";
const server = process.env.NEXT_PUBLIC_SERVER;

export default function Individual() {
  const [filter, setFilter] = useState({ personality: "", tech: "" });
  const [individuals, setIndividuals] = useState([]);

  const handleFilter = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }

  const handleFindIndividuals = async () => {
    console.log("Filter", filter);
    if (filter.personality === "" || filter.tech === "") {
      return alert("Please select all filters");
    }
    console.log("Find Individuals", filter);
    const response = await fetch(`${server}/find/individuals?personality=${filter.personality}&tech=${filter.tech}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    setIndividuals(data);
  }

  return <div className="flex flex-col w-full h-full">
    <NavBar />
    <div className="flex flex-row justify-center items-center font-serif">
      <select className="p-3 m-3 border border-primary rounded" name="personality" onInput={handleFilter}>
        <option>Select Personality Type</option>
        <option>INTJ</option>
        <option>INTP</option>
        <option>ENTJ</option>
        <option>ENTP</option>
      </select>

      <select className="p-3 m-3 border border-primary rounded" name="tech" onInput={handleFilter}>
        <option>Select Technology</option>
        <option>JavaScript</option>
        <option>Python</option>
        <option>Java</option>
        <option>React</option>
      </select>
      <button
        className="p-3 m-3 border border-primary rounded bg-secondary font-bold text-white"
        onClick={handleFindIndividuals}
      >
        Find Individuals
      </button>
    </div>

    <div className="flex flex-row justify-center items-center font-serif">
      {individuals.length > 0 && renderSearchResults(individuals)}
    </div>
  </div>
}