
# LoanLify React - QuickenLoans Style - Full Working

## Run
npm install
npm run dev  -> http://localhost:5173
npm run build -> dist folder

## Structure
- src/App.jsx = Main 5-step funnel (your screenshots exact flow)
  Step1: I want to (Use equity / Refinance / Buy)
  Step2: Main goal (Take cash out / Lower payment / ARM to Fixed / Other)
  Step3: Property Type + Value slider + Balance -> Equity calc
  Step4: Credit + Employment
  Step5: Lead Form (Name, Email, Phone, ZIP) -> Success

- 25-prelanders/ = 25 entry angles linking to main funnel

## Lead API Integration
In src/App.jsx handleSubmit replace with:
fetch('https://loanlify.com/api/leads', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})

## 25 Pages included
cash-out, lower-payment, arm-to-fixed, debt-consolidation, home-improvement, fha, va, investment, self-employed, fast-close, zero-closing, rate-drop, equity-calc, original replicas, zip-first, prequalified, advertorial, quiz, final-form, credit-check, property-value, purchase, thank-you, homepage

Not affiliated with Quicken Loans / Rocket Mortgage - original design inspired.
