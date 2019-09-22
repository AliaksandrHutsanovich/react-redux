/* eslint
  spaced-comment: 0
  no-multi-spaces: 0 */
module.exports = {
    clearMocks: true,  //очищает mock вызовы и instances между каждым тестом
    collectCoverage: true, //нужно ли
                           //собирать информацию о покрытии во время выполнения теста
    coverageThreshold: {  //порог покрытия
      global: {    //порог суммируется по всему
        branches: 0.69,
        functions: 1.2,
        lines: 1.55,
        statements: 1.5,
      },
    },
    rootDir: '../../', // корневая директория которую jest должен сканировать для тестов и модулей
    collectCoverageFrom: [ // массив глобальных паттернов, определяющих набор
                           // файлов из которых должна быть собрана информация о покрытии
      'app/**/*.js',
      '!images/**',
      '!**/node_modules/**',
      '!styles/**',
    ],
    setupFiles: [  // список путей к модулям, который запускает некоторый код чтобы конфигурировать
                   //or set up the testing environment, или установить среду для тестирования
      '<rootDir>/config/enzyme/enzyme.config.js',
      '<rootDir>/config/jest/__mocks__/globals.js',
    ],
    testEnvironment: 'jsdom', //типы среды тестирования (jsdom is by default)
    snapshotSerializers: ['enzyme-to-json/serializer'], //список путей к snapshot serializer модулям, Jest должен использовать для теста снапшотов
    setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'], //a list of paths to modules that run some code to configure,
                                                                     //or set up the testing
                                                      //framework is installed in the environment,
    coverageDirectory: 'coverage',  //папка куда складывается coverage
    coveragePathIgnorePatterns: [ //информация о покрытии будет скрыта, для этих папок
      '\\\\node_modules\\\\',
    ],
    transform: { // объект с регулярными выражениями
                 //для трансформирования (компилирования отдельных файлов)
      '^.+\\.jsx?$': 'babel-jest',
      '\\.svg$': '<rootDir>/config/jest/__mocks__/fileTransformer.js',
    },
    moduleFileExtensions: [ //список расширений которые используют модули
      'js',
      'jsx',
      'json',
    ],
    modulePaths: [  //массив абсолютных путей к дополнительным локациям для
                    //поиска когда происходит ресолвинг модулей
      '<rootDir>/node_modules/',
    ],
    moduleNameMapper: { //объект из регулярных выражений к названиям модулей которые позволяют
                //поставить заглушку на ресурсы, такие как изображения или стили с одним модулем.
      '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    },
    unmockedModulePathPatterns: [ //массив путей к модулям,
                           //которые не будут автоматически мокнуты загрузчиком модулей
      '/^imports\\/.*\\.jsx?$/',
      '/^node_modules/',
    ],
  };
