import collecion from "../../config/collection.js";
import connectToDatabase from "../../config/db.js";

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

export const adminUsersListPage = async (req, res) => {
  // console.log("Admin UserstList route working 🚀");
  try {
    const db = await connectToDatabase(process.env.DATABASE);

    let usersData = await db
      .collection(collecion.USERS_COLLECTION)
      .find({})
      .toArray();
      
      // format createdAt before sending to HBS
      usersData = usersData.map(user => {
        return {
          ...user,
          createdAtFormatted: new Date(user.createdAt)
          .toLocaleDateString('en-GB') // dd/mm/yyyy
        };
      });
      
    console.log("userData:", usersData);
    
    res.render("admin/users-list", {
      layout: "admin",
      title: "Admin - Users List",
      usersData,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.render("admin/users-list", {
      layout: "admin",
      title: "Admin - Users List",
      usersData: [],
    });
  }
};
