export class TaxCalculator {
    constructor(taxType, taxLimits, taxRates, income) {
        this._taxType = taxType;
        this._taxLimits = taxLimits;
        this._taxRates = taxRates;
        this._income = income;
    }
    get income() {
        return this._income
    }
    taxAmount() {
        let tax = 0;
        let remIncome = this._income;
        const taxRates = this._taxRates
        this._taxLimits.forEach(function(limit, i) {
            if(remIncome > limit) {
                tax += (remIncome - limit) * taxRates[i];
                remIncome = limit;
            }
        })
        if(this._income > 125140 && this._taxType==='incomeTax') {
            tax += (this._taxLimits[2])*this._taxRates[2]
        }
        return tax
    }
}