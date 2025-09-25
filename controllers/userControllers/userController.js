export const landingPage = async (req, res) => {
  console.log("User Landing route working 🚀");
  
  res.render("user/home", { title: "Home - ChronoRoyale" });
};
