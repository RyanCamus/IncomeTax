import React from 'react'
import './LearnMore.css'

export class LearnMore extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        return (
        <ul>In these calculations, we assume that:
            <li>You are not self-employed</li>
            <li>You do not live in Scotland</li>
            <li>You do not have allowances such as marriage, student, disability, state pension or age-related allowances.</li>
            <li>This guide is for employees, not employers</li>
            <li>These values are valid until April 5th, 2023. If it is already past that date, shoot me an email.</li>
            <li>For suggestions and/or issues with this app, email me!</li>
        </ul>
        )
    }

    render() {
        return (
            <div onClick={this.handleClick}>Learn More
                <ul>Next steps:
                    <li>Results tabs for month, week, hour</li>
                    <li>Write explanations which can be revealed with a transition in a "learn more" tab</li>
                    <li>Link to currency exchange API</li>
                    <li>Clean up App.js: put complex methods into a separate file, combine everything into a single setState using [statename var]</li>
                    <li>Deploy</li>
                </ul>
            </div>
        );
    }
}
