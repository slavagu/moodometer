const apiUrl = process.env.REACT_APP_API_URL

export const getMood = async () => {
  try {
    const response = await fetch(`${apiUrl}/mood`)
    const content = await response.json()
    return content
  } catch (e) {
    console.log(e)
    return null
  }
}

export const postMood = async mood => {
  try {
    console.log('Posting mood', mood)
    const response = await fetch(`${apiUrl}/mood`, {
      method: 'POST',
      body: JSON.stringify(mood),
    })
    const updatedMood = await response.json()
    console.log('Updated mood', updatedMood)
    return updatedMood
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getHistory = async () => {
  try {
    const response = await fetch(`${apiUrl}/history`)
    const content = await response.json()
    return content
  } catch (e) {
    console.log(e)
    return null
  }
}
