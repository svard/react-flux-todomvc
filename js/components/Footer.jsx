import React from "react/addons";
import Router from "react-router";
import TodoActions from "../actions/TodoActions";

let PureRenderMixin = React.addons.PureRenderMixin,
    Link = Router.Link,
    ReactPropTypes = React.PropTypes;

export default React.createClass({
    mixins: [PureRenderMixin],
    
    propTypes: {
        todos: ReactPropTypes.object.isRequired
    },

    render() {
        let itemLeft = this.props.todos.reduce((sum, todo) => {
            if (!todo.complete) {
                return sum + 1;
            }

            return sum;
        }, 0);

        return <footer id="footer">
                   <span id="todo-count"><strong>{itemLeft}</strong> item left</span>
                   <ul id="filters">
                        <li>
                            <Link to="app">All</Link>
                        </li>
                        <li>
                            <Link to="completed">Completed</Link>
                        </li>
                        <li>
                            <Link to="active">Active</Link>
                        </li>
                    </ul>
                    <button 
                        id="clear-completed"
                        onClick={this._onClick}>
                    </button>
                </footer>
    },

    _onClick() {
        TodoActions.clearCompleted();
    }
});