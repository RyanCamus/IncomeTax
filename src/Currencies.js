export const Currencies = {
    async getExchangeRate(targetCurrency) {
        const baseUrl = 'https://api.exchangerate.host';
        const convertUrl = '/convert?from=';
        const currencies = `${targetCurrency}&to=GBP`;
        const endpoint = baseUrl + convertUrl + currencies
        try {
            const response = await fetch(endpoint);
            if(response.ok) {
                const jsonResponse = await response.json();
                const rate = jsonResponse.result
                console.log(`Exchange rate retrieved successfully. 1${targetCurrency} = ${rate}GBP`)
                return rate;
            }
            } catch (Error) {
                console.log(Error)
        }
    }
}

