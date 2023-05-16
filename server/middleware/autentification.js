const bcrypt = require("bcryptjs")
const User = require("../models/User")

exports.register = async (req, res, next) => {
    const { login, password } = req.body
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
    }

    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            login,
            password: hash,
        })
            .then((user) =>
                res.status(200).json({
                    message: "User successfully created",

                })
            )
            .catch((error) =>
                res.status(400).json({
                    message: "User not successful created",
                    error: error.message,
                })
            );
    });
}



exports.login = async (req, res, next) => {
    const { login, password } = req.body
    // Check if login and password is provided
    if (!login || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await User.findOne({ login })
        if (!user) {
            res.status(400).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            // comparing given password with hashed password
            bcrypt.compare(password, user.password).then(function (result) {
                result
                    ? res.status(200).json({
                        message: "Login successful",
                        
                    })
                    : res.status(400).json({ message: "Login not succesful" })
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

// exports.update = async (req, res, next) => {
//     const { status, id } = req.body;
//     // First - Verifying if status and id is presnt
//     if (status && id) {
//       // Second - Verifying if the value of status is admin
//       if (status === "admin") {
//         // Finds the user with the id
//         await User.findById(id)
//           .then((user) => {
//             // Third - Verifies the user is not an admin
//             if (user.status !== "admin") {
//               user.status = status;
//               user.save((err) => {
//                 //Monogodb error checker
//                 if (err) {
//                   res
//                     .status("400")
//                     .json({ message: "An error occurred", error: err.message });
//                   process.exit(1);
//                 }
//                 res.status("201").json({ message: "Update successful", user });
//               });
//             } else {
//               res.status(400).json({ message: "User is already an Admin" });
//             }
//           })
//           .catch((error) => {
//             res
//               .status(400)
//               .json({ message: "An error occurred", error: error.message });
//           });
//         }

//     }
// }

exports.update = async (req, res, next) => {
    const { status, id } = req.body
    // Verifying if status and id is presnt
    if (status && id) {
        // Verifying if the value of status is admin
        if (status === "admin") {
            await User.findById(_id)
        } else {
            res.status(400).json({
                message: "status is not admin",
            })
        }
    } else {
        res.status(400).json({ message: "Role or Id not present" })
    }
    next()
}