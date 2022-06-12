import './App.css';
import React from 'react';
import { Form } from '../Form/Form'
import { Results } from '../Results/Results'
import { TaxCalculator } from '../TaxCalculator/taxCalculator';
import { LearnMore } from '../LearnMore/LearnMore';
import { Header } from '../Header/Header'

export class App extends React.Component {
  //condense currency elements into a single array
  //condense other states as much as possible too
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
      currency: "GBP",
      currencySymbol: '£',
      currencyMultiplier: 1,
      incomeTax: 0,
      insuranceTax: 0,
      netIncome: 0,
      isScotland: false,
    })
    this.handleWage = this.handleWage.bind(this);
    this.changeWageType = this.changeWageType.bind(this);
    this.handleHoursWorked = this.handleHoursWorked.bind(this);
    this.updateIncome = this.updateIncome.bind(this)
    this.showHoursWorked = this.showHoursWorked.bind(this)
    this.switchCurrency = this.switchCurrency.bind(this)
    this.handleScotland = this.handleScotland.bind(this)
  }  
  
  switchCurrency(currency) {
    let currencyMultiplier;
    let currencySymbol;
    switch(currency) {
      case 'USD': 
        currencyMultiplier=0.81;
        currencySymbol='$'; 
        break;
      case 'RMB': 
        currencyMultiplier=0.12;
        currencySymbol='¥'; 
        break;
      default: 
        currencyMultiplier=1; 
        currencySymbol='£'
        break;
    }
    this.setState({
      currency: currency,
      currencyMultiplier: currencyMultiplier,
      currencySymbol: currencySymbol,
    }, () => this.updateIncome())
  }

  handleWage(wage) {
    this.setState({wage: wage}, () => this.updateIncome())
  }

  handleHoursWorked(hours) {
    this.setState({hoursWorked: hours}, () => { this.changeWageType('hourly') })
  }

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
  }

  showHoursWorked() {
    if(this.state.wageType==="hourly") {
      this.setState({showHoursWorked: "block"})
    } else {
      this.setState({showHoursWorked: "none"})
    }
  }

  handleScotland(isScotland) {
    this.setState({isScotland: isScotland},
      () => this.calculateTax())
  }

  updateIncome() {
    this.setState({
      income: this.state.wage*this.state.wageMultiplier*this.state.currencyMultiplier, 
    }, () => this.calculateTax())
  }

  calculateTax() {
    let incomeTax=0;
    if(this.state.isScotland==="true") {
      incomeTax = new TaxCalculator('incomeTax', [150000, 43663, 25689, 14733, 12570], [0.46, 0.41, 0.21, 0.2, 0.19], this.state.income)
    } else {
      incomeTax = new TaxCalculator('incomeTax', [150000, 50270, 12570], [0.45, 0.4, 0.2], this.state.income)
    }
    const insuranceTax = new TaxCalculator('insuranceTax', [50270, 12570], [0.0325, 0.1325], this.state.income)
    this.setState({
      incomeTax: incomeTax.taxAmount(),
      insuranceTax: insuranceTax.taxAmount(),
      netIncome: this.state.income - incomeTax.taxAmount() - insuranceTax.taxAmount()
    })
  }
  
  renderResults() {
    if(this.state.netIncome) {
      return (
        <section id="results">
          <Results income={this.state.income}
            incomeTax={this.state.incomeTax}
            insuranceTax={this.state.insuranceTax}
            netIncome={this.state.netIncome}
            currency={this.state.currency}
            currencySymbol={this.state.currencySymbol}
            currencyMultiplier={this.state.currencyMultiplier}
            />
        </section>
      )
    }
    return
  }

  render() {
    return (
          <main>
            <header>
              <Header />
            </header>
            <section id="form">
              <Form handleWage={this.handleWage} 
                changeWageType={this.changeWageType}
                showHoursWorked={this.state.showHoursWorked}
                handleHoursWorked={this.handleHoursWorked}
                salaryStep={this.state.salaryStep}
                switchCurrency={this.switchCurrency}
                currency={this.state.currency}
                handleScotland={this.handleScotland}
                />
            </section>
            {this.renderResults()}
            <section id="learn-more">
              <LearnMore />
            </section>
          </main>
    )
  }
}