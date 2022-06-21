import React from 'react'
import './Header.css'

export class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>UK Income Tax Calculator</h1>
                <h3 role="contentinfo">Use this tool to calculate how much tax you will pay based on your income.</h3>
                <h4>Also check out some of my other projects:</h4>
                <nav>
                    <ul>
                        <a href="localhost:3000"><li>UK Income Tax Calculator</li></a>
                        <a href="localhost:3000"><li>Cocktailator</li></a>
                        <a href="localhost:3000"><li>Handy Timezones</li></a>
                        <a href="localhost:3000"><li>TimerApp</li></a>
                        <a href="localhost:3000"><li>Project lists</li></a>
                        <a href="localhost:3000"><li>Daily calendar app</li></a>
                        <a href="localhost:3000"><li>The Spinny Wheel of Choices</li></a>
                        <a href="localhost:3000"><li>Math practice module</li></a>
                    </ul>
                </nav>
            </div>
        )
    }
}
//some day, make the list items into a component <List />
//you give the wheel some choices, it spins and picks a choice for you. If you don't like it spin again until you like the answer. https://pickerwheel.com/
//timer app is good for lifecycle methods and other timebased shenanigans
//Timezones to learn how to implement APIs and local storage
//Calendar app for scheduling your day, with option to add time blocks --> practice for drinks logger
//project lists for housework, admin work, baijiu work, code work. Options for saving locally, deadlines, partial completion, estimated time for completion, sub-tasks, reason for the task
//combine project list with timezones (deadlines/meetings), spinny wheel (pick something to do from the lists), timer (measure how long you are working on something, compare with target time) and daily calendar (autofill/assisted fill timeslots with tasks from the list, or fill each day's slots with tasks from one category)