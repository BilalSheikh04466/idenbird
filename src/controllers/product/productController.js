const sequelize = require("../../config/database");
const asyncHandler = require("express-async-handler");
// // const { Users, validateUser } = require("../../models/users");

// const { expressValidatorError } = require("../../middleware/commonMiddleware");
// const {
//   userCreation,
//   userWorkingHistoryCreation,
//   //   getUserByIdMiddleware,
//   permissionCreation,
//   //   userUpdation,
//   getUserByEmailAndCNIC,
//   encryptPassword,
//   //   refactorUsersData,
//   //   getAllusersMiddleware,
//   //   getUserByIdWithDetailMiddleware,
// } = require("./productHelper");
// const {
//   addProfilePicByUserID,
//   updateProfilePicByUserID,
// } = require("./profilePicture/profilePicHelper");

// @desc Create new user
// @route POST /api/users
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  if (!req.result.is_admin) {
    res.status(400);
    throw new Error("You are not allowed to perform this action");
  }

  const prodectData = JSON.parse(req.body.productData);
  const product_pic = req?.files;

  //   const userDetail = userData.user;
  //   userDetail.added_by = req.result.id;
  //   userDetail.email_verified = true;
  //   userDetail.email_verified_at = Date.now();

  //   //validate userDetail
  //   if (userDetail) {
  //     const { error } = validateUser(userDetail);
  //     if (error) {
  //       res.status(400);
  //       throw new Error(error.details[0].message);
  //     }
  //   }

  //   const t = await sequelize.transaction();
  //   try {
  //     //check if user exist
  //     const userExists = await getUserByEmailAndCNIC(userDetail, null);

  //     if (userExists) {
  //       res.status(400);
  //       throw new Error(
  //         "User already exists with same email address or CNIC number"
  //       );
  //     }
  //     //encrypt password
  //     userDetail.password = await encryptPassword(userDetail.password);

  //     //create user
  //     const userDetails = await userCreation(userDetail, t);

  //     if (!userDetails) {
  //       res.status(400);
  //       throw new Error(
  //         "User could not be created. Rollback initiated in users."
  //       );
  //     }
  //     if (profile_pic) {
  //       addProfilePicByUserID(userDetails.id, profile_pic, t);
  //     }
  //     //create userWorkingHistory
  //     const dates = await userWorkingHistoryCreation(
  //       userData.dates,
  //       userDetails.id,
  //       t
  //     );
  //     if (!dates) {
  //       res.status(400);
  //       throw new Error(
  //         "dates could not be created. Rollback initiated in on joining/released date."
  //       );
  //     }

  //     //create PermissionSettings
  //     const permissions = await permissionCreation(
  //       userData.permissions,
  //       userDetails.id,
  //       t
  //     );

  //     if (!permissions) {
  //       res.status(400);
  //       throw new Error(
  //         "Permission settings could not be created. Rollback initiated in permission settings."
  //       );
  //     }

  //     // // if user is hunter and we have send store id then
  //     // if (
  //     //   permissions.hunting_form_view_and_edit &&
  //     //   req.result.permission_settings.manage_vendors_view &&
  //     //   userData.assigned_store
  //     // ) {
  //     //   const assignedStore = await assignStoreMiddelware(
  //     //     userDetails.id,
  //     //     userData.assigned_store,
  //     //     req.result.id,
  //     //     false, //check user
  //     //     t
  //     //   );

  //     //   if (!assignedStore) {
  //     //     res.status(400);
  //     //     throw new Error(
  //     //       "Error occur during store assignement. Rollback initiated in assign store."
  //     //     );
  //     //   }
  //     // }

  //     await t.commit();
  //     return res.status(200).json({ message: "User created successfully!" });
  //   } catch (error) {
  //     await t.rollback();
  //     res.status(
  //       error.statusCode
  //         ? error.statusCode
  //         : res.statusCode
  //         ? res.statusCode
  //         : 500
  //     );
  //     throw new Error(
  //       `${
  //         error.statusCode !== 400 && res.statusCode !== 400
  //           ? "Something went wrong in user creation: "
  //           : ""
  //       }${error.message}`
  //     );
  //   }
});

// const updateUserProfile = asyncHandler(async (req, res) => {
//   // if (!req.result.permission_settings.user_create_view_and_edit) {
//   //   res.status(400);
//   //   throw new Error("You are not allowed to perform this action");
//   // }

//   //validate param data
//   expressValidatorError(req);

//   const userDetail = JSON.parse(req.body.userData);

//   const profile_pic = req.files ? req.files.userImage : null;

//   userDetail.updated_by = req.params.id;

//   //validate userDetail
//   if (userDetail) {
//     const { error } = validateUser(userDetail);
//     if (error) {
//       res.status(400);
//       throw new Error(error.details[0].message);
//     }
//   }

//   const t = await sequelize.transaction();
//   try {
//     //check if user exist with param id
//     const userExistsById = await getUserByIdMiddleware(req.params.id);
//     if (!userExistsById) {
//       res.status(400);
//       throw new Error("The user ID you entered does not exist");
//     }

//     //check if user email and cnic already exist
//     if (
//       userExistsById.email !== userDetail.email ||
//       (userDetail.CNIC && userExistsById.CNIC !== userDetail.CNIC)
//     ) {
//       const userExists = await getUserByEmailAndCNIC(
//         userDetail,
//         userExistsById.id
//       );

//       // if yes then throw error
//       if (userExists) {
//         res.status(400);
//         throw new Error(
//           "User already exists with same email address or CNIC number"
//         );
//       }
//     }

//     //update user
//     const updateUser = await userUpdation(userDetail, userExistsById.id, t);
//     if (!updateUser) {
//       res.status(400);
//       throw new Error(
//         "User could not be updated. Rollback occur during upadting store"
//       );
//     }

//     if (profile_pic) {
//       await updateProfilePicByUserID(req.params.id, profile_pic, t);
//     }

//     await t.commit();
//     return res
//       .status(200)
//       .json({ message: "UserProfile updated successfully!" });
//   } catch (error) {
//     await t.rollback();
//     res.status(
//       error.statusCode
//         ? error.statusCode
//         : res.statusCode
//         ? res.statusCode
//         : 500
//     );
//     throw new Error(
//       `${
//         error.statusCode !== 400 && res.statusCode !== 400
//           ? "Something went wrong in user_profile updation: "
//           : ""
//       }${error.message}`
//     );
//   }
// });

// @desc Get user data
// @route GET /api/users/all
// @access Private
// const getAllUsers = asyncHandler(async (req, res) => {
//   if (!req.result.permission_settings.user_view) {
//     res.status(400);
//     throw new Error("You are not allowed to perform this action");
//   }

//   try {
//     //get all users
//     const users = await getAllusersMiddleware(req.result.id);

//     if (!users) {
//       res.status(400);
//       throw new Error("No user found");
//     }

//     //refactor users data
//     let userList = refactorUsersData(users);

//     res.status(200).json({
//       user: userList,
//     });
//   } catch (error) {
//     res.status(
//       error.statusCode
//         ? error.statusCode
//         : res.statusCode
//         ? res.statusCode
//         : 500
//     );
//     throw new Error(
//       `${
//         error.statusCode !== 400 && res.statusCode !== 400
//           ? "Something went wrong while fetching users: "
//           : ""
//       }${error.message}`
//     );
//   }
// });

// @desc Get user data by ID
// @route GET /api/users/:id
// @access Private
// const getUserById = asyncHandler(async (req, res) => {
//   if (
//     !req.result.permission_settings.user_view ||
//     req.params.id === req.result.id
//   ) {
//     res.status(400);
//     throw new Error("You are not allowed to perform this action");
//   }
//   //validate input data
//   expressValidatorError(req);

//   try {
//     //find only one user with added by, updated by, and permission settings
//     const user = await getUserByIdWithDetailMiddleware(req.params.id);

//     if (!user) {
//       res.status(400);
//       throw new Error("User don't exist");
//     }

//     // {
//     //  createdAt: "2023-06-20T06:21:50.000Z",
//     //  file_data: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBw",
//     //  type: file_mimetype: "image/jpeg",
//     //  name:  file_name: "showcase.jpg",
//     //  size: file_size: 37958,
//     //  updatedAt: "2023-06-20T06:21:50.000Z",
//     // }

//     if (user.user_has_profile_pic) {
//       user.user_has_profile_pic.file_data = `data:${
//         user.user_has_profile_pic.file_mimetype
//       };base64,${user.user_has_profile_pic.file_data.toString("base64")}`;
//     }
//     res.status(200).json({
//       user,
//     });
//   } catch (error) {
//     res.status(
//       error.statusCode
//         ? error.statusCode
//         : res.statusCode
//         ? res.statusCode
//         : 500
//     );
//     throw new Error(
//       `${
//         error.statusCode !== 400 && res.statusCode !== 400
//           ? "Something went wrong while fetching user data: "
//           : ""
//       }${error.message}`
//     );
//   }
// });

module.exports = {
  createProduct,
  //   getAllUsers,
  //   getUserById,
  //  updateUserProfile,
};
