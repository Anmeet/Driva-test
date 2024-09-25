export const swaggerDocs = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Lender Offer API',
    description: 'API documentation for the Lender Offers',
  },
  host: 'localhost:5000/api',
  basePath: '/',
  schemes: ['http'],
  paths: {
    '/lenders': {
      get: {
        summary: 'Retrieve all lender offers',
        responses: {
          '200': {
            description: 'List of lender offers',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/GetLenders',
              },
            },
          },
        },
      },
      post: {
        summary: 'Provide loan details',
        parameters: [
          {
            name: 'loanAmount',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/PostLenders',
            },
          },
        ],
        responses: {
          '201': {
            description: 'Lender Offer created',
          },
        },
      },
    },
  },
  definitions: {
    GetLenders: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the Lender',
        },
        monthlyRepayPayment: {
          type: 'string',
          description: 'The monthly repayment amount (calculated)',
          readOnly: true,
        },
        interestRate: {
          type: 'string',
          description: 'The interest rate for the Loan Term',
        },
        fees: {
          type: 'string',
          description: 'Application fees',
        },
      },
      required: ['name', 'monthlyRepayment', 'interestRate', 'fees'],
    },
    PostLenders: {
      type: 'object',
      properties: {
        loanAmount: {
          type: 'number',
          description: 'The loan amount. Must be at least 2000',
        },

        loanTerm: {
          type: 'number',
          description: 'The Loan Term must be between 1-7 years',
        },
      },
      required: ['loanAmount', 'loanTerm'],
    },
  },
}
