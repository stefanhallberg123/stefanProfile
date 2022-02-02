const formidable = require("formidable");
const fs = require("fs");
const Profile = require("../model/profile");

// list all profiles
exports.list = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 20;

  Profile.find()
    .limit(limit)
    .exec((err, profiles) => {
      if (err) {
        return res.status(400).json({
          error: "Hittade inga profiler",
        });
      }
      res.json(profiles);
    });
};
// create profile
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
  

    if (err) {
      return res.status(400).json({
        error: "Bilden kunde inte laddas upp",
      });
    }
    // check for all fields
    const { gender, title, first, last, country, age} = fields;

    if (!gender || !title || !first || !last || !country || !age ) {
      return res.status(400).json({
        error: "Alla fält är obligatoriska",
      });
    }
    let profile = new Profile(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Bilden får max vara 1 mb",
        });
      }
      profile.photo.data = fs.readFileSync(files.photo.path);
      profile.photo.contentType = files.photo.type;
    }
    console.log(profile)
    profile.save((err, result) => {
      if (err) {
        console.log("Kunde inte skapa Profil ", err);
        return res.status(400).json({
          error: "Kunde inte skapa profil",
        });
      }
      res.json(result);
    });
  });
};
