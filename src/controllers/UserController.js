const { getAgeDistributionOfAllUsers} = require('./../services/userService');


exports.getAgeDistributionOfAllUsers = async (req, res) => {
  try {
    console.log("getAgeDistributionOfAllUsers controller > before getting results");
    const result = await getAgeDistributionOfAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




