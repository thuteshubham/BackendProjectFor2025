const Account = require('../models/accountModel');

// Service to create a new account
exports.createAccount = async (accountData) => {
  const account = new Account(accountData);
  return await account.save();
};

// Service to get all accounts
exports.getAllAccounts = async () => {
  console.log("getAllAccounts service");
  const accountData= await Account.find();
  console.log("accountData", accountData);
  return accountData
};

// Service to get paginated accounts
exports.getPaginatedAccounts = async (page, limit) => {
  const skip = (page - 1) * limit;

  const result = await Account.aggregate([
    {
      $facet: {
        data: [
          { $skip: skip },
          { $limit: limit },
        ],
        total: [
          { $count: "count" },
        ],
      },
    },
  ]);

  const accounts = result[0].data;
  const total = result[0].total[0]?.count || 0; // Handle cases where count might not exist

  return { accounts, total };
};
