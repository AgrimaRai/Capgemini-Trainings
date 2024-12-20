document.getElementById('calculateBtn').addEventListener('click', function () {
    const salary = parseFloat(document.getElementById('salary').value);
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const loanType = document.getElementById('loanType').value;
  
    // Interest rates per annum
    const interestRates = {
      home: 7,
      car: 8,
      education: 5,
    };
  
    if (isNaN(salary) || isNaN(loanAmount) || !loanType) {
      alert('Please fill all fields correctly.');
      return;
    }
  
    // Determine maximum loan duration based on salary
    let maxDurationYears;
    if (salary < 25000) {
      maxDurationYears = 5;
    } else if (salary < 50000) {
      maxDurationYears = 10;
    } else {
      maxDurationYears = 15;
    }
  
    const annualInterestRate = interestRates[loanType];
    const monthlyInterestRate = annualInterestRate / (12 * 100);
    const maxDurationMonths = maxDurationYears * 12;
  
    // EMI Calculation
    const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, maxDurationMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, maxDurationMonths) - 1;
    const emi = numerator / denominator;
  
    // Display results
    document.getElementById('emiOutput').textContent = `Your EMI: ₹${emi.toFixed(2)}`;
    document.getElementById('durationOutput').textContent = `Suggested Loan Duration: ${maxDurationYears} years`;
  });