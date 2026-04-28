exports.getProducts = async (req, res) => {
  const products = await Product.find()
    .populate("categoryId", "name") // هيعمل populate صح لأن الاسم بقى مطابق للموديل
    .populate("createdBy", "name");
  res.json(products);
};