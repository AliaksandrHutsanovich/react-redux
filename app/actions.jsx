var addCategory = function (category) {
    return {
        type: "ADD_CATEGORY",
        category
    }
};

var addSubCategory = function (category, parentCategory) {
    return {
        type: "ADD_SUBCATEGORY",
        category,
        parentCategory
    }
}

var deleteCategory = function(category) {
    return {
        type: "DELETE_CATEGORY",
        category
    }
}

var editCategory = function(newTitleCategory, oldTitleCategory) {
    return {
        type: "EDIT_CATEGORY",
        newTitleCategory,
        oldTitleCategory
    }
}

var addTask = function (task, category) {
    return {
        type: "ADD_TASK",
        category,
        task
    }
}

var editTask = function (oldTask, newTask, oldTitleCategory, newTitleCategory) {
    return {
        type: "EDIT_TASK",
        oldTask,
        newTask,
        oldTitleCategory,
        newTitleCategory
    }
}

var makeVisibleSubCategory = function(subCategory, visible) {
    return {
        type: "MAKE_VISIBLE_SUBCATEGORY",
        subCategory,
        visible
    }
}

var makeUnvisibleSubCategory = function(subCategory, visible) {
    return {
        type: "MAKE_UNVISIBLE_SUBCATEGORY",
        subCategory,
        visible
    }
}

 export default {addCategory, addSubCategory, deleteCategory, editCategory, addTask, editTask, makeVisibleSubCategory, makeUnvisibleSubCategory};