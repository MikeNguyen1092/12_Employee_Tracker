-- getAllEmployees -- 
-- e is the alias for the left table employee
SELECT e.first_name, e.last_name, r.title, r.salary, d.name AS department_name, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- getAllRoles -- 
SELECT r.id, r.title, d.name AS department, r.salary
from role r
INNER JOIN department d ON r.department_id = d.id;
