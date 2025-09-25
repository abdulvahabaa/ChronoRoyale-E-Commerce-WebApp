export const adminLoginPage = async (req, res) => {
  console.log("Admin dashboard route working 🚀");
  res.render("admin/adminLogin", { layout: "admin", title: "Admin Login" });
};
  
// controllers/adminControllers/adminController.js
export const adminDashbordPage = async (req, res) => {
  console.log("Admin dashboard route working 🚀");
  // const { success } = req.query; // if success=1 show toast
  res.render("admin/dashboard", {
    layout: "admin",
    title: "Admin Dashboard",
    // success: success ? "Login successful!" : null,
  });
};
