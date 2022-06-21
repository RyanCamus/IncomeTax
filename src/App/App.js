import './App.css';
import React from 'react';
import { Form } from '../Form/Form'
import { Results } from '../Results/Results'
import { TaxCalculator } from '../TaxCalculator/taxCalculator';
import { LearnMore } from '../LearnMore/LearnMore';
import { Header } from '../Header/Header'
import { Currencies } from '../Currencies'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state= ({ 
      wage: 0,
      income: 0,
      wageType: '',
      wageMultiplier: 1,
      hoursWorked: 0,
      salaryStep: 1,
      showHoursWorked: "none",
      currency: "GBP £",
      currencyMultiplier: 1,
      isScotland: false,
      taxes: [0, 0, 0],
    })
    this.updateIncome = this.updateIncome.bind(this)
    this.handleInputs = this.handleInputs.bind(this)
  }  

  //collects all inputted values from Form.js, initiates further processing if necessary
  handleInputs(value, name) {
    if(name==="currency") {
      this.switchCurrency(value);
    } else if(name==="wageType") {
      this.changeWageType(value)
    } else if(name==="hoursWorked") {
      this.setState({hoursWorked: value}, () => this.changeWageType('hourly'))
    } else {
      this.setState({[name]: value}, () => this.updateIncome())
    }
  }
  

  //changes the currency and currency conversion multiplier using converter API. Next step: fetch countries, codes and symbols from the API
  async switchCurrency(currency) {
    let targetCurrency = currency.slice(0,3);
    let currencyMultiplier = await Currencies.getExchangeRate(targetCurrency);
    if (typeof currencyMultiplier === "number") {
      this.setState({
        currency: currency,
        currencyMultiplier: currencyMultiplier,
      }, () => this.updateIncome())
    } else {
      window.alert('Error with the currency converter API. Please try again later. (you can still use the app, just can\'t change currencies)')
    }
  }

  //changes the income calculation and number input step-up/down based on type of wage
  changeWageType(wageType) {
    let wageMultiplier;
    let salaryStep;
    switch(wageType) {
      case 'hourly': 
        wageMultiplier = this.state.hoursWorked * 52
        salaryStep = 1;
        break;
      case 'weekly':
        wageMultiplier = 52
        salaryStep = 50;
        break;
      case 'monthly':
        wageMultiplier = 12;
        salaryStep = 100;
        break;
      default: 
        wageMultiplier = 1
        salaryStep = 1000;
    }
    this.setState({
      wageType: wageType,
      salaryStep: salaryStep,
      wageMultiplier: wageMultiplier
    }, function() {
      this.showHoursWorked()
      this.updateIncome()
    })
    //calls showHoursWorked to make the hours input appear and disappear
  }

  //makes number of hours worked input appear or disappear
  showHoursWorked() {
    if(this.state.wageType==="hourly") {
      this.setState({showHoursWorked: "block"})
    } else {
      this.setState({showHoursWorked: "none"})
    }
  }

  //updates income amount whenever an input is changed
  updateIncome() {
    this.setState({
      income: this.state.wage*this.state.wageMultiplier*this.state.currencyMultiplier, 
    }, () => this.calculateTax())
  }

  //calculates taxes and net income based on income
  calculateTax() {
    let incomeTax=0;
    if(this.state.isScotland==="true") {
      incomeTax = new TaxCalculator('incomeTax', [150000, 43663, 25689, 14733, 12570], [0.46, 0.41, 0.21, 0.2, 0.19], this.state.income)
    } else {
      incomeTax = new TaxCalculator('incomeTax', [150000, 50270, 12570], [0.45, 0.4, 0.2], this.state.income)
    }
    const insuranceTax = new TaxCalculator('insuranceTax', [50270, 12570], [0.0325, 0.1325], this.state.income)

    this.setState({
      taxes: [incomeTax.taxAmount(), 
        insuranceTax.taxAmount(), 
        this.state.income - incomeTax.taxAmount() - insuranceTax.taxAmount()
      ],
    })
  }

  render() {
    return (
          <main>
            <header>
              <Header />
            </header>
            <section id="form" aria-label="If you are using a screen reader, please note that the results will only appear after you have filled every part of the form. There is no submit button, the results will automatically appear once the form has been filled.">
              <Form
                showHoursWorked={this.state.showHoursWorked}
                salaryStep={this.state.salaryStep}
                currency={this.state.currency}
                handleInputs={this.handleInputs}
                />
            </section>
            {this.state.taxes[2] ? <Results 
            taxes={this.state.taxes}
            income={this.state.income}
            currency={this.state.currency}
            currencyMultiplier={this.state.currencyMultiplier}
            workHours={this.state.hoursWorked}
            wageType={this.state.wageType}
            />: ''}
              <LearnMore />
          </main>
    )
  }
}