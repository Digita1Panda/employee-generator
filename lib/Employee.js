// TODO: Write code to define and export the Employee class
class Employee {
  // Constructor properties added
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  // Following are methods to get employee details from the properties
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
