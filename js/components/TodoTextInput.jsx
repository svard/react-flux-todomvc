import React from "react/addons";

let PureRenderMixin = React.addons.PureRenderMixin,
    ReactPropTypes = React.PropTypes;

const ENTER_KEY_CODE = 13;

export default React.createClass({
    mixins: [PureRenderMixin],
    
    propTypes: {
        id: ReactPropTypes.string,
        className: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        value: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired
    },

    getInitialState() {
        return {
            value: this.props.value || ""
        };
    },

    render() {
        return  <input
                    id={this.props.id}
                    className={this.props.className}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    autoFocus={true} 
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown} />
    },

    _onChange(event) {
        this.setState({
            value: event.target.value
        });
    },

    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.props.onSave(this.state.value);
            this.setState({
                value: ""
            });
        }
    }
});