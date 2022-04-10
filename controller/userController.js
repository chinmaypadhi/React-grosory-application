const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multer = require("multer");
const sharp = require("sharp");

// const multerStorage=multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,"public/image/user");
//   },
//   filename:(req,file,cb)=>{
//     const ext=file.mimetype.split("/")[1];
//     cb(null,`user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// })

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Please upload only images", 400), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) next();
  console.log(req.file);
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  //File manupulating
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/image/user/${req.file.filename}`);

  next();
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const allUser = await User.find();
  res.status(200).json({
    status: "success",
    result: allUser.length,
    data: {
      allUser,
    },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userById = await User.findById(id);
  if (!userById) {
    return next(new AppError("No item found with this ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      userById,
    },
  });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updUser) {
    return next(new AppError("No item found with this ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const delUser = await User.findByIdAndDelete(id);
  if (!delUser) {
    return next(new AppError("No item found with this ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: {
      delUser,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)Create error if user attempt to change password

  console.log(req.file);

  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not for password updates,Please use /changePassword",
        400
      )
    );
  }
  //2)Filtered out unwanted fields name,those are not allowed to updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  //3)Updated the document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    message: "Your data updated successfully",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    message: "Your account de-activated successfully",
    data: null,
  });
});

exports.proceedToCheckout = catchAsync(async (req, res, next) => {
  const sendToClient = await User.findById(req.user.id);

  if (!sendToClient) {
    return next(new AppError("Please Login To Continue", 401));
  }
  await res.send(req.user);
});
