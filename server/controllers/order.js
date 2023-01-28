const Order = require("../models/Order");
const User = require("../models/User");
const { createError } = require("../error");
const Stripe = require("stripe")(
  "sk_test_51MEUkMSH3VfTLwtG8h6XcAgNSVnSdXlV9mLM16C2nkGAZhvHIDbaFYJdyhwOmwsBH7FqUDpf6FacsehNDwiNmnsJ00VnoK9uhv"
);

const createOrder = async (req, res, next) => {
  const { userId, items, bill, date_added, address } = req.body;
  try {
    const newOrder = new Order({
      userId,
      items,
      bill,
      date_added,
      address,
    });
    const order = await newOrder.save();
    res.status(200).json(order);
  } catch (error) {
    next(createError(error));
  }
};

const updateOrderStatus = async (req, res, next) => {
  const { orderId, status } = req.body;
  try {
    const findOrder = await Order.findOne({ _id: order });
    if (!findOrder) return next(createError(404, "order not found"));
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: orderId },
      {
        status,
      }
    );
    if (!updatedOrder) return next(createError(404, "Order not updated"));
    return res.status(200).json("Order updated successfully");
  } catch (error) {
    next(createError(error));
  }
};

const getuserOrder = async (req, res, next) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const orders = await Order.find({ userId });
    if (!orders) return next(createError(404, "No orders found"));
    return res.status(200).json(orders);
  } catch (error) {
    next(createError(error));
  }
};

const getallOrders = async (req, res, next) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const user = await User.findOne({ _id: userId });
    console.log(user.isAdmin);
    if (!user) return next(createError(404, "user not found"));
    if (!user.isAdmin)
      return next(createError(400, "only admin can req for all the orders"));
    const allOrders = await Order.find({});
    return res.status(200).json(allOrders);
  } catch (error) {
    next(createError(error));
  }
};

const orderPayment = async (req, res, next) => {
  const { token, amount } = req.body;
  console.log(token, amount);
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    next(createError(404, "failure"));
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  getuserOrder,
  getallOrders,
  orderPayment,
};
