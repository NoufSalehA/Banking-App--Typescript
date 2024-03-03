class Bank {
  constructor(name) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch) {
    if (!this.branches.includes(branch)) {
      this.branches.push(branch);
      return true;
    }
    return false;
  }

  addCustomer(branch, customer) {
    // Validate required fields
    if (!customer.name.trim() || !customer.id || !customer.transactions) {
      console.error("Customer data is incomplete.");
      return false;
    }

    // Validate data format if necessary

    if (!branch.customers.includes(customer)) {
      branch.customers.push(customer);
      return true;
    }
    return false;
  }

  addCustomerTransaction(branch, customerId, amount) {
    const customer = branch.findCustomerById(customerId);
    if (customer) {
      // Validate amount
      if (isNaN(amount) || amount <= 0) {
        console.error("Invalid transaction amount.");
        return false;
      }
      return customer.addTransaction(amount);
    }
    return false;
  }

  findBranchByName(branchName) {
    const matchedBranches = this.branches.filter(
      (branch) => branch.name === branchName
    );
    return matchedBranches.length > 0 ? matchedBranches : null;
  }

  checkBranch(branch) {
    return this.branches.includes(branch);
  }
  listCustomers(branch, includeTransactions) {
    console.log(`Customers for branch ${branch.getName()}:`);
    branch.customers.forEach((customer) => {
      console.log(`Customer: ${customer.getName()}`);
      if (includeTransactions) {
        console.log("Transactions:");
        customer.transactions.forEach((transaction) => {
          console.log(
            `Amount: ${transaction.amount}, Date: ${transaction.date}`
          );
        });
      }
    });
  }
}

class Branch {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }
  getName() {
    return this.name;
  }

  getCustomers() {
    return this.customers;
  }

  addCustomer(customer) {
    // Validate required fields
    if (!customer.name.trim() || !customer.id || !customer.transactions) {
      console.error("Customer data is incomplete.");
      return false;
    }

    // Validate data format if necessary

    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      return true;
    }
    return false;
  }

  addCustomerTransaction(customerId, amount) {
    const customer = this.findCustomerById(customerId);
    if (customer) {
      // Validate amount
      if (isNaN(amount) || amount <= 0) {
        console.error("Invalid transaction amount.");
        return false;
      }
      return customer.addTransaction(amount);
    }
    return false;
  }
  findCustomerById(customerId) {
    return this.customers.find((customer) => customer.getId() === customerId);
  }
}

class Customer {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }
  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getTransactions() {
    return this.transactions;
  }

  getBalance() {
    return this.transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }

  addTransaction(amount) {
    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      console.error("Invalid transaction amount.");
      return false;
    }

    // Other validation checks if necessary

    this.transactions.push(new Transaction(amount, new Date()));
    return true;
  }
}

class Transaction {
  constructor(amount, date) {
    this.amount = amount;
    this.date = date;
  }
}

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);

arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);

customer1.addTransaction(1000);

console.log("Customer 1 Balance:", customer1.getBalance());

console.log("West Branch Customers:");
arizonaBank.listCustomers(westBranch, true);

console.log("Sun Branch Customers:");
arizonaBank.listCustomers(sunBranch, true);

///testing validation check
const invalidCustomer = new Customer("", 1); // Empty customer name
arizonaBank.addCustomer(westBranch, invalidCustomer); //it worked
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), -3000); // If there is a negative amount:it worked
const invalidCustomerId = 999; // Customer id that doesn't exist:it worked
const result = westBranch.findCustomerById(invalidCustomerId);
console.log(result);///undefined there is no customer with this id
