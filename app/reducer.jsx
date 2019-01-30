
var reducer = function(state={}, action) {

    function addNewCategor(sub) {
        return sub.concat(action.category);
    }

    function searchTitle1(sub1) {
        var sub=Object.assign([], sub1);
        var event=1;
        for (let i=0; i<sub.length; i++) {
            if (sub[i].title==action.parentCategory) {
                sub[i].subCategories.unshift(action.category);
                event=2;
                break;
            }
            if (event==2) break;
            if (sub[i].subCategories.length!=0) {
                sub[i].subCategories=searchTitle1(sub[i].subCategories);
            }
        }
        return sub;
    }

    function searchTitle2(sub1) {
        var sub=Object.assign([], sub1);
        var event=1;
        for (let i=0; i<sub.length; i++) {
            if (sub[i].title==action.category) {
                console.log("title="+sub[i].title);
                sub.splice(i, 1);
                console.log(sub);
                event=2;
                break;
            }
            if (event==2) break;
            if (sub[i].subCategories.length!=0) {
                sub[i].subCategories=searchTitle2(sub[i].subCategories);
            }
        }
        return sub;
    }

    function searchTitle3(sub1) {
        var sub=Object.assign([], sub1);
        var event=1;
        for (let i=0; i<sub.length; i++) {
            if (sub[i].title==action.oldTitleCategory) {
                sub[i].title=action.newTitleCategory;
                event=2;
                break;
            }
            if (event==2) break;
            if (sub[i].subCategories.length!=0) {
                sub[i].subCategories=searchTitle3(sub[i].subCategories);
            }
        }
        console.log(sub);
        return sub;
    }

    function searchTitle4(sub1) {
        var sub=Object.assign([], sub1);
        var event=1;
        for (let i=0; i<sub.length; i++) {
            if (sub[i].title==action.category) {
                sub[i].tasks.push(action.task);    //here task is object
                event=2;
                break;
            }
            if (event==2) break;
            if (sub[i].subCategories.length!=0) {
                sub[i].subCategories=searchTitle4(sub[i].subCategories);
            }
        }
        return sub;
    }

    function searchTitle5(sub2) {
        var sub=Object.assign([], sub2);
        function searchTitle(sub) {
            var event=1;
            for (let i=0; i<sub.length; i++) {
                if (sub[i].title==action.oldTitleCategory) {
                    event=2;
                    for (let j=0; j<sub[i].tasks.length; j++) {
                        if (sub[i].tasks[j].title==action.oldTask) //here task is object
                            sub[i].tasks.splice(j, 1);
                    }
                    break;
                }
                if (event==2) break;
                if (sub[i].subCategories.length!=0) {
                    sub[i].subCategories=searchTitle(sub[i].subCategories);
                }
            }
            return sub;
        }
        var sub1=searchTitle(sub);

        function addTitle(sub) {
            event=1;
            for (let i=0; i<sub.length; i++) {
                if (sub[i].title==action.newTitleCategory) {
                    sub[i].tasks.push(action.newTask);   //here task is object
                    event=2;
                    break;
                }
                if (event==2) break;
                if (sub[i].subCategories.length!=0) {
                    sub[i].subCategories=addTitle(sub[i].subCategories);
                }
            }
            return sub;
        }
        sub1=addTitle(sub1);
        return sub1;
    }

    function searchSubcategories(sub1) {
        var sub=Object.assign([], sub1);
        for (let i=0; i<sub.length; i++) {
            if (sub[i].title==action.subCategory) {
                for (let j=0; j<sub[i].subCategories.length; j++) {
                    console.log('visible');
                    sub[i].subCategories[j].visible=action.visible;
                }
            }
            if (sub[i].subCategories.length!=0) {
                searchSubcategories(sub[i].subCategories);
            }
            console.log(sub[i]);
        }
        return sub;
    }

    function searchSubCategories2(sub1) {
        var sub=Object.assign([], sub1);
        function subCategories2(sub) {
            console.log('unvisible');
            sub.visible=action.visible;
            for (let i=0; i<sub.subCategories.length; i++) {
                subCategories2(sub.subCategories[i]);
            }
        }

        function searchSubcategories1(sub) {
            for (let i=0; i<sub.length; i++) {
                if (sub[i].title==action.subCategory) {
                    for (let j=0; j<sub[i].subCategories.length; j++) {
                        subCategories2(sub[i].subCategories[j]);
                    }
                }
                if (sub[i].subCategories.length!=0) {
                    searchSubcategories1(sub[i].subCategories);
                }
                console.log(sub[i]);
            }
        }
        searchSubcategories1(sub);
        return sub;
    }

    switch (action.type) {
        case "SET_STATE":
            return {
                ...state,
                titlesCategories: action.state.titlesCategories
            };
        case "ADD_CATEGORY":
            return {
                ...state,
                titlesCategories: addNewCategor(state.titlesCategories)
            };
        case "ADD_SUBCATEGORY":
            return {
                ...state,
                titlesCategories: searchTitle1(state.titlesCategories)
            };
        case "DELETE_CATEGORY":
            return {
                ...state,
                titlesCategories: searchTitle2(state.titlesCategories)
            };
        case "EDIT_CATEGORY":
            return {
                ...state,
                titlesCategories: searchTitle3(state.titlesCategories)
            };
        case "ADD_TASK":
            return {
                ...state,
                titlesCategories: searchTitle4(state.titlesCategories)
            };
        case "EDIT_TASK":
            return {
                ...state,
                titlesCategories: searchTitle5(state.titlesCategories)
            };
        case "MAKE_VISIBLE_SUBCATEGORY":
            return {
                ...state,
                titlesCategories: searchSubcategories(state.titlesCategories)
            };
        case "MAKE_UNVISIBLE_SUBCATEGORY":
            return {
                ...state,
                titleCategories: searchSubCategories2(state.titlesCategories)
            };
    }
    return state;
}

export default reducer;