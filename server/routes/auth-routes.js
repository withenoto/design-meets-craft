const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const Designer = require("../models/Designer");
const uploader = require("../cloudinary");

// SIGN UP DESIGNER

authRoutes.post("/signup", (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const role = req.body.role;

  if (password != passwordConfirm) {
    res.status(400).json({
      message: "PLEASE TYPE IN CORRECT PASSWORD."
    });
    return;
  }

  Designer.findOne({ email: email }).then(user => {
    if (user !== null) {
      res.status(400).json({
        message: "THIS EMAIL IS ALREADY ASSIGNED TO AN ACCOUNT. PLEASE LOG IN."
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new Designer({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPass,
      role: role,
      public_id_ti: "thing-gallery/default_title_imagine.jpg",
      public_id_bl: "thing-gallery/default_brandLogo.jpg"
    });

    aNewUser.save(err => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      req.login(aNewUser, err => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }
        res.status(200).json({ user: aNewUser, message: "no Error" });
      });
    });
  });
});

// LOG IN DESIGNER
authRoutes.post("/login/designer", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again" });
      return;
    }

    if (!theUser) {
      res.status(401).json({ message: `WRONG EMAIL OR PASSWORD` });
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res
          .status(500)
          .json({ message: "Something went wrong. Please try again" });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

// LOG OUT DESIGNER
authRoutes.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

// LOGGED IN DESIGNER
authRoutes.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

// ABOUT YOU DESIGNER
authRoutes.post("/signup/designer/aboutyou", (req, res) => {
  let userId = req.body.loggedInUser._id;

  let aboutYou = {
    youinasentence: req.body.youinasentence,
    position: req.body.position,
    brand: req.body.brand,
    website: req.body.website,
    adress: req.body.adress,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    telephone: req.body.telephone,
    language: Object.values(req.body.language)
  };
  Designer.findByIdAndUpdate(userId, aboutYou)
    .then(user => console.log(user))
    .catch(err => console.log(err));

  res.status(200).json({ message: "no Error" });
});

// NEEDS DESIGNER
authRoutes.post("/signup/designer/needs", (req, res) => {
  let userId = req.user;

  let needs = {
    tagsCategory: req.body.tagsCategory,
    tagsMaterial: req.body.tagsMaterial,
    tagsDestination: req.body.tagsDestination,
    capacity: req.body.capacity,
    lookingfor: req.body.lookingfor
  };

  Designer.findByIdAndUpdate(userId, needs, { new: true })
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err));
});

// UPLOAD DESIGNER
authRoutes.post(
  "/signup/designer/upload/brandLogo",
  uploader.single("brandLogo"),
  (req, res, next) => {
    let userId = req.user._id;

    Designer.findByIdAndUpdate(
      userId,
      { brandLogo: req.file.url, public_id_bl: req.file.public_id },
      { new: true }
    )
      .then(user => {
        res.json({
          secure_url: req.file.secure_url,
          theUser: user
        });
      })
      .catch(err => console.log(err));

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
  }
);

authRoutes.post(
  "/signup/designer/upload/titleImage",
  uploader.single("titleImage"),
  (req, res, next) => {
    let userId = req.user._id;

    Designer.findByIdAndUpdate(
      userId,
      { titleImage: req.file.url, public_id_ti: req.file.public_id },
      { new: true }
    )
      .then(user => {
        res.json({ secure_url: req.file.secure_url, theUser: user });
      })
      .catch(err => console.log(err));

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
  }
);

authRoutes.post(
  "/signup/designer/upload/gallery",
  uploader.array("gallery", 6),
  (req, res, next) => {
    let galleryArr = req.files.map(e => e.url);

    let userId = req.user._id;
    Designer.findByIdAndUpdate(userId, { gallery: galleryArr })
      .then(user => console.log(user))
      .catch(err => console.log(err));

    if (!req.files) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ secure_url: galleryArr });
  }
);

module.exports = authRoutes;
