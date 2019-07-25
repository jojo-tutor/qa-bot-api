module.exports = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'QA-Bot',
    description: 'A question and answer app for your candidates!',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  basePath: '/',
  tags: [
    {
      name: 'Auth',
      description: 'API for user auth',
    },
    {
      name: 'Users',
      description: 'API for users in the system',
    },
  ],
  schemes: [
    'http',
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
  securityDefinitions: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'connect.sid',
    },
  },
  paths: {
    '/login': {
      post: {
        tags: [
          'Auth',
        ],
        parameters: [
          {
            name: 'email',
            in: 'body',
            description: 'User email',
            schema: {
              $ref: '#/definitions/Login',
            },
          },
        ],
        summary: 'Login user',
        responses: {
          200: {
            description: 'OK',
            schema: {
              properties: {
                token: {
                  type: 'string',
                },
                user: {
                  $ref: '#/definitions/User',
                },
              },
            },
          },
        },
      },
    },
    '/users': {
      post: {
        tags: [
          'Users',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User that we want to create',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        description: 'Create new user in system',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'New user is created',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      get: {
        tags: [
          'Users',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get all users in system',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Users',
            },
          },
        },
      },
    },
    '/users/{userId}': {
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          description: 'ID of user that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Users',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get user with given ID',
        responses: {
          200: {
            description: 'User is found',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      delete: {
        summary: 'Delete user with given ID',
        tags: [
          'Users',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'User is deleted',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      put: {
        summary: 'Update user with give ID',
        tags: [
          'Users',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'User with new values of properties',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        ],
        responses: {
          200: {
            description: 'User is updated',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },
    '/companies': {
      post: {
        tags: [
          'Companies',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'company',
            in: 'body',
            description: 'Company that we want to create',
            schema: {
              $ref: '#/definitions/Company',
            },
          },
        ],
        description: 'Create new company in system',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'New company is created',
            schema: {
              $ref: '#/definitions/Company',
            },
          },
        },
      },
      get: {
        tags: [
          'Companies',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get all companies in system',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Companies',
            },
          },
        },
      },
    },
    '/companies/{companyId}': {
      parameters: [
        {
          name: 'companyId',
          in: 'path',
          required: true,
          description: 'ID of company that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Companies',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get company with given ID',
        responses: {
          200: {
            description: 'Company is found',
            schema: {
              $ref: '#/definitions/Company',
            },
          },
        },
      },
      delete: {
        summary: 'Delete company with given ID',
        tags: [
          'Companies',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Company is deleted',
            schema: {
              $ref: '#/definitions/Company',
            },
          },
        },
      },
      put: {
        summary: 'Update company with give ID',
        tags: [
          'Companies',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'company',
            in: 'body',
            description: 'Company with new values of properties',
            schema: {
              $ref: '#/definitions/Company',
            },
          },
        ],
        responses: {
          200: {
            description: 'Company is updated',
            schema: {
              $ref: '#/definitions/Company',
            },
          },
        },
      },
    },
    '/categories': {
      post: {
        tags: [
          'Categories',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'category',
            in: 'body',
            description: 'Category that we want to create',
            schema: {
              $ref: '#/definitions/Category',
            },
          },
        ],
        description: 'Create new category in system',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'New category is created',
            schema: {
              $ref: '#/definitions/Category',
            },
          },
        },
      },
      get: {
        tags: [
          'Categories',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get all categories in system',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Categories',
            },
          },
        },
      },
    },
    '/categories/{categoryId}': {
      parameters: [
        {
          name: 'categoryId',
          in: 'path',
          required: true,
          description: 'ID of category that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Categories',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get category with given ID',
        responses: {
          200: {
            description: 'Category is found',
            schema: {
              $ref: '#/definitions/Category',
            },
          },
        },
      },
      delete: {
        summary: 'Delete category with given ID',
        tags: [
          'Categories',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Category is deleted',
            schema: {
              $ref: '#/definitions/Category',
            },
          },
        },
      },
      put: {
        summary: 'Update category with give ID',
        tags: [
          'Categories',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'category',
            in: 'body',
            description: 'Category with new values of properties',
            schema: {
              $ref: '#/definitions/Category',
            },
          },
        ],
        responses: {
          200: {
            description: 'Category is updated',
            schema: {
              $ref: '#/definitions/Category',
            },
          },
        },
      },
    },
    '/questions': {
      post: {
        tags: [
          'Questions',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'question',
            in: 'body',
            description: 'Question that we want to create',
            schema: {
              $ref: '#/definitions/Question',
            },
          },
        ],
        description: 'Create new question in system',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'New question is created',
            schema: {
              $ref: '#/definitions/Question',
            },
          },
        },
      },
      get: {
        tags: [
          'Questions',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get all questions in system',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Questions',
            },
          },
        },
      },
    },
    '/questions/{questionId}': {
      parameters: [
        {
          name: 'questionId',
          in: 'path',
          required: true,
          description: 'ID of question that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Questions',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get question with given ID',
        responses: {
          200: {
            description: 'Question is found',
            schema: {
              $ref: '#/definitions/Question',
            },
          },
        },
      },
      delete: {
        summary: 'Delete question with given ID',
        tags: [
          'Questions',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Question is deleted',
            schema: {
              $ref: '#/definitions/Question',
            },
          },
        },
      },
      put: {
        summary: 'Update question with give ID',
        tags: [
          'Questions',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'question',
            in: 'body',
            description: 'Question with new values of properties',
            schema: {
              $ref: '#/definitions/Question',
            },
          },
        ],
        responses: {
          200: {
            description: 'Question is updated',
            schema: {
              $ref: '#/definitions/Question',
            },
          },
        },
      },
    },
    '/results': {
      post: {
        tags: [
          'Results',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'result',
            in: 'body',
            description: 'Result that we want to create',
            schema: {
              $ref: '#/definitions/Result',
            },
          },
        ],
        description: 'Create new result in system',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'New result is created',
            schema: {
              $ref: '#/definitions/Result',
            },
          },
        },
      },
      get: {
        tags: [
          'Results',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get all results in system',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Results',
            },
          },
        },
      },
    },
    '/results/{resultId}': {
      parameters: [
        {
          name: 'resultId',
          in: 'path',
          required: true,
          description: 'ID of result that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Results',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get result with given ID',
        responses: {
          200: {
            description: 'Result is found',
            schema: {
              $ref: '#/definitions/Result',
            },
          },
        },
      },
      delete: {
        summary: 'Delete result with given ID',
        tags: [
          'Results',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Result is deleted',
            schema: {
              $ref: '#/definitions/Result',
            },
          },
        },
      },
      put: {
        summary: 'Update result with give ID',
        tags: [
          'Results',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'result',
            in: 'body',
            description: 'Result with new values of properties',
            schema: {
              $ref: '#/definitions/Result',
            },
          },
        ],
        responses: {
          200: {
            description: 'Result is updated',
            schema: {
              $ref: '#/definitions/Result',
            },
          },
        },
      },
    },
    '/skills': {
      post: {
        tags: [
          'Skills',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'skill',
            in: 'body',
            description: 'Skill that we want to create',
            schema: {
              $ref: '#/definitions/Skill',
            },
          },
        ],
        description: 'Create new skill in system',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'New skill is created',
            schema: {
              $ref: '#/definitions/Skill',
            },
          },
        },
      },
      get: {
        tags: [
          'Skills',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get all skills in system',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Skills',
            },
          },
        },
      },
    },
    '/skills/{skillId}': {
      parameters: [
        {
          name: 'skillId',
          in: 'path',
          required: true,
          description: 'ID of skill that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Skills',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get skill with given ID',
        responses: {
          200: {
            description: 'Skill is found',
            schema: {
              $ref: '#/definitions/Skill',
            },
          },
        },
      },
      delete: {
        summary: 'Delete skill with given ID',
        tags: [
          'Skills',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Skill is deleted',
            schema: {
              $ref: '#/definitions/Skill',
            },
          },
        },
      },
      put: {
        summary: 'Update skill with give ID',
        tags: [
          'Skills',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'skill',
            in: 'body',
            description: 'Skill with new values of properties',
            schema: {
              $ref: '#/definitions/Skill',
            },
          },
        ],
        responses: {
          200: {
            description: 'Skill is updated',
            schema: {
              $ref: '#/definitions/Skill',
            },
          },
        },
      },
    },
    '/tests': {
      post: {
        tags: [
          'Tests',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'test',
            in: 'body',
            description: 'Test that we want to create',
            schema: {
              $ref: '#/definitions/Test',
            },
          },
        ],
        description: 'Create new test in system',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'New test is created',
            schema: {
              $ref: '#/definitions/Test',
            },
          },
        },
      },
      get: {
        tags: [
          'Tests',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get all tests in system',
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Tests',
            },
          },
        },
      },
    },
    '/tests/{testId}': {
      parameters: [
        {
          name: 'testId',
          in: 'path',
          required: true,
          description: 'ID of test that we want to find',
          type: 'string',
        },
      ],
      get: {
        tags: [
          'Tests',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        summary: 'Get test with given ID',
        responses: {
          200: {
            description: 'Test is found',
            schema: {
              $ref: '#/definitions/Test',
            },
          },
        },
      },
      delete: {
        summary: 'Delete test with given ID',
        tags: [
          'Tests',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Test is deleted',
            schema: {
              $ref: '#/definitions/Test',
            },
          },
        },
      },
      put: {
        summary: 'Update test with give ID',
        tags: [
          'Tests',
        ],
        security: [
          {
            cookieAuth: [],
          },
        ],
        parameters: [
          {
            name: 'test',
            in: 'body',
            description: 'Test with new values of properties',
            schema: {
              $ref: '#/definitions/Test',
            },
          },
        ],
        responses: {
          200: {
            description: 'Test is updated',
            schema: {
              $ref: '#/definitions/Test',
            },
          },
        },
      },
    },
  },
  definitions: {
    Login: {
      required: [
        'email',
        'password',
      ],
      properties: {
        email: {
          type: 'string',
          uniqueItems: true,
        },
        password: {
          type: 'string',
        },
      },
    },
    User: {
      required: [
        'email',
        '_id',
      ],
      properties: {
        email: {
          type: 'string',
          uniqueItems: true,
        },
        status: {
          type: 'string',
        },
      },
    },
    Users: {
      type: 'array',
      $ref: '#/definitions/User',
    },
    Company: {
      required: [
        'name',
        'email',
        '_id',
      ],
      properties: {
        _id: {
          type: 'string',
          uniqueItems: true,
        },
        email: {
          type: 'string',
          uniqueItems: true,
        },
      },
    },
    Companies: {
      type: 'array',
      $ref: '#/definitions/Company',
    },
    Category: {
      required: [
        '_id',
        'name',
      ],
      properties: {
        _id: {
          type: 'string',
          uniqueItems: true,
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
    },
    Categories: {
      type: 'array',
      $ref: '#/definitions/Category',
    },
    Question: {
      required: [
        '_id',
        'question',
        'answer',
      ],
      properties: {
        _id: {
          type: 'string',
          uniqueItems: true,
        },
        question: {
          type: 'string',
        },
        answer: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
    },
    Questions: {
      type: 'array',
      $ref: '#/definitions/Question',
    },
    Result: {
      required: [
        '_id',
        'user',
        'test',
      ],
      properties: {
        _id: {
          type: 'string',
          uniqueItems: true,
        },
        user: {
          type: 'string',
        },
        test: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: ['On-going', 'Completed'],
        },
        company: {
          type: 'string',
        },
        questions_answered: {
          type: 'number',
        },
        ellapsed_time: {
          type: 'string',
        },
        completed_date: {
          type: 'string',
        },
        score: {
          type: 'number',
        },
        total: {
          type: 'number',
        },
        passing_percentage: {
          type: 'number',
        },
        notes: {
          type: 'string',
        },
      },
    },
    Results: {
      type: 'array',
      $ref: '#/definitions/Result',
    },
    Skill: {
      required: [
        '_id',
        'name',
      ],
      properties: {
        _id: {
          type: 'string',
          uniqueItems: true,
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
    },
    Skills: {
      type: 'array',
      $ref: '#/definitions/Skill',
    },
    Test: {
      required: [
        '_id',
        'name',
        'time_limit',
      ],
      properties: {
        _id: {
          type: 'string',
          uniqueItems: true,
        },
        name: {
          type: 'string',
        },
        time_limit: {
          type: 'string',
        },
        categories: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        skills: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        questions: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        difficulty: {
          type: 'string',
          enum: ['Easy', 'Intermediate', 'Hard'],
        },
        description: {
          type: 'string',
        },
      },
    },
    Tests: {
      type: 'array',
      $ref: '#/definitions/Test',
    },
  },
};
