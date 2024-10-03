// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect("/login");
  }
}

// Middleware to redirect already authenticated users to the dashboard
function redirectToDashboardIfAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    res.redirect("/dashboard");
  } else {
    return next();
  }
}

module.exports = {
  ensureAuthenticated,
  redirectToDashboardIfAuthenticated,
};
