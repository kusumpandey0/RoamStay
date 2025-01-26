const propertycontroller = (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = propertycontroller;
