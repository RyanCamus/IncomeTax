import React from 'react'
import './Header.css'

export class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>UK Income Tax Calculator</h1>
                <h3>Use this tool to calculate how much tax you will pay based on your income.</h3>

                <nav>
                <h4>Also check out some of my other projects:</h4>
                    <ul>
                        <a href="localhost:3000"><li>UK Income Tax Calculator</li></a>
                        <li>Cocktailator</li>
                        <li>Handy Timezones</li>
                        <li>TimerApp</li>
                    </ul>
                </nav>
            </div>
        )
    }
}
