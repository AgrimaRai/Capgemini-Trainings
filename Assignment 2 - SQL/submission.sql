-- 1. retrieve all employees in the IT department
SELECT e.*
FROM Employees e
JOIN Departments d ON e.DepartmentID = d.DepartmentID
WHERE d.DepartmentName = 'IT';

-- 2. find employees hired after 2010
SELECT *
FROM Employees
WHERE YEAR(HireDate) > 2010;

-- 3. list all the  projects with a budget exceeding $80,000
SELECT *
FROM Projects
WHERE Budget > 80000;

-- 4. sort alll employees by their hire date in descending order
SELECT *
FROM Employees
ORDER BY HireDate DESC;

-- 5. show projects sorted by their budget in ascending order
SELECT *
FROM Projects
ORDER BY Budget ASC;

-- 6.count the number of employees in each department
SELECT d.DepartmentName, COUNT(e.EmployeeID) as EmployeeCount
FROM Departments d
LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID
GROUP BY d.DepartmentName;

-- 7. display the top 3 employees with the highest base salary
SELECT e.FirstName, e.LastName, s.BaseSalary
FROM Employees e
JOIN Salaries s ON e.EmployeeID = s.EmployeeID
ORDER BY s.BaseSalary DESC
LIMIT 3;

-- 8. retrieve employee names along with their department names
SELECT e.FirstName, e.LastName, d.DepartmentName
FROM Employees e
JOIN Departments d ON e.DepartmentID = d.DepartmentID;

-- 9. list all th assignments, including employee and project details
SELECT e.FirstName, e.LastName, p.ProjectName, a.HoursWorked
FROM Assignments a
JOIN Employees e ON a.EmployeeID = e.EmployeeID
JOIN Projects p ON a.ProjectID = p.ProjectID;

-- 10. find employees working on the project with the highest budget
SELECT DISTINCT e.FirstName, e.LastName, p.ProjectName, p.Budget
FROM Employees e
JOIN Assignments a ON e.EmployeeID = a.EmployeeID
JOIN Projects p ON a.ProjectID = p.ProjectID
WHERE p.Budget = (SELECT MAX(Budget) FROM Projects);

-- 11. calculate the age of each employee
SELECT FirstName, LastName, 
       TIMESTAMPDIFF(YEAR, DateOfBirth, CURDATE()) as Age
FROM Employees;

-- 12. calculate the total salary (base + bonus) for each employee
SELECT e.FirstName, e.LastName, 
       (s.BaseSalary + COALESCE(s.Bonus, 0)) as TotalSalary
FROM Employees e
JOIN Salaries s ON e.EmployeeID = s.EmployeeID;
