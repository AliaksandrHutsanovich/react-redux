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
              Description: 'find',
              isFinished: false,
              location: {},
            },
            {
              title: 'different',
              Description: 'find',
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
              Description: 'constit',
              isFinished: true,
              location: {},
            },
            {
              title: 'multi',
              Description: 'count',
              isFinished: false,
              location: {},
            },
          ],
        },
      ],
      tasks: [
        {
          title: 'graph',
          Description: 'draw',
          isFinished: true,
          location: {},
        },
        {
          title: 'counting',
          Description: 'count',
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
                  Description: 'study',
                  isFinished: true,
                  location: {},
                },
                {
                  title: 'capitals',
                  Description: 'study',
                  isFinished: false,
                  location: {},
                },
              ],
            },
          ],
          tasks: [
            {
              title: 'polit',
              Description: 'study',
              isFinished: false,
              location: {},
            },
            {
              title: 'mountain',
              Description: 'study',
              isFinished: false,
              location: {},
            },
          ],
        },
      ],
      tasks: [
        {
          title: 'map',
          Description: 'study',
          isFinished: false,
          location: {},
        },
        {
          title: 'drawing',
          Description: 'draw',
          isFinished: false,
          location: {},
        },
      ],
    },
  ],
};

export default initialState;
