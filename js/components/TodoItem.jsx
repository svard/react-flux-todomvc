var React = require("react/addons"),
    PureRenderMixin = React.addons.PureRenderMixin,
    TodoActions = require("../actions/TodoActions"),
    TodoTextInput = require("./TodoTextInput"),
    ReactPropTypes = React.PropTypes,
    cx = React.addons.classSet;

var TodoItem = React.createClass({
    mixins: [PureRenderMixin],
    
    propTypes: {
        todo: ReactPropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            isEditing: false
        };
    },

    render: function () {
        var todo = this.props.todo,
            classes = cx({
                "completed": todo.complete,
                "editing": this.state.isEditing
            }),
            input;

        if (this.state.isEditing) {
            input = (
                <TodoTextInput 
                    className="edit" 
                    value={this.props.todo.text} 
                    onSave={this._onEdit} />
            );
        }

        return (
            <li className={classes}>
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
        );
    },

    _onDestroy: function () {
        TodoActions.destroy(this.props.todo.id);
    },

    _onToggle: function () {
        TodoActions.toggleComplete(this.props.todo.id);
    },

    _onDoubleClick: function () {
        this.setState({
            isEditing: true
        });
    },

    _onEdit: function (value) {
        TodoActions.edit(this.props.todo.id, value);
        
        this.setState({
            isEditing: false
        });
    }
});

module.exports = TodoItem;