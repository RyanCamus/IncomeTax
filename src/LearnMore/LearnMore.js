import React from 'react'
import './LearnMore.css'
import chevron from '../Icons/chevron-down.svg'

export class LearnMore extends React.Component {
    constructor(props) {
        super(props)
        this.state=(
            {
                collapsed: true,
                chevron: {transform: "rotate(0)"},
                collapsible: {height: "auto"},
                height: '',
            }
        )
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const newState = !this.state.collapsed;
        const height = !newState ? this.state.height: "0";
        const rotate = newState ? "rotate(0)": "rotate(180deg)";
        this.setState({
            collapsed: newState, 
            chevron: {transform: rotate},
            collapsible: {height: height}
        })
    }

    //calculates height of div element, saves it to "height" then hides the div. It was a real pain to find this solution, all just to make sure the Learn More tab open with a transition
    componentDidMount() {
        const height = `${this.divElement.clientHeight}px`
        this.setState({
            height: height,
            collapsible: {height: "0"}, 
        })
    }
    
    render() {
        return (
            <section id="learn-more" onClick={this.handleClick} role="button">
                <h3>Learn More <img alt="arrow for the dropdown menu" src={chevron} className="chevron" style={this.state.chevron}></img></h3>
                
            <div className="collapsible" style={this.state.collapsible} ref={ (divElement) => {this.divElement = divElement}} role="complementary">
                <ul><strong>In these calculations, we assume that:</strong>
                    <li>You are not self-employed</li>
                    <li>You do not have allowances such as marriage, student, disability, state pension or age-related allowances.</li><br />
                    <li>This guide is for employees, not employers</li>
                    <li>These values are valid until April 5th, 2023. If it is already past that date, let me know!</li>
                    <li>Currency exchange rates are updated daily. Want to add another currency? Let me know!</li>
                    <li>For suggestions and/or issues with this app, visit my <a href="https://github.com/RyanCamus/IncomeTax">GitHub</a></li>
                </ul>
                <ul aria-label="Wow I didn't expect anyone to make it this far. Thanks for using my app, I hope you found it useful! Let me know if there's anything I could have done to make your experience better: ryan_camus@hotmail.fr">This project is made possible by:
                    <li>create-react-app</li>
                    <li>react-tabs</li>
                    <li><a href="https://exchangerate.host/">exchangerate.host</a>'s awesome free API</li>
                    <li>Hosted by Netlify</li>
                </ul>
            </div>
            </section>
        );
    }
}
