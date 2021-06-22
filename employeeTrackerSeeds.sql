USE employee_trackerDB;

INSERT INTO department (id, name)
VALUES (id, "Applied Sciences");

INSERT INTO department (id, name)
VALUES (id, "Aerospace");

INSERT INTO department (id, name)
VALUES (id, "Energy");

INSERT INTO  (id, name)
VALUES (id, "Healthcare");

INSERT INTO role (id, title, salary, department_id)
VALUES (id, "President", 1000000.00, department_id);

INSERT INTO role (id, title, salary, department_id)
VALUES (id, "Director", 900000.00, department_id);

INSERT INTO role (id, title, salary, department_id)
VALUES (id, "Sales", 100000.00, department_id);

INSERT INTO role (id, title, salary, department_id)
VALUES (id, "Manager", 107000.00, department_id);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Bruce", "Wayne", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lucuis", "Fox", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alfred", "Pennywroth", 4, 2);