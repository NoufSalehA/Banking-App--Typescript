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
    if (!branch.customers.includes(customer)) {
      branch.customers.push(customer);
      return true;
    }
    return false;
  }

  addCustomerTransaction(branch, customerId, amount) {
    const customer = branch.findCustomerById(customerId);
    if (customer) {
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
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      return true;
    }
    return false;
  }

  addCustomerTransaction(branch, customerId, amount) {
    const customer = this.findCustomerById(customerId);
    if (customer) {
      return customer.addTransaction(customerId, amount);
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
    if (amount >= 0) {
      this.transactions.push(new Transaction(amount, new Date()));
      return true;
    }
    return false;
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
const customer3 = new Customer("Nouf", 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);

arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer2);
arizonaBank.addCustomer(sunBranch, customer3);

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 4000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 2000);
arizonaBank.addCustomerTransaction(sunBranch, customer3.getId(), 5000);
arizonaBank.addCustomerTransaction(sunBranch, customer2.getId(), 1000);

console.log("Customer 1 Balance:", customer1.getBalance()); // Logging customer balance

console.log("West Branch Customers:");
arizonaBank.listCustomers(westBranch, true); // Logging West Branch customers

console.log("Sun Branch Customers:");
arizonaBank.listCustomers(sunBranch, true); // Logging Sun Branch customers
