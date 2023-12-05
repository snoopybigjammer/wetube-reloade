import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "WETUBE";
  res.locals.loggedInUser = req.session.user || {};
  // console.log(req.session.user);
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "not authorized!");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleWare = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "not authorized!");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 },
});

export const videoUpload = multer({
  dest: "uploads/videos/",
});
