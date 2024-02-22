import React from "react";
import PropTypes from 'prop-types';

export default function Hyperlink(props) {
    return (<a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>)
}

Hyperlink.propTypes = {
    href: PropTypes.string.isRequired
}