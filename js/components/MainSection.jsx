import React from "react/addons";    
import TodoListItem from "./TodoItem";
import TodoActions from "../actions/TodoActions";

let PureRenderMixin = React.addons.PureRenderMixin,
    ReactPropTypes = React.PropTypes;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        todos: ReactPropTypes.object.isRequired
    },

    render() {
        let todos = [];

        if (this.props.todos.size < 1) {
            return null;
        }

        this.props.todos.forEach((todo) => {
            todos.push(<TodoListItem key={todo.id} todo={todo} />);
        });

        return  <section id="main">
                    <input 
                        id="toggle-all" 
                        type="checkbox"
                        onChange={this._onChange} />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul id="todo-list">{todos}</ul>
                </section>
    },

    _onChange(event) {
        TodoActions.toggleAllCompleted(event.target.checked);
    }
});