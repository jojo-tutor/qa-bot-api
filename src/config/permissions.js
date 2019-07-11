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
    inherits: 'Guest',
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
  },
  Admin: {
    inherits: 'Candidate',
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
  },
  Super_Admin: {
    inherits: 'Admin',
    can: [
      {
        resource: 'companies',
        permissions: ['all'],
      },
      {
        resource: 'logs',
        permissions: ['all'],
      },
    ],
  },
};
