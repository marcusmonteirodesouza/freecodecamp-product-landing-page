const fetchTestimonial = async () => { // eslint-disable-line no-unused-vars
  const fetchRandomName = async () => {
    try {
      const response = await fetch('https://uinames.com/api/'

      )
      const data = await response.json()
      return `${data.name} ${data.surname}`
    } catch (err) {
      throw new Error(err)
    }
  }

  const fetchRandomAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice'

      )
      const data = await response.json()
      return data.slip.advice
    } catch (err) {
      throw new Error(err)
    }
  }

  const name = await fetchRandomName()
  const testimonial = await fetchRandomAdvice()
  return {
    name,
    imageSrc: 'https://thispersondoesnotexist.com/image',
    testimonial
  }
}
