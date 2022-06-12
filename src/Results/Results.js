import React from 'react'
import './Results.css'

export class Results extends React.Component {

    numberWrapper(number) {
        let amount = Math.floor((number/this.props.currencyMultiplier)*100)/100
        return `${this.props.currencySymbol}${amount.toLocaleString(undefined, {minimumFractionDigits: 2})}`
    }
    
    render() {
        return (
            <div>
                <ul className="responseList">
                    <li>With your annual gross income of {this.numberWrapper(this.props.income)}</li>
                    <li>You will pay {this.numberWrapper(this.props.incomeTax)} in income tax</li>
                    <li>And {this.numberWrapper(this.props.insuranceTax)} for National Insurance. </li>
                    <li className="net-income">Leaving you with a net income of <strong>{this.numberWrapper(this.props.netIncome)}</strong></li>
                </ul>
            </div>
        );
    }
}
