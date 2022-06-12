import React from 'react'
import './Form.css'

export class Form extends React.Component {
    //Takes in information from the form and sends it to App.js for processing
    constructor(props) {
        super(props);
        this.handleWage = this.handleWage.bind(this);
        this.handleHoursWorked = this.handleHoursWorked.bind(this);
        this.changeWageType = this.changeWageType.bind(this);
        this.switchCurrency = this.switchCurrency.bind(this);
        this.handleScotland = this.handleScotland.bind(this);
    }

    //combine all of these into a single function?

    handleWage(e) {
        this.props.handleWage(e.target.value)
    }

    changeWageType(e) {  
        this.props.changeWageType(e.target.value)
    }

    handleHoursWorked(e) {
        this.props.handleHoursWorked(e.target.value)
    }

    switchCurrency(e) {
        this.props.switchCurrency(e.target.value)
    }

    handleScotland(e) {
        this.props.handleScotland(e.target.value)
    }

    render() { 
        return(
        <form>
          <div className="currency survey">
            <label for="currency">Select currency: (exchange rates updated 11/06/2022)  </label>
            <select value={this.props.currency} onChange={this.switchCurrency}>
                <option value="GBP">GBP £</option>
                <option value="USD">USD $</option>
                <option value="RMB">RMB ¥</option>
            </select>
          </div>
          <p>How is your wage calculated?</p>
          <div className="radio survey" id="wageType" onChange={this.changeWageType}>
          <div>
            <label for="hourly">Hourly<br />
            <input type="radio" name="wageType" id="hourly" value="hourly" />
            </label>
          </div>
          <div>
            <label for="weekly">Weekly<br />
            <input type="radio" name="wageType" id="weekly" value="weekly" />
            </label>
          </div>
          <div>
            <label for="monthly">Monthly<br />
            <input type="radio" name="wageType" id="monthly" value="monthly" />
            </label>
          </div>
          <div>
            <label for="yearly">Yearly<br />
            <input type="radio" name="wageType" id="yearly" value="yearly" />
            </label>
          </div>
          </div>

          <div className="hours-worked survey" id="hoursWorked" style={{display: this.props.showHoursWorked}}>
            <label>Approximately how many hours do you work per week?
                <input type="number" id="hours" step="5" max="168" min="0" onChange={this.handleHoursWorked}/>
            </label>
          </div>

          <div className="wage-amount survey">
            <label>Wage amount in {this.props.currency}
                <input type="number" id="salary" min="0" step={this.props.salaryStep} onChange={this.handleWage}/>
            </label>
          </div>

          <div className="scotland survey" onChange={this.handleScotland}>Do you live in Scotland?<br />
                <label>Yes
                <input type="radio" name="scotland" value={true}/>
                </label>
                <label>No
                <input type="radio" name="scotland" value={false} />
                </label>
          </div>

        </form>
        )
    }
}
