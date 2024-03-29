const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: [
    {
      ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      commentText: String,
      likedBy: [
        {
          ownerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          likeType: String,
        },
      ],
    },
  ],
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
