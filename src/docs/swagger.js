const getResponses = Entity => ({
  200: {
    description: 'Ok',
    content: {
      'application/json': {
        schema: {
          $ref: `#/components/schemas/${Entity}`,
        },
      },
    },
  },
});

const getEntityPath = Entity => ({
  // POST
  post: {
    tags: [
      Entity,
    ],
    security: [
      {
        cookieAuth: [],
        basicAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${Entity}`,
          },
        },
      },
    },
    summary: `Create new ${Entity} in system`,
    responses: getResponses(Entity),
  },
  // GET
  get: {
    tags: [
      Entity,
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
    summary: `Get all ${Entity} in system`,
    responses: getResponses(`${Entity}Grid`),
  },
});

const getEntityByIdPath = Entity => ({
  parameters: [
    {
      name: `${Entity.toLowerCase()}Id`,
      in: 'path',
      required: true,
      description: `ID of ${Entity} that we want to find`,
      schema: {
        type: 'string',
      },
    },
  ],
  // GET /id
  get: {
    tags: [
      Entity,
    ],
    security: [
      {
        cookieAuth: [],
        basicAuth: [],
      },
    ],
    summary: `Get ${Entity} with given ID`,
    responses: getResponses(Entity),
  },
  // DELETE /id
  delete: {
    summary: `Delete ${Entity} with given ID`,
    tags: [
      Entity,
    ],
    security: [
      {
        cookieAuth: [],
        basicAuth: [],
      },
    ],
    responses: getResponses(Entity),
  },
  // PUT /id
  put: {
    summary: `Update ${Entity} with given ID`,
    tags: [
      Entity,
    ],
    security: [
      {
        cookieAuth: [],
        basicAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${Entity}`,
          },
        },
      },
    },
    responses: getResponses(Entity),
  },
});

const getEntityGrid = Entity => ({
  properties: {
    list: {
      type: 'array',
      $ref: `#/components/schemas/${Entity}`,
    },
    count: {
      type: 'integer',
    },
    pages: {
      type: 'integer',
    },
    limit: {
      type: 'integer',
    },
    skip: {
      type: 'integer',
    },
  },
});

export default {
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
      description: 'v1',
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
          company: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
      },
      UserGrid: getEntityGrid('User'),
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
      CompanyGrid: getEntityGrid('Company'),
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
      CategoryGrid: getEntityGrid('Category'),
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
      QuestionGrid: getEntityGrid('Question'),
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
      ResultGrid: getEntityGrid('Result'),
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
      SkillGrid: getEntityGrid('Skill'),
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
      TestGrid: getEntityGrid('Test'),
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
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Login',
              },
            },
          },
        },
        summary: 'Login user',
        responses: getResponses('User'),
      },
    },

    '/users': getEntityPath('User'),
    '/users/{userId}': getEntityByIdPath('User'),

    '/companies': getEntityPath('Company'),
    '/companies/{companyId}': getEntityByIdPath('Company'),

    '/categories': getEntityPath('Category'),
    '/categories/{categoryId}': getEntityByIdPath('Category'),

    '/questions': getEntityPath('Question'),
    '/questions/{questionId}': getEntityByIdPath('Question'),

    '/results': getEntityPath('Result'),
    '/results/{resultId}': getEntityByIdPath('Result'),

    '/skills': getEntityPath('Skill'),
    '/skills/{skillId}': getEntityByIdPath('Skill'),

    '/tests': getEntityPath('Test'),
    '/tests/{testId}': getEntityByIdPath('Test'),
  },
};
