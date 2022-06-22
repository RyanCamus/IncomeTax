# UK income tax calculator

This simple app uses data from the UK government to estimate the amount of tax you will pay on your income. 

## Features

Find out how much tax you should pay:
- Based on how much you are paid per year/month/week/hour (if you choose hourly wage, you can specify the number of hours you work per week)
- Input your income in a number of different currencies (you can add more currencies in the Form.js file, by entering the 3-letter currency code and currency symbol in the "currencies" array)
- See the amount of Income Tax and National Insurance fees you will pay, as well as your Gross and Net Income
- Convert the tax and income to annual/monthly/weekly/hourly values

## Usage

Fill out the form, and your results will appear. Changes to any form input updates the results in real time. 

## Assumptions

- You work for 12 months / 52 weeks per year.
- Unless stated otherwise, you work 40 hours a week.
- Your salary does not change over the course of the year  
- Bonuses are not taken into account.
- You do not have any special tax allowances (if there is a lot of demand for this, I may add it as a feature)
- Your income comes entirely from the UK

## Additional information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  
Unfortunately I only learned about functional components towards the end of this project, so it's all written using class components. Never making that mistake again.  
I used the react-tabs npm package for the results tabs.  
Currency conversions provided by exchangerate.host  
This is my first react project, so any feedback is very welcome.  
