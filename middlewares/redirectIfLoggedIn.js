export const redirectIfLoggedIn = (req, res, next) => {
  console.log("redirectIfLoggedIn middleware working 🚀");
  if (req.loggedInUser) {
    console.log("the user is logged in>>>>>>>>");
    return res.redirect("/"); // logged-in users go to homepage
  }
  next();
};
