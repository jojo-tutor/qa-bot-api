export default {
  /**
   * A user that signed-up without a company
   * Created through sign-up
   * Email confirmation is sent
  */
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

  /**
   * A user that is created by a company admin
   * Created through user create
   * Email invitation / reset password is sent
  */
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

  /**
   * A user that signed-up with a company
   * Created through sign-up
   * Email confirmation is sent
  */
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

  /**
   * A super user of the app
   * Predefined creation
   * Nothing is sent
  */
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
