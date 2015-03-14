import React from "react/addons";
import TodoActions from "../actions/TodoActions";
import TodoTextInput from "./TodoTextInput";

let PureRenderMixin = React.addons.PureRenderMixin,
    ReactPropTypes = React.PropTypes,
    cx = React.addons.classSet;

export default React.createClass({
    mixins: [PureRenderMixin],
    
    propTypes: {
        todo: ReactPropTypes.object.isRequired
    },

    getInitialState() {
        return {
            isEditing: false
        };
    },

    render() {
        let todo = this.props.todo,
            classes = cx({
                "completed": todo.complete,
                "editing": this.state.isEditing
            }),
            input;

        if (this.state.isEditing) {
            input = <TodoTextInput 
                        className="edit" 
                        value={this.props.todo.text} 
                        onSave={this._onEdit} />
        }

        return  <li className={classes}>
                    <div className="view">
                        <input 
                            className="toggle" 
                            type="checkbox" 
                            onChange={this._onToggle} 
                            checked={todo.complete} />
                        <label
                            onDoubleClick={this._onDoubleClick}>
                            {todo.text}
                        </label>
                        <button 
                            className="destroy" 
                            onClick={this._onDestroy}>
                        </button>
                    </div>
                    {input}
                </li>
    },

    _onDestroy() {
        TodoActions.destroy(this.props.todo.id);
    },

    _onToggle() {
        TodoActions.toggleComplete(this.props.todo.id);
    },

    _onDoubleClick() {
        this.setState({
            isEditing: true
        });
    },

    _onEdit(value) {
        TodoActions.edit(this.props.todo.id, value);
        
        this.setState({
            isEditing: false
        });
    }
});