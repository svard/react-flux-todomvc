var React = require("react/addons"),
    PureRenderMixin = React.addons.PureRenderMixin,
    ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({
    mixins: [PureRenderMixin],
    
    propTypes: {
        id: ReactPropTypes.string,
        className: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        value: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            value: this.props.value || ""
        };
    },

    render: function () {
        return (
            <input
                id={this.props.id}
                className={this.props.className}
                placeholder={this.props.placeholder}
                value={this.state.value}
                autoFocus={true} 
                onChange={this._onChange}
                onKeyDown={this._onKeyDown} />
        );
    },

    _onChange: function (event) {
        this.setState({
            value: event.target.value
        });
    },

    _onKeyDown: function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.props.onSave(this.state.value);
            this.setState({
                value: ""
            });
        }
    }
});

module.exports = TodoTextInput;