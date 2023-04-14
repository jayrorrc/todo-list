import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Task } from '/imports/db/TasksCollection';

const insertTask = (obj, user) => {
  const task = new Task();

  const date = new Date();
  let [ day, month, year ] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];

  if (day > 23) {
    day = 1
    month++
  }

  task.name = obj.name
  task.description = obj.description
  task.createdBy = user._id
  task.status = obj.status
  task.private = obj.private
  task.deadline = new Date(year, month, (day + 5))

  task.save()
}

const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'admin';

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (Task.find().count() === 0) {
    [
      {
        name: 'First Task',
        description: 'First Description',
        status: 'Cadastrada',
        private: false,
      },
      {
        name: 'Second Task',
        description: 'Second Description',
        status: 'Cadastrada',
        private: false,
      },
      {
        name: 'Third Task',
        description: 'Third Description',
        status: 'Em Andamento',
        private: false,
      },
      {
        name: 'Fourth Task',
        description: 'Fourth Description',
        status: 'Em Andamento',
        private: true,
      },
      {
        name: 'Fifth Task',
        description: 'Fifth Description',
        status: 'Em Andamento',
        private: false,
      },
      {
        name: 'Sixth Task',
        description: 'Sixth Description',
        status: 'Em Andamento',
        private: false,
      },
      {
        name: 'Seventh Task',
        description: 'Seventh Description',
        status: 'Em Andamento',
        private: false,
      },
    ].forEach(taskText => insertTask(taskText, user));

    [
      {
        name: 'Eighth Task',
        description: 'Eighth Description',
        status: 'Cadastrada',
        private: true,
      },
      {
        name: 'Ninth Task',
        description: 'Ninth Description',
        status: 'Cadastrada',
        private: true,
      },
      {
        name: 'Tenth Task',
        description: 'Tenth Description',
        status: 'Em Andamento',
        private: false,
      },
    ].forEach(taskText => insertTask(taskText, { _id: '9vKWZHrfyXsryEfF7' }));
  }
});
