module.exports = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'QA-Bot',
    description: 'A question and answer app where companies can filter candidates by inviting them to take the challenging tests.',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'API Support',
      url: 'https://jojotutor.netlify.com/',
      email: 'support@qabot.com',
    },
  },
  servers: [
    {
      url: '/',
      description: 'Rest API',
    },
  ],
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
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'connect.sid',
      },
      basicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    schemas: {
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
        $ref: '#/components/schemas/User',
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
        $ref: '#/components/schemas/Company',
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
        $ref: '#/components/schemas/Category',
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
        $ref: '#/components/schemas/Question',
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
        $ref: '#/components/schemas/Result',
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
        $ref: '#/components/schemas/Skill',
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
        $ref: '#/components/schemas/Test',
      },
    },
    parameters: {
      limit: {
        name: 'limit',
        in: 'query',
        description: 'Number of records',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      skip: {
        name: 'skip',
        in: 'query',
        description: 'Number of records that will be skipped',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    },
  },
  security: {
    basicAuth: [],
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
              $ref: '#/components/schemas/Login',
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
                  $ref: '#/components/schemas/User',
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
              $ref: '#/components/schemas/User',
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
              $ref: '#/components/schemas/User',
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
            basicAuth: [],
          },
        ],
        summary: 'Get all users in system',
        parameters: [
          {
            $ref: '#/components/parameters/limit',
          },
          {
            $ref: '#/components/parameters/skip',
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/components/schemas/Users',
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
          schema: {
            type: 'string',
          },
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
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
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
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
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
              $ref: '#/components/schemas/User',
            },
          },
        ],
        responses: {
          200: {
            description: 'User is updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
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
              $ref: '#/components/schemas/Company',
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
              $ref: '#/components/schemas/Company',
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
              $ref: '#/components/schemas/Companies',
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
              $ref: '#/components/schemas/Company',
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
              $ref: '#/components/schemas/Company',
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
              $ref: '#/components/schemas/Company',
            },
          },
        ],
        responses: {
          200: {
            description: 'Company is updated',
            schema: {
              $ref: '#/components/schemas/Company',
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
              $ref: '#/components/schemas/Category',
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
              $ref: '#/components/schemas/Category',
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
              $ref: '#/components/schemas/Categories',
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
              $ref: '#/components/schemas/Category',
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
              $ref: '#/components/schemas/Category',
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
              $ref: '#/components/schemas/Category',
            },
          },
        ],
        responses: {
          200: {
            description: 'Category is updated',
            schema: {
              $ref: '#/components/schemas/Category',
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
              $ref: '#/components/schemas/Question',
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
              $ref: '#/components/schemas/Question',
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
              $ref: '#/components/schemas/Questions',
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
              $ref: '#/components/schemas/Question',
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
              $ref: '#/components/schemas/Question',
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
              $ref: '#/components/schemas/Question',
            },
          },
        ],
        responses: {
          200: {
            description: 'Question is updated',
            schema: {
              $ref: '#/components/schemas/Question',
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
              $ref: '#/components/schemas/Result',
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
              $ref: '#/components/schemas/Result',
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
              $ref: '#/components/schemas/Results',
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
              $ref: '#/components/schemas/Result',
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
              $ref: '#/components/schemas/Result',
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
              $ref: '#/components/schemas/Result',
            },
          },
        ],
        responses: {
          200: {
            description: 'Result is updated',
            schema: {
              $ref: '#/components/schemas/Result',
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
              $ref: '#/components/schemas/Skill',
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
              $ref: '#/components/schemas/Skill',
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
              $ref: '#/components/schemas/Skills',
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
              $ref: '#/components/schemas/Skill',
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
              $ref: '#/components/schemas/Skill',
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
              $ref: '#/components/schemas/Skill',
            },
          },
        ],
        responses: {
          200: {
            description: 'Skill is updated',
            schema: {
              $ref: '#/components/schemas/Skill',
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
              $ref: '#/components/schemas/Test',
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
              $ref: '#/components/schemas/Test',
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
              $ref: '#/components/schemas/Tests',
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
              $ref: '#/components/schemas/Test',
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
              $ref: '#/components/schemas/Test',
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
              $ref: '#/components/schemas/Test',
            },
          },
        ],
        responses: {
          200: {
            description: 'Test is updated',
            schema: {
              $ref: '#/components/schemas/Test',
            },
          },
        },
      },
    },
  },
};
