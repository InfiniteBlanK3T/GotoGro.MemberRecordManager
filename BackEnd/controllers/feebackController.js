const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");
const Sequelize = require("sequelize");
const crypto = require("crypto");

function generateFeedbackId() {
	return crypto.randomBytes(5).toString("hex");
}

//---------------API---------------
//@access public
//@ route GET /api/feedback/
const getAllFeedback = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.findAll();
  res.status(200).json({ feedbacks });
});

//@access public
//@ route GET /api/feedback/:id
const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findByPk(req.params.id);
  if (!feedback) {
    res.status(404);
    throw new Error(`Feedback with ID: \`${req.params.id}\` not found`);
  }

  res.status(200).json(feedback);
});

//@access public
//@ route PUT /api/feedback/:id
const updateFeedback = asyncHandler(async (req, res) => {
  let feedback = await Feedback.findByPk(req.params.id);
  if (!feedback) {
    res.status(404);
    throw new Error(`Feedback with ID: \`${req.params.id}\` not found`);
  }

  feedback = await feedback.update(req.body);
  res.status(200).json(feedback);
});

//@access public
//@ route POST /api/feedback/
const createFeedback = asyncHandler(async (req, res) => {
  const { FeedbackId, MemberId, Comment } = req.body;

  //Generating FeedbackID
	let feedback_id = generateFeedbackId();
	let existingFeedbackId = await Feedback.findOne({ where: { feedback_id } });

	// Ensure the generated FeedbackId is unique
	while (existingFeedbackId) {
		feedback_id = generateFeedbackId();
		existingMember = await Member.findOne({ where: { feedback_id } });
	}

  FeedbackId = feedback_id;

  try {
    const feedback = await Feedback.create({
      FeedbackId,
      MemberId,
      Comment,
    });

    res.status(201).json(feedback);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    throw error;
  }
});

//@access public
//@ route DELETE /api/feedback/:id
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findByPk(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error(`Feedback with ID: \`${req.params.id}\` not found`);
  }

  await feedback.destroy();
  res.status(200).json(feedback);
});

module.exports = {
  getAllFeedback,
  getFeedback,
  updateFeedback,
  createFeedback,
  deleteFeedback,
};
