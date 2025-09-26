// I'm only using the types we need here.

export type Person = {
  name: {
    title: string
    first: string,
    last: string,
  }
  location: {
    street: {
      number: number,
      name: string,
    },
    city: string, 
    state: string,
    country: string,
    postcode: string,
  }
  email: string,
  phone: string,
  cell: string,
  dob: {
    age: number
    date: Date
  }
  picture: {
    large: string
    medium: string
  }
}
