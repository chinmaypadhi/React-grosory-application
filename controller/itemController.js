const Item = require("../model/itemModel");
const Order = require("../model/orderModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const multerStorage=multer.diskStorage({

// })

// const upload = multer({ storage: storage, fileFilter: fileFilter });

exports.createOrder = catchAsync(async (req, res, next) => {
  const myOrder = await Order.create(req.body);
  res.status(201).json(myOrder);
});

exports.getOrderDetails = catchAsync(async (req, res, next) => {
  const orderdetails = await Order.find();

  res.status(200).json(orderdetails);
});

exports.getParticularorder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  res.status(200).json(order);
});

exports.createItem = catchAsync(
  // upload.single("image"),
  async (req, res, next) => {
    const newItem = await Item.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newItem,
      },
    });
  }
);

exports.getAllItem = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Item.find(), req.query).filter();

  const items = await features.query;

  res.status(200).json(items);
});

exports.getTheItem = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const getItem = await Item.findById(id);

  if (!getItem) {
    return next(new AppError("No item found with this ID", 404));
  }
  res.status(200).json(getItem);
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updateItem = await Item.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateItem) {
    return next(new AppError("No item found with this ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updateItem,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const delItem = await Item.findByIdAndDelete(id);

  if (!delItem) {
    return next(new AppError("No item found with this ID", 404));
  }
  res.status(204).json({
    status: "success",

    data: {
      delItem,
    },
  });
});
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const delOrder = await Order.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
    data: {
      delOrder,
    },
  });
});
