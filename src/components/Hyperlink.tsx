import React from "react";

export default function Hyperlink(props: { href: string, children: React.ReactNode }) {
    return (<a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>)
}