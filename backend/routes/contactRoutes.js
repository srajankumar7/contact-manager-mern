const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

router.post("/", async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
});

router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
