import React from 'react'
import './Results.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './TabStyles.css';

export class Results extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            style: {
                opacity: 0,
                transition: 'all 2s ease',
            }
        })
        this.mountStyle = this.mountStyle.bind(this)

    }

    numberWrapper(number) {
        let amount = Math.floor((number/this.props.currencyMultiplier)*100)/100
        return `${this.props.currency.slice(4)}${amount.toLocaleString(undefined, {minimumFractionDigits: 2})}`
    }

    mountStyle() {
       this.setState({style: {opacity: 1, transition: 'all 3s ease'}})
    }
    //on mount, waits 10ms then changes opacity to 1. 
    //Creating an unmount animation would require Results.js to be constantly mounted, with its contents not shown so it can be transitioned in and out of being shown
    componentDidMount() {
        setTimeout(this.mountStyle, 10)
    }
    
    showResults(type) {
        let divider = 1;
        let numOfHours = '';
        switch(type) {
            case "hour": 
                this.props.wageType === 'hourly'? numOfHours=this.props.workHours : numOfHours = 40;
                divider = 52 * numOfHours;
                break;
            case "week": divider = 52; break;
            case "month": divider = 12; break;
            default: divider = 1; break;
        }
        return (
            <ul className="responseList">
                <li>With your gross income of {this.numberWrapper(this.props.income/divider)} per {type} {type==='hour' && `(assuming you work ${numOfHours} hours per week)`}</li>
                <li>You will pay {this.numberWrapper(this.props.taxes[0]/divider)} in income tax</li>
                <li>And {this.numberWrapper(this.props.taxes[1]/divider)} for National Insurance. </li>
                <li className="net-income">Leaving you with a net income of <strong>{this.numberWrapper(this.props.taxes[2]/divider)}</strong> per {type}</li>
            </ul>
        )
    }

    render() {
        return (
            (
        <div style={this.state.style}>
            <Tabs>
                    <TabList role="tablist">
                        <Tab role="tabpanel">Year</Tab>
                        <Tab role="tabpanel">Month</Tab>
                        <Tab role="tabpanel">Week</Tab>
                        <Tab role="tabpanel">Hours</Tab>
                    </TabList>
                <section id="results" role="listbox">
                    <TabPanel>
                        {this.showResults("year")}
                    </TabPanel>
                    <TabPanel>
                        {this.showResults("month")}
                    </TabPanel>
                    <TabPanel>
                        {this.showResults("week")}
                    </TabPanel>
                    <TabPanel>
                        {this.showResults("hour")}
                    </TabPanel>
                </section>
            </Tabs>

        </div>
            )
        );
    }
}
