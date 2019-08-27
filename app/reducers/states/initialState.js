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
            },
            {
              title: 'different',
              Description: 'find',
              isFinished: false,
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
            },
            {
              title: 'multi',
              Description: 'count',
              isFinished: false,
            },
          ],
        },
      ],
      tasks: [
        {
          title: 'graph',
          Description: 'draw',
          isFinished: true,
        },
        {
          title: 'counting',
          Description: 'count',
          isFinished: true,
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
                },
                {
                  title: 'capitals',
                  Description: 'study',
                  isFinished: false,
                },
              ],
            },
          ],
          tasks: [
            {
              title: 'polit',
              Description: 'study',
              isFinished: false,
            },
            {
              title: 'mountain',
              Description: 'study',
              isFinished: false,
            },
          ],
        },
      ],
      tasks: [
        {
          title: 'map',
          Description: 'study',
          isFinished: false,
        },
        {
          title: 'drawing',
          Description: 'draw',
          isFinished: false,
        },
      ],
    },
  ],
};

export default initialState;
