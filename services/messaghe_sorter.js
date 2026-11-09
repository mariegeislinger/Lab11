const { GoogleGenAI, Type } = require('@google/genai')
const departments = require("../departments.json")

const genAI = new GoogleGenAI({ })

module.exports = (feedbackComments) => {

    const departmentString = JSON.stringify(departments)

    const prompt = `
Return a list of the most likely college department or departments
to handle feedback comments. A list of possible departments and a
short description of each is included.
Only include departments which seem to be a good fit for the feedback.
If there does not seem to be a good fit, return an empty list.
Feedback Comments: ${feedbackComments}
Department Choices: ${departmentString}
`

    return genAI.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING
                }
            }
        }
    }).then(response => {
        return JSON.parse(response.text)
    })
}