const fetchTestimonial = async () => {
  const fetchRandomPerson = async () => {
    try {
      const response = await fetch('https://randomuser.me/api'

      )
      const data = await response.json()
      const person = data.results[0]
      const name = `${person.name.first} ${person.name.last}`
      const imageUrl = person.picture.large
      return {
        name,
        imageUrl
      }
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

  const person = await fetchRandomPerson()
  const author = person.name
  const jobTitle = faker.name.jobTitle()
  const imageUrl = person.imageUrl
  const content = await fetchRandomAdvice()

  return {
    author,
    jobTitle,
    imageUrl,
    content
  }
}

class TestimonalSource {
  NEXT_TESTIMONIAL_EVENT = 'NEXT_TESTIMONIAL'
  subscribers = []

  subscribe (elem, func) {
    elem.addEventListener(this.NEXT_TESTIMONIAL_EVENT, e => {
      const testimonial = e.detail.testimonial
      func(testimonial)
    })
    this.subscribers.push(elem)
  }

  async nextTestimonial () {
    const testimonial = await fetchTestimonial()
    const event = new CustomEvent(this.NEXT_TESTIMONIAL_EVENT, { detail: { testimonial } })
    this.subscribers.forEach(s => s.dispatchEvent(event))
  }
}

const testimonialSource = new TestimonalSource()

window.onload = async () => {
  const testimonialElem = document.getElementById('testimonial')
  testimonialSource.subscribe(testimonialElem, (testimonial) => {
    const img = testimonialElem.querySelector('#testimonial-image')
    const testimonialContent = testimonialElem.querySelector('#testimonial-content')
    const testimonialAuthor = testimonialElem.querySelector('#testimonial-author')
    const testimonialJobTitle = document.createElement('cite')

    img.src = testimonial.imageUrl
    testimonialContent.textContent = testimonial.content
    testimonialAuthor.textContent = `${testimonial.author}, `
    testimonialJobTitle.textContent = testimonial.jobTitle
    testimonialAuthor.appendChild(testimonialJobTitle)
  })

  const nextTestimonialButton = document.getElementById('next-testimonial-button')
  nextTestimonialButton.onclick = async () => {
    await testimonialSource.nextTestimonial()
  }

  await testimonialSource.nextTestimonial()
}
