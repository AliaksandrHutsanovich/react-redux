export const initialState = {
  categories: [
    {
      title: 'Mathematic',
      subCategories: [
        {
          title: 'highMathematic',
          subCategories: [],
          tasks: [
            {
              title: 'integral',
              description: 'find',
              isFinished: false,
              location: {},
            },
            {
              title: 'different',
              description: 'find',
              isFinished: false,
              location: {},
            },
          ],
        },
        {
          title: 'lowMathematic',
          subCategories: [],
          tasks: [
            {
              title: 'table',
              description: 'constit',
              isFinished: true,
              location: {},
            },
            {
              title: 'multi',
              description: 'count',
              isFinished: false,
              location: {},
            },
          ],
        },
      ],
      tasks: [
        {
          title: 'graph',
          description: 'draw',
          isFinished: true,
          location: {},
        },
        {
          title: 'counting',
          description: 'count',
          isFinished: true,
          location: {},
        },
      ],
    },
    {
      title: 'Geography',
      subCategories: [
        {
          title: 'highGeography',
          subCategories: [
            {
              title: 'smallHighGeography',
              subCategories: [],
              tasks: [
                {
                  title: 'peoples',
                  description: 'study',
                  isFinished: true,
                  location: {},
                },
                {
                  title: 'capitals',
                  description: 'study',
                  isFinished: false,
                  location: {},
                },
              ],
            },
          ],
          tasks: [
            {
              title: 'polit',
              description: 'study',
              isFinished: false,
              location: {},
            },
            {
              title: 'mountain',
              description: 'study',
              isFinished: false,
              location: {},
            },
          ],
        },
      ],
      tasks: [
        {
          title: 'map',
          description: 'study',
          isFinished: false,
          location: {},
        },
        {
          title: 'drawing',
          description: 'draw',
          isFinished: false,
          location: {},
        },
      ],
    },
  ],
};

export default initialState;
