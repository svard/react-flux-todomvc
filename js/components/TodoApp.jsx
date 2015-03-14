import React from "react";
import Router from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import TodoStore from "../stores/TodoStore";

let RouteHandler = Router.RouteHandler;

function getAllTodos() {
    return {
        allTodos: TodoStore.getAll()
    };
}

export default React.createClass({
    getInitialState() {
        return getAllTodos();
    },

    componentDidMount() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        TodoStore.removeChangeListener(this._onChange);
    },

    render() {
        return  <div>
                    <Header />
                    <RouteHandler />
                    <Footer
                        todos={this.state.allTodos} />
                </div>
    },

    _onChange() {
        this.setState(getAllTodos());
    }
});