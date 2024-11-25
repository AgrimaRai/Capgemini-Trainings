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



-- 13. find all employees hired in 2015
SELECT *
FROM Employees
WHERE YEAR(HireDate) = 2015;

-- 14. retrieve the names of projects ending before December 2023
SELECT ProjectName, EndDate
FROM Projects
WHERE EndDate < '2023-12-01';

-- 15. list employees with base salaries greater than $70,000
SELECT e.FirstName, e.LastName, s.BaseSalary
FROM Employees e
JOIN Salaries s ON e.EmployeeID = s.EmployeeID
WHERE s.BaseSalary > 70000;

-- 16. count the number of projects handled by each employee
SELECT e.FirstName, e.LastName, COUNT(a.ProjectID) as ProjectCount
FROM Employees e
LEFT JOIN Assignments a ON e.EmployeeID = a.EmployeeID
GROUP BY e.EmployeeID, e.FirstName, e.LastName;

-- 17. list all departments located in "San Francisco"
SELECT *
FROM Departments
WHERE Location = 'San Francisco';

-- 18.display project names along with total hours worked on each
SELECT p.ProjectName, SUM(a.HoursWorked) as TotalHours
FROM Projects p
LEFT JOIN Assignments a ON p.ProjectID = a.ProjectID
GROUP BY p.ProjectID, p.ProjectName;

-- 19.find the highest bonus received by any employee
SELECT e.FirstName, e.LastName, s.Bonus
FROM Employees e
JOIN Salaries s ON e.EmployeeID = s.EmployeeID
WHERE s.Bonus = (SELECT MAX(Bonus) FROM Salaries);

-- 20. identify projects that lasted for more than 12 months
SELECT ProjectName, StartDate, EndDate,
       TIMESTAMPDIFF(MONTH, StartDate, EndDate) as DurationInMonths
FROM Projects
WHERE TIMESTAMPDIFF(MONTH, StartDate, EndDate) > 12;

-- 21.retrieve all projects starting in 2023
SELECT *
FROM Projects
WHERE YEAR(StartDate) = 2023;

-- 22.calculate the total hours worked by each employee across all projects
SELECT e.FirstName, e.LastName, SUM(a.HoursWorked) as TotalHoursWorked
FROM Employees e
LEFT JOIN Assignments a ON e.EmployeeID = a.EmployeeID
GROUP BY e.EmployeeID, e.FirstName, e.LastName;

-- 23.find the department with the most employees
SELECT d.DepartmentName, COUNT(e.EmployeeID) as EmployeeCount
FROM Departments d
LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID
GROUP BY d.DepartmentID, d.DepartmentName
HAVING COUNT(e.EmployeeID) = (
    SELECT COUNT(EmployeeID)
    FROM Employees
    GROUP BY DepartmentID
    ORDER BY COUNT(EmployeeID) DESC
    LIMIT 1
);

-- 24.list all thee employees who were born before 1985
SELECT FirstName, LastName, DateOfBirth
FROM Employees
WHERE YEAR(DateOfBirth) < 1985;
