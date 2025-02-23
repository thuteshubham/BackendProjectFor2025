const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const inputFilePath = path.resolve(__dirname, "../env/sampleData.csv");

exports.getAgeDistributionOfAllUsers = async () => {
  try {
    if (!fs.existsSync(inputFilePath)) {
      console.error("CSV file does not exist at path:", inputFilePath);
      return;
    }

    const jsonArray = await csv().fromFile(inputFilePath);
    console.log(" CSV file loaded successfully!");

    const values = await dataToInsert(jsonArray);
    if (values.length === 0) {
      console.log("No data to insert.");
      return;
    }
    
    console.log("Preparing to insert values:", values);

    const query = `INSERT INTO public.users (name, age, address, gender,additional_info) VALUES ${values}`;


    console.log(query);
    await pool.query(query);
    console.log(`Successfully inserted ${values.length} records!`);

    // Get Age Group Distribution
    const getQuery = `
    SELECT
      CASE
        WHEN age < 20 THEN '< 20'
        WHEN age BETWEEN 20 AND 40 THEN '20 to 40'
        WHEN age BETWEEN 40 AND 60 THEN '40 to 60'
        WHEN age > 60 THEN '> 60'
      END AS age_group,
      COUNT(*) AS group_count
    FROM users 
    GROUP BY age_group 
    ORDER BY age_group;`;

    const result = await pool.query(getQuery);
    return result.rows;

  } catch (error) {
    console.error(" Error:", error);
  }
};

//Data Preparation Function
async function dataToInsert(jsonArray){
  const values = jsonArray.map(row => {
    const fullName = `${row?.name?.firstName || row?.firstName} ${row?.name?.lastName   || row?.lastName}`;
    const age = Number(row?.age);
    const address = JSON.stringify({
      line1: row?.address?.line1 || row?.line1,
      line2: row?.address?.line2 || row?.line2,
      city: row?.address?.city   || row?.city,
      state:  row?.address?.state || row?.state
    });
    
    const gender = row?.gender;
    
    const additionalInfo = JSON.stringify({ gender:row?.gender });

    return `('${fullName}', ${age}, '${address}','${gender}' ,'${additionalInfo}')`;
  });

  return values
}