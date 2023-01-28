const router = require("express").Router();
const {
  createOrder,
  updateOrderStatus,
  getuserOrder,
  getallOrders,
  orderPayment,
} = require("../controllers/order");

//create order
router.post("/create", createOrder);
//update status
router.post("/update", updateOrderStatus);
//get user order
router.post("/userorder", getuserOrder);
//get all orders
router.post("/all", getallOrders);

//make payment
router.post("/payment", orderPayment);

module.exports = router;
