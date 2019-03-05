export const getCategories = state => {
    let categories = state.actionReducers.get("categories").toArray();
    let getSubCategories = (key, subCategories) => {
        if (subCategories.length > 0) {
            subCategories = subCategories.map((subCategory, num) => {
                subCategory = subCategory.toObject();
                subCategory.key = key + "-subCategories-" + num;
                subCategory.subCategories = subCategory.subCategories.toArray();
                if (subCategory.subCategories.length > 0) {
                    subCategory.subCategories = getSubCategories(subCategory.key, subCategory.subCategories);
                }
                return subCategory;
            });
        }
        return subCategories;
    };

    categories = categories.map((category, num) => {
        category = category.toObject();
        category.key = "categories-" + num;
        category.subCategories = category.subCategories.toArray();
        category.subCategories = getSubCategories(category.key, category.subCategories);
        return category;
    });
    return categories;
}


export const getTasks = state => {
    let categories = state.actionReducers.get("categories").toArray();

    let urls = [];
    let arrayOfTaskGroups = [];

    let getTasks = (key, subCategories) => {
        if (subCategories.length > 0) {
            subCategories.map((subCategory, num) => {
                subCategory = subCategory.toObject();
                subCategory.key = key + "-subCategories-" + num;
                urls.push(subCategory.key);
                subCategory.tasks = subCategory.tasks.toArray();
                arrayOfTaskGroups.push(subCategory.tasks.map(task => task.toObject()));
                subCategory.subCategories = subCategory.subCategories.toArray();
                if (subCategory.subCategories.length > 0) {
                    getTasks(subCategory.key, subCategory.subCategories);
                }
            });
        }
    };

    categories.map((category, num) => {
        category = category.toObject();
        category.key = 'categories-' + num;
        urls.push(category.key);
        category.tasks = category.tasks.toArray();
        arrayOfTaskGroups.push(category.tasks.map(task => task.toObject()));
        category.subCategories = category.subCategories.toArray();
        getTasks(category.key, category.subCategories);
    });

    return {
      urls: urls,
      taskGroups: arrayOfTaskGroups
    }
}

export const getUrls = state => {
    let categories = state.actionReducers.get("categories").toArray();
    let urls = [];
    let getTasks = (key, subCategories) => {
        if (subCategories.length > 0) {
            subCategories.map((subCategory, num) => {
                subCategory = subCategory.toObject();
                subCategory.key = key + "-subCategories-" + num;
                urls.push(subCategory.key);
                subCategory.subCategories = subCategory.subCategories.toArray();
                if (subCategory.subCategories.length > 0) {
                    getTasks(subCategory.key, subCategory.subCategories);
                }
            });
        }
    };
    categories.map((category, num) => {
        category = category.toObject();
        category.key = 'categories-' + num;
        urls.push(category.key);
        category.subCategories = category.subCategories.toArray();
        getTasks(category.key, category.subCategories);
    });

    return urls;
}
