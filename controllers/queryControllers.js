//Before implementing queryController.js plz refer to userModel first

const User = require('../models/userModel');

const filterQueries = async (req, res) => {
  try {
    //Write your code here for sorting,pagination and searching
    //1) For sorting sort salary from ascending to descending order
    //2) For Pagination set limit 5 as a default limit and default page is 1
    //3) Implement serching on 'first_name' and 'last_name'
    // Formulae to implementing pagination: (page - 1) * limit
    // For Sorting use    .sort('salary')

    //Pagination 
    const page = parseInt(req.query.page)||1; 
    const limit = parseInt(req.query.limit) ||5; 
    const skip = (page - 1)* limit; 


    //sorting 
    const sortField = req.query.sort || 'age';
    const sortOrder = req.query.order && req.query.order.toLowerCase();
    const sortOption= {[sortField]: sortOrder};

    //serching
    const firstNameQuery = req.query.first_name;
    const lastNameQuery = req.query.last_name; 

    const searchFilter = {};
    if(firstNameQuery) {
      searchFilter.first_name= {$regex:firstNameQuery,$options: 'i'};
    }
    if(lastNameQuery){
      searchFilter.last_name = {$regex: lastNameQuery, $options: 'i'};
    }

    //fetching users
    const users = await User.find(searchFilter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)

    res.status(200).json(users);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { filterQueries };
