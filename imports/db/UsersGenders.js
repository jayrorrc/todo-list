import { Enum } from 'meteor/jagi:astronomy'

const Genders = Enum.create({
  name: 'Genders',
  identifiers: {
    MALE: 'Masculino',
    FEMALE: 'Feminino',
    OTHER: 'Outro',
  }
})

export { Genders }