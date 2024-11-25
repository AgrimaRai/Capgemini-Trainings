-- 1.list all customers and their accounts with balances
SELECT c.CustomerID, c.FirstName, c.LastName, a.AccountType, a.Balance
FROM Customers c
JOIN Accounts a ON c.CustomerID = a.CustomerID
ORDER BY c.CustomerID;

-- 2.list employees managing branches with total account balances > $20,000
SELECT DISTINCT
e.EmployeeID,
e.FirstName,
e.LastName,
e.Role,
b.BranchName,
SUM(a.Balance) OVER (PARTITION BY b.BranchID) as TotalBranchBalance
FROM Employees e
JOIN Branches b ON e.BranchID = b.BranchID
JOIN Accounts a ON b.BranchID = a.BranchID
GROUP BY e.EmployeeID, e.FirstName, e.LastName, e.Role, b.BranchName, b.BranchID, a.Balance
HAVING SUM(a.Balance) OVER (PARTITION BY b.BranchID) > 20000;

-- 3.identify accounts with balance higher than branch average
WITH BranchAvg AS (
SELECT 
    b.BranchID,
    AVG(a.Balance) as AvgBalance
FROM Branches b
JOIN Accounts a ON b.BranchID = a.BranchID
GROUP BY b.BranchID
)
SELECT a.AccountID, c.FirstName, c.LastName, a.Balance, ba.AvgBalance as BranchAvgBalance
FROM Accounts a
JOIN Customers c ON a.CustomerID = c.CustomerID
JOIN BranchAvg ba ON a.BranchID = ba.BranchID
WHERE a.Balance > ba.AvgBalance;

-- 4.find customers with transactions > $1,000
SELECT DISTINCT
c.CustomerID,
c.FirstName,
c.LastName,
t.Amount,
t.TransactionType
FROM Customers c
JOIN Accounts a ON c.CustomerID = a.CustomerID
JOIN Transactions t ON a.AccountID = t.AccountID
WHERE t.Amount > 1000;

-- 5.get total deposits and withdrawals by account
SELECT 
a.AccountID,
a.AccountType,
SUM(CASE WHEN t.TransactionType = 'Deposit' THEN t.Amount ELSE 0 END) as TotalDeposits,
SUM(CASE WHEN t.TransactionType = 'Withdrawal' THEN t.Amount ELSE 0 END) as TotalWithdrawals
FROM Accounts a
LEFT JOIN Transactions t ON a.AccountID = t.AccountID
GROUP BY a.AccountID, a.AccountType;

-- 6.find customer pairs with same account type and branch
SELECT DISTINCT
c1.FirstName as Customer1_FirstName,
c1.LastName as Customer1_LastName,
c2.FirstName as Customer2_FirstName,
c2.LastName as Customer2_LastName,
a1.AccountType,
b.BranchName
FROM Customers c1
JOIN Accounts a1 ON c1.CustomerID = a1.CustomerID
JOIN Branches b ON a1.BranchID = b.BranchID
JOIN Accounts a2 ON a1.AccountType = a2.AccountType AND a1.BranchID = a2.BranchID
JOIN Customers c2 ON a2.CustomerID = c2.CustomerID
WHERE c1.CustomerID < c2.CustomerID;

-- 7.find customers with no transactions
SELECT 
c.CustomerID,
c.FirstName,
c.LastName
FROM Customers c
LEFT JOIN Accounts a ON c.CustomerID = a.CustomerID
LEFT JOIN Transactions t ON a.AccountID = t.AccountID
WHERE t.TransactionID IS NULL;

-- 8.rank customers by total balance
SELECT 
c.CustomerID,
c.FirstName,
c.LastName,
SUM(a.Balance) as TotalBalance,
RANK() OVER (ORDER BY SUM(a.Balance) DESC) as BalanceRank
FROM Customers c
JOIN Accounts a ON c.CustomerID = a.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName;

-- 9.liist employees with above-average salary in their branch
WITH BranchAvgSalary AS (
SELECT 
    BranchID,
    AVG(Salary) as AvgBranchSalary
FROM Employees
GROUP BY BranchID
)
SELECT 
e.EmployeeID,
e.FirstName,
e.LastName,
e.Role,
e.Salary,
b.BranchName,
bas.AvgBranchSalary
FROM Employees e
JOIN Branches b ON e.BranchID = b.BranchID
JOIN BranchAvgSalary bas ON e.BranchID = bas.BranchID
WHERE e.Salary > bas.AvgBranchSalary
ORDER BY b.BranchID, e.Salary DESC;
