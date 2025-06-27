//External Module
const express = require("express");
const candidateRouter = express.Router();

const candidateController = require("../controllers/candidateController");

//create new candidate
candidateRouter.post("/", candidateController.postCreateCandidate);

//Update candidate
candidateRouter.put("/:candidateId", candidateController.putUpdateCandidate);

//delete a candidate
candidateRouter.delete("/:candidateId", candidateController.deleteCandidate);

// get a list of candidate
candidateRouter.get("/", candidateController.getCandidate);

//let's start vote
candidateRouter.post("/vote/:candidateId", candidateController.postVote);

candidateRouter.get("/vote/count", candidateController.getVoteCount);

module.exports = candidateRouter;
