import React from 'react';

let Project = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired
    },
    render(){
        return (
            <div>
                {this.props.namePlaceholder}
                <div className="col-sm-8">ID projektu / klienta: {this.props.data.id}</div>
                <div className="col-sm-2">info o projekcie</div>
            </div>
        )
    }
});

export default Project;