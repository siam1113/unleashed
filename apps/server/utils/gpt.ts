import { Experience, Personality, Skill } from "../../web/types/type";

const getReqBody = (
  skills: Skill[],
  experiences: Experience[],
  personality: Personality
) => {
  return {
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "system",
        "content": "You are profile summary generator in three paragraph one for Personality, one for Skills and one for Experinece in markdown list format with highlighting important words (use plain text no coding syntax)"
      },
      {
        "role": "user",
        "content": `Generate a profile summary based on these info: 
        Skills: ${skills.map(skill => skill.Name).join(', ')},
        Experiences: ${experiences.map(experience => experience.Company).join(', ')},
        Personality: ${personality.type}
          `
      }
    ]
  };
}

export const generateProfileHighlights = async (
  skills: Skill[],
  experiences: Experience[],
  personality: Personality
) => {
  try {
    const response = await fetch(
      `${process.env.OPENAI_API_ENDPOINT}/chat/completions`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(getReqBody(skills, experiences, personality))
      });
    const resJson = await response.json();
    const content = resJson['choices'][0]['message']['content']
    return content
  } catch (error) {
    console.error('Error in generating highlighted code', error)
    return ''
  }
};