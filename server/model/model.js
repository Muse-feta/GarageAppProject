// companey table

const common_services = `CREATE TABLE IF NOT EXISTS common_services (
  service_id int(11) NOT NULL AUTO_INCREMENT,
  service_name varchar(255) NOT NULL,
  service_description TEXT,
  PRIMARY KEY (service_id)
)`;
const company_roles = `CREATE TABLE IF NOT EXISTS company_roles (
  company_role_id int(11) NOT NULL AUTO_INCREMENT,
  company_role_name varchar(255) NOT NULL,
  PRIMARY KEY (company_role_id),
  UNIQUE(company_role_name)
)`;


// cutomer table

const customerIdentifier = `CREATE TABLE IF NOT EXISTS customer_identifier (
  customer_id int(11) NOT NULL AUTO_INCREMENT,
  customer_email varchar(255) NOT NULL,
  customer_phone_number varchar(255) NOT NULL,
  customer_added_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  customer_hash varchar(255) NOT NULL,
  PRIMARY KEY (customer_id),
  UNIQUE (customer_email)
)`;

const customer_info = `CREATE TABLE IF NOT EXISTS customer_info (
  customer_info_id int(11) NOT NULL AUTO_INCREMENT,
  customer_id int(11) NOT NULL, 
  customer_first_name varchar(255) NOT NULL,
  customer_last_name varchar(255) NOT NULL,
  active_customer_status int(11) NOT NULL,
  PRIMARY KEY (customer_info_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
)`;

const customer_vehicle_info = `CREATE TABLE IF NOT EXISTS customer_vehicle_info (
  vehicle_id int(11) NOT NULL AUTO_INCREMENT,
  customer_id int(11) NOT NULL, 
  vehicle_year int(11) NOT NULL,
  vehicle_make varchar(255) NOT NULL,
  vehicle_model varchar(255) NOT NULL,
  vehicle_type varchar(255) NOT NULL,
  vehicle_mileage int(11) NOT NULL, 
  vehicle_tag varchar(255) NOT NULL,
  vehicle_serial varchar(255) NOT NULL,
  vehicle_color varchar(255) NOT NULL,
  PRIMARY KEY (vehicle_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
)`;

// employee table

const employee = `CREATE TABLE IF NOT EXISTS employee (
  employee_id int(11) NOT NULL AUTO_INCREMENT,
  employee_email varchar(255) NOT NULL,
  active_employee int(11) NOT NULL,
  added_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (employee_id), 
  UNIQUE (employee_email)
)`;

const employee_info = `CREATE TABLE IF NOT EXISTS employee_info (
  employee_info_id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) NOT NULL,
  employee_first_name varchar(255) NOT NULL,
  employee_last_name varchar(255) NOT NULL,
  employee_phone varchar(255) NOT NULL,
  PRIMARY KEY (employee_info_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
)`;

const employee_pass = `CREATE TABLE IF NOT EXISTS employee_pass (
  employee_pass_id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) NOT NULL,
  employee_password_hashed varchar(255) NOT NULL,
  PRIMARY KEY (employee_pass_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
)`;

const employee_role = `CREATE TABLE IF NOT EXISTS employee_role (
  employee_role_id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) NOT NULL,
  company_role_id int(11) NOT NULL,
  PRIMARY KEY (employee_role_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
  FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id)
)`;




// order table

const orders = `CREATE TABLE IF NOT EXISTS orders (
  order_id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) NOT NULL,
  customer_id int(11) NOT NULL,
  vehicle_id int(11) NOT NULL,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  active_order int(11) NOT NULL,
  order_hash varchar(255) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id), 
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle_info(vehicle_id)
)`;

const order_status = `CREATE TABLE IF NOT EXISTS order_status (
  order_status_id int(11) NOT NULL AUTO_INCREMENT,
  order_id int(11) NOT NULL,
  order_status int(11) NOT NULL,
  PRIMARY KEY (order_status_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
)`;

const order_services = `CREATE TABLE IF NOT EXISTS order_services (
  order_service_id int(11) NOT NULL AUTO_INCREMENT,
  order_id int(11) NOT NULL,
  service_id int(11) NOT NULL,
  service_completed int(11) NOT NULL,
  PRIMARY KEY (order_service_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (service_id) REFERENCES common_services(service_id)
)`;

const order_info = `CREATE TABLE IF NOT EXISTS order_info (
  order_info_id int(11) NOT NULL AUTO_INCREMENT,
  order_id int(11) NOT NULL,
  order_total_price int(11) NOT NULL,
  estimated_completion_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  completion_date DATETIME,
  additional_request TEXT,
  notes_for_internal_use TEXT,
  notes_for_customer TEXT,
  additional_requests_completed int(11) NOT NULL,
  PRIMARY KEY (order_info_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
)`;


module.exports = {common_services, company_roles, customerIdentifier, customer_info,customer_vehicle_info, employee_info, employee, employee_pass, employee_role, orders, order_status, order_info, order_services}



