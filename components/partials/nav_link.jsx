import React from 'react';
import { Link } from 'react-router';

let NavLink = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    render() {
        let isActive = this.context.router.isActive(this.props.to, true),
            className = isActive ? " active" : "";

        return (
            <li className={'nav-item' + className}>
                <Link {...this.props}>{this.props.children}</Link>
            </li>
        )
    }
});

export default NavLink;