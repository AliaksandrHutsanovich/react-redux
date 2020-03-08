import { Map } from 'immutable';

const getSubCategories = (key, subCategories) => {
  let arrSubCategories = [];
  if (subCategories.length > 0) {
    arrSubCategories = subCategories.map((subCategory, num) => {
      const subCategoryElem = subCategory.toObject();
      subCategoryElem.key = key + '-subCategories-' + num;
      subCategoryElem.subCategories = subCategoryElem.subCategories.toArray();
      if (subCategoryElem.subCategories.length > 0) {
        subCategoryElem.subCategories = getSubCategories(
          subCategoryElem.key,
          subCategoryElem.subCategories,
        );
      }
      return subCategoryElem;
    });
  }
  return arrSubCategories;
};

export const getCategories = ({ actionReducers }) => {
  const categories = actionReducers.get('categories').toArray();

  const arrCategories = categories.map((category, num) => {
    const categoryElem = category.toObject();
    categoryElem.key = 'categories-' + num;
    categoryElem.subCategories = categoryElem.subCategories.toArray();
    categoryElem.subCategories = getSubCategories(categoryElem.key, categoryElem.subCategories);
    return categoryElem;
  });
  return arrCategories;
};


// export const getTasks = (state) => {
//   const categories = state.actionReducers.get('categories').toArray();

//   const urlsArr = [];
//   const arrayOfTaskGroups = [];

//   const getTasksFun = (key, subCategories) => {
//     if (subCategories.length > 0) {
//       subCategories.forEach((subCategory, num) => {
//         const subCategoryObj = subCategory.toObject();
//         urlsArr.push(key + '-subCategories-' + num);

//         arrayOfTaskGroups.push(
//           subCategoryObj.tasks.toArray()
//             .map((task) => task.toObject()),
//         );

//         if (subCategoryObj.subCategories.toArray().length > 0) {
//           getTasksFun(
//             key + '-subCategories-' + num,
//             subCategoryObj.subCategories.toArray(),
//           );
//         }
//       });
//     }
//   };

//   categories.forEach((category, num) => {
//     const categoryObj = category.toObject();
//     urlsArr.push('categories-' + num);

//     arrayOfTaskGroups.push(
//       categoryObj.tasks.toArray()
//         .map(
//           (task) => task.toObject(),
//         ),
//     );

//     getTasksFun(
//       'categories-' + num,
//       categoryObj.subCategories.toArray(),
//     );
//   });

//   return {
//     urls: urlsArr,
//     taskGroups: arrayOfTaskGroups,
//   };
// };

export const getUrls = ({ actionReducers }) => {
  const categories = actionReducers.get('categories').toArray();
    const urls = [];

    const getTasksFun = (key, subCategories) => {
      if (subCategories.length > 0) {
        subCategories.forEach((subCategory, num) => {
          const subCategoryObj = subCategory.toObject();
          urls.push(key + '-subCategories-' + num);
          if (subCategoryObj.subCategories.toArray().length > 0) {
            getTasksFun(
              key + '-subCategories-' + num,
              subCategoryObj.subCategories.toArray(),
            );
          }
        });
      }
    };

    categories.forEach((category, num) => {
      const categoryObj = category.toObject();
      categoryObj.key = 'categories-' + num;
      urls.push('categories-' + num);
      getTasksFun(
        'categories-' + num,
        categoryObj.subCategories.toArray(),
      );
    });

    return urls;
};

export const getTaskByUrl = (url) => (state) => {
  const task = state.getIn(url.split('-'));
  return task
    ? task.update('location', (location) => location.toObject())
    : Map({});
};
