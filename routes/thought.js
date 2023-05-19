const e = require("express");
// const Auth = require('../middlewares/Auth')
const express = require("express");
const fs = require("fs");
const { Thought } = require("../models/Thought");
const router = express.Router();

router.get("/thought", async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
    if (thoughts.length == 0) {
      return res.status(400).json({
        message: "No thoughts found",
      });
    } else {
      return res.status(200).json({
        summary: {
          message: "Thoughts retrieved successfully",
          totalcount: `${thoughts.length}`,
        },
        thoughts,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Sommething went wrong",
      error: err.message,
    });
  }
});
//SPECIFIC THOUGHT
router.get("/thought/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const thought = await Thought.findById();
    if (thought.length == 0) {
      return res.status(400).json({
        message: "No thoughts found",
      });
    } else {
      return res.status(200).json({
        message: "Thought retrieved successfully",
        thought,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Sommething went wrong",
      error: err.message,
    });
  }
});

//ADD THOUGHT
router.post("/thought", async (req, res) => {
  try {
    console.log("Reached the add route");
    let error = "";
    const { thoughtText, thoughtCreatedBy } = req.body;
    // if(productName == '' && error == '')
    // {
    //     error = "Missing product name"
    //     res.status(400).json({
    //         message:error
    //     })
    // }
    // if(productPrice == '' && error == '')
    // {
    //     error = "Missing product price"
    //     res.status(400).json({
    //         message:error
    //     })
    // }
    // if(productDesc == '' && error == '')
    // {
    //     error = "Missing product description"
    //     res.status(400).json({
    //         message:error
    //     })
    // }
    if (error == "") {
      const thoughtObj = {
        thoughtText,
        thoughtCreatedBy,
        thoughtComments: [],
      };
      const thought = new Thought(thoughtObj);
      await thought.save();
      return res.status(201).json({
        summary: {
          message: "Thought saved successfully",
          totalcount: `${await Thought.count()}`,
        },
        thought,
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

//ADD COMMENT

router.put("/thought/addcomment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { commentText, commentCreatedBy } = req.body;
    const commentObj = {
      commentText,
      commentCreatedBy,
      commentLikes: 0,
    };
    const thought = await Thought.findById(id);
    let error = "";
    if (thought) {
      //     if(productName == '' && error == '')
      //     {
      //         error = "Missing product name"
      //         res.status(400).json({
      //             message:error
      //         })
      //     }
      //     if(productPrice == '' && error == '')
      //     {
      //         error = "Missing product price"
      //         res.status(400).json({
      //             message:error
      //         })
      //     }
      //     if(productDesc == '' && error == '')
      //     {
      //         error = "Missing product description"
      //         res.status(400).json({
      //             message:error
      //         })
      //     }
      thought.thoughtComments = [...thought.thoughtComments, commentObj];
      await thought.save();
      return res.status(201).json({
        message: `Thought with id ${id} updated successfully`,
        thought,
      });
    } else {
      return res.status(400).json({
        message: "No such id found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

module.exports = router;
