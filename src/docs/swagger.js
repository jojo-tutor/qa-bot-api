
const getResponses200 = entity => ({
  200: {
    description: 'Ok',
    content: {
      'application/json': {
        schema: {
          $ref: `#/components/schemas/${entity}`,
        },
      },
    },
  },
});

const getEntityPath = (Entities, Entity, entities, entity) => ({
  // POST
  post: {
    tags: [
      Entities,
    ],
    security: [
      {
        cookieAuth: [],
        basicAuth: [],
      },
    ],
    parameters: [
      {
        name: entity,
        in: 'body',
        description: `${Entity} that we want to create`,
        schema: {
          $ref: `#/components/schemas/${Entity}`,
        },
      },
    ],
    summary: `Create new ${entity} in system`,
    responses: getResponses200(Entity),
  },
  // GET
  get: {
    tags: [
      Entities,
    ],
    security: [
      {
        cookieAuth: [],
        basicAuth: [],
      },
    ],
    parameters: [
      {
        $ref: '#/components/parameters/limit',
      },
      {
        $ref: '#/components/parameters/skip',
      },
    ],
    summary: `Get all ${entities} in system`,
    responses: getResponses200(Entities),
  },
});

const getEntityByIdPath = (Entities, Entity, entities, entity) => ({
  parameters: [
    {
      name: `${entity}Id`,
      in: 'path',
      required: true,
      description: `ID of ${entity} that we want to find`,
      schema: {
        type: 'string',
      },
    },
  ],
  // GET /id
  get: {
    tags: [
      Entities,
    ],
    security: [
      {
        cookieAuth: [],
        basicAuth: [],
      },
    ],
    summary: `Get ${entity} with given ID`,
    responses: getResponses200(Entity),
  },
  // DELETE /id
  delete: {
    summary: `Delete ${entity} with given ID`,
    tags: [
      Entities,
    ],
    security: [
      {
        cookieAuth: [],
        basicAuth: [],
      },
    ],
    responses: getResponses200(Entity),
  },
  // PUT /id
  put: {
    summary: `Update ${entity} with given ID`,
    tags: [
      Entities,
    ],
    security: [
      {
        cookieAuth: [],
        basicAuth: [],
      },
    ],
    parameters: [
      {
        name: entity,
        in: 'body',
        description: `${Entity} with new values of properties`,
        schema: {
          $ref: `#/components/schemas/${Entity}`,
        },
      },
    ],
    responses: getResponses200(Entity),
  },
});

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
      description: 'API for user authentication',
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
        security: [
          {
            basicAuth: [],
          },
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
        responses: getResponses200('Users'),
      },
    },

    '/users': getEntityPath('Users', 'User', 'users', 'user'),
    '/users/{userId}': getEntityByIdPath('Users', 'User', 'users', 'user'),

    '/companies': getEntityPath('Companies', 'Company', 'companies', 'company'),
    '/companies/{companyId}': getEntityByIdPath('Companies', 'Company', 'companies', 'company'),

    '/categories': getEntityPath('Categories', 'Category', 'categories', 'category'),
    '/categories/{categoryId}': getEntityByIdPath('Categories', 'Category', 'categories', 'category'),

    '/questions': getEntityPath('Questions', 'Question', 'questions', 'question'),
    '/questions/{questionId}': getEntityByIdPath('Questions', 'Question', 'questions', 'question'),

    '/results': getEntityPath('Results', 'Result', 'results', 'result'),
    '/results/{resultId}': getEntityByIdPath('Results', 'Result', 'results', 'result'),

    '/skills': getEntityPath('Skills', 'Skill', 'skills', 'Skills'),
    '/skills/{skillId}': getEntityByIdPath('Skills', 'Skill', 'skills', 'Skills'),

    '/tests': getEntityPath('Tests', 'Test', 'tests', 'Tests'),
    '/tests/{testId}': getEntityByIdPath('Tests', 'Test', 'tests', 'Tests'),
  },
};
