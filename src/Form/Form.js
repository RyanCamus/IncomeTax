import React from 'react'
import './Form.css'

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputs = this.handleInputs.bind(this)
    }


    //collects all inputs together and passes them to App.js for processing. Name and value will both be used by the input handler in App.js
    handleInputs(e) {
        this.props.handleInputs(e.target.value, e.target.name)
    }

    fillCurrencies() {
      const currencies = ["GBP £", "USD $", "CNY ¥", "EUR €", "AUD A$", "CAD C$", "HKD HK$", "SGD S$", "RUB ₽", "JPY ¥", "INR ₹"];
      const listOfCurrencies = currencies.map((currency) => {
        return <option value={currency} key={currency}>{currency}</option>
      })
      return listOfCurrencies;
    }

    render() { 
        return(
        <form>
          <div className="currency survey">
            <label for="currency">Select currency: </label>
            <select name="currency" aria-label="This changes the input and output currencies only. The tax calculations are still based on GBP values." value={this.props.currency} onChange={this.handleInputs}>
              {this.fillCurrencies()}
            </select>
          </div>
          <p>How is your wage calculated?</p>
          <div className="radio survey" id="wageType" name="wageType" onChange={this.handleInputs}>
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
                <input type="number" name="hoursWorked" id="hours" step="5" max="168" min="0" onChange={this.handleInputs}/>
            </label>
          </div>

          <div className="wage-amount survey">
            <label>Wage amount in {this.props.currency}
                <input type="number" id="salary" name="wage" min="0" step={this.props.salaryStep} onChange={this.handleInputs}/>
            </label>
          </div>

          <div className="scotland survey" onChange={this.handleInputs}>Do you live in Scotland?<br />
                <label>Yes
                <input type="radio" name="isScotland" value={true}/>
                </label>
                <label>No
                <input type="radio" name="isScotland" value={false} defaultChecked/>
                </label>
          </div>

        </form>
        )
    }
}
