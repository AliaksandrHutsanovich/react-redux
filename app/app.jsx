import React from 'react'
var ReactDOM = require("react-dom");
var redux = require("redux");
import reducer from './reducer.jsx'
import AppView from "./AppView.jsx";

import {Provider}  from 'react-redux';
var store = redux.createStore(reducer);

store.dispatch({
    type: "SET_STATE",
    state: {
        titlesCategories: [
            {title: "Mathematic", subCategories: [
                    {title: "highMathematic", subCategories: [], tasks: [{title: "integral", Description: "find", status: "unfinished"}, {title: "different", Description: "find", status:"done"}], visible: "not"},
                    {title: "lowMathematic", subCategories: [], tasks: [{title: "table", Description: "constit", status: "done"},{title: "multi", Description: "count", status: "unfinished"}], visible: "not"}
                ], tasks: [
                    {title: "graph", Description: "draw", status: "done"},
                    {title: "counting", Description: "count", status: "done"}
                ], visible: "yes"},
            {title: "Geography", subCategories: [
                    {title: "highGeography", subCategories: [
                            {title: "smallHighGeography", subCategories: [], tasks: [{title: "peoples", Description: "study", status: "done"},{title: "capitals", Description: "study", status: "unfinished"}], visible: "not"}
                        ], tasks: [{title: "polit", Description: "study", status: "unfinished"}, {title: "mountain", Description: "study", status: "unfinished"}], visible: "not"}
                ], tasks: [{title: "map", Description: "study", status: "unfinished"}, {title: "drawing", Description: "draw", status: "unfinished"}], visible: "yes"}
        ]
    }
});

ReactDOM.render(
    <Provider store={store}>
        <AppView />
    </Provider>,
    document.getElementById("container")
);