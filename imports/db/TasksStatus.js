import { Enum } from 'meteor/jagi:astronomy'

const Status = Enum.create({
  name: 'Status',
  identifiers: {
    TODO: 'Cadastrada',
    IN_PROGRESS: 'Em Andamento',
    DONE: 'Concluida',
  }
});

export { Status }