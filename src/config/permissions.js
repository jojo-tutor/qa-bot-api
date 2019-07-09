module.exports = {
  Guest: {
    can: [
      {
        resource: 'tests',
        permissions: ['get'],
      },
      {
        resource: 'questions',
        permissions: ['get'],
      },
    ],
  },
  Candidate: {
    can: [
      {
        resource: 'tests',
        permissions: ['put'],
      },
      {
        resource: 'results',
        permissions: ['get', 'put'],
      },
    ],
    inherits: 'Guest',
  },
  Admin: {
    can: [
      {
        resource: 'users',
        permissions: ['all'],
      },
      {
        resource: 'categories',
        permissions: ['all'],
      },
      {
        resource: 'questions',
        permissions: ['all'],
      },
      {
        resource: 'results',
        permissions: ['all'],
      },
      {
        resource: 'skills',
        permissions: ['all'],
      },
      {
        resource: 'tests',
        permissions: ['all'],
      },
    ],
    inherits: 'Candidate',
  },
  Super_Admin: {
    can: [
      {
        resource: 'logs',
        permissions: ['all'],
      },
    ],
    inherits: 'Admin',
  },
};
