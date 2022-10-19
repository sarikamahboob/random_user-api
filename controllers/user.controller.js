const fs = require("fs");
const data = fs.readFileSync("userData.json");
const users = JSON.parse(data);

// http://localhost:5000/user/random
module.exports.randomUser = (req, res) => {
  const randomUser = Math.floor(Math.random() * users.length);
  res.status(200).send({
    status: true,
    message: "Random User Found !!!",
    data: users[randomUser],
  });
};

// http://localhost:5000/user/all
// http://localhost:5000/user/all?limit=4
module.exports.allUser = (req, res) => {
  const { limit } = req.query;
  res.status(200).send({
    status: true,
    message: "You get all the users at your limit !!!",
    data: users.slice(0, limit),
  });
};

// http://localhost:5000/user/save
module.exports.saveUser = (req, res) => {
  const newUser = req.body;
  const { gender, name, contact, address, photoUrl } = newUser;
  if (req.body._id) {
    return res.status(500).send({
      status: false,
      message: "Only enter the value and ",
    });
  } else if (gender && name && contact && address && photoUrl) {
    users.push({ _id: users.length + 1, ...newUser });
    const newUserInfo = JSON.stringify(users);
    fs.writeFileSync("userData.json", newUserInfo);
    return res.status(200).send({
      status: true,
      message: "New User added !!!",
      data: users,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Enter all the required properties",
    });
  }
};

// http://localhost:5000/user/update
module.exports.updateUserInfo = (req, res) => {
  const {id} = req.params;
  const updatedUserId = users.find((user) => +user._id === +id);
  console.log(updatedUserId);
  if (!updatedUserId) {
    return res.status(500).send("Id Not Found !!!");
  }
  const updateUserInfo = req.body;
  console.log(updateUserInfo);
  if (Object.keys(updateUserInfo).length === 0) {
    return res.status(500).send("Give a JSON data");
  } else {
    const index = users.indexOf(updatedUserId);
    users[index] = { ...updatedUserId, ...updateUserInfo };
    fs.writeFileSync("userData.json", JSON.stringify(users));
    return res.status(200).send({
      status: true,
      message: "User updated successfully !!!",
      data: users,
    });
  }
};

// http://localhost:5000/user/bulk-update
module.exports.updateMultipleUserInfo = (req, res) => {
   const { id, updatedData } = req.body;
    
    if(!Array.isArray(id)){
        return res.status(500).send({
            status: false,
            message: `Write a json data where id will be an array and updatedData will be an object. Example: { "id": [1, 2],"updatedData": {"gender": "Female", "name": "Sarika","contact" : "0123456789"}} `
        })
    }
    for (let i = 0; i < id.length; i++) {
        let updatedId = id[i];
        const findUser = users.find(user => user._id == updatedId)
      if (!findUser) {
          return res.status(500).send("ID Not Found !!!");
        }

        else {
            const index = users.indexOf(findUser);
            users[index] = { ...findUser, ...updatedData };
        }
    }
    fs.writeFileSync("userData.json", JSON.stringify(users))
    res.status(200).send({
        status: true,
        message: "Users Info Updated",
        data: users
    });
};

// http://localhost:5000/user/delete
module.exports.userRemove = (req, res) => {
 const { id } = req.params;
    const userId = users.find(user => +user._id === +id);
    if (!userId) {
        return res.status(500).send("Id Not Found !!!")
    }
    else {
        const matchedIds= users.filter(user => +user._id !== +id);
        fs.writeFileSync("userData.json", JSON.stringify(matchedIds))
        res.status(200).send({
            status: true,
            message: "One User Removed !!!",
            data: matchedIds
        });
    }
};
