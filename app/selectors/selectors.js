export const getCategories = (state) => {
  const categories = state.actionReducers.get('categories').toArray();
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

  const arrCategories = categories.map((category, num) => {
    const categoryElem = category.toObject();
    categoryElem.key = 'categories-' + num;
    categoryElem.subCategories = categoryElem.subCategories.toArray();
    categoryElem.subCategories = getSubCategories(categoryElem.key, categoryElem.subCategories);
    return categoryElem;
  });
  return arrCategories;
};


export const getTasks = (state) => {
  const categories = state.actionReducers.get('categories').toArray();

  const urlsArr = [];
  const arrayOfTaskGroups = [];

  const getTasksFun = (key, subCategories) => {
    if (subCategories.length > 0) {
      subCategories.forEach((subCategory, num) => {
        const subCategoryObj = subCategory.toObject();
        subCategoryObj.key = key + '-subCategories-' + num;
        urlsArr.push(subCategoryObj.key);
        subCategoryObj.tasks = subCategoryObj.tasks.toArray();
        arrayOfTaskGroups.push(subCategoryObj.tasks.map((task) => task.toObject()));
        subCategoryObj.subCategories = subCategoryObj.subCategories.toArray();
        if (subCategoryObj.subCategories.length > 0) {
          getTasksFun(subCategoryObj.key, subCategoryObj.subCategories);
        }
      });
    }
  };

  categories.forEach((category, num) => {
    const categoryObj = category.toObject();
    categoryObj.key = 'categories-' + num;
    urlsArr.push(categoryObj.key);
    categoryObj.tasks = categoryObj.tasks.toArray();
    arrayOfTaskGroups.push(categoryObj.tasks.map((task) => task.toObject()));
    categoryObj.subCategories = categoryObj.subCategories.toArray();
    getTasksFun(categoryObj.key, categoryObj.subCategories);
  });

  return {
    urls: urlsArr,
    taskGroups: arrayOfTaskGroups,
  };
};

export const getUrls = (state) => {
  const categories = state.actionReducers.get('categories').toArray();
    const urls = [];
    const getTasksFun = (key, subCategories) => {
      if (subCategories.length > 0) {
        subCategories.forEach((subCategory, num) => {
          const subCategoryObj = subCategory.toObject();
          subCategoryObj.key = key + '-subCategories-' + num;
          urls.push(subCategoryObj.key);
          subCategoryObj.subCategories = subCategoryObj.subCategories.toArray();
          if (subCategoryObj.subCategories.length > 0) {
            getTasksFun(subCategoryObj.key, subCategoryObj.subCategories);
          }
        });
      }
    };
    categories.forEach((category, num) => {
      const categoryObj = category.toObject();
      categoryObj.key = 'categories-' + num;
      urls.push(categoryObj.key);
      categoryObj.subCategories = categoryObj.subCategories.toArray();
      getTasksFun(categoryObj.key, categoryObj.subCategories);
    });

    return urls;
};
