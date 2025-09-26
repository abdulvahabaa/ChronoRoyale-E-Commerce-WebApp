export const landingPage = async (req, res) => {
  console.log("User Landing route working 🚀");
  
  res.render("user/home", { title: "Home - ChronoRoyale" });
};

export const loginPage = async (req, res) => {
  console.log(" Login page route working 🚀");
  
  res.render("user/login", { title: "Login - ChronoRoyale" });
};

export const signupPage = async (req, res) => {
  console.log("Signup page route working 🚀");
  
  res.render("user/signup", { title: "Signup - ChronoRoyale" });
};
export const productsPage = async (req, res) => {
  console.log("productsPage page route working 🚀");
  
  res.render("user/products", { title: "Product's List - ChronoRoyale" });
};
