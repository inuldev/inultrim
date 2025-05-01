import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    // Find all active (pending/accepted) friend requests where the current user is involved
    const activeRequests = await FriendRequest.find({
      $or: [
        { sender: currentUserId, status: { $in: ["pending", "accepted"] } },
        { recipient: currentUserId, status: { $in: ["pending", "accepted"] } },
      ],
    });

    // Find rejected requests where the current user was the sender
    // (these users have rejected the current user's request, so don't show them)
    const rejectedAsSenderRequests = await FriendRequest.find({
      sender: currentUserId,
      status: "rejected",
    });

    // Extract the IDs of users involved in active requests and users who rejected current user's request
    const excludeUserIds = [
      ...activeRequests.map((request) => {
        if (request.sender.toString() === currentUserId) {
          return request.recipient.toString();
        } else {
          return request.sender.toString();
        }
      }),
      ...rejectedAsSenderRequests.map((request) =>
        request.recipient.toString()
      ),
    ];

    // Combine all IDs to exclude from recommendations
    const excludeIds = [
      ...currentUser.friends.map((id) => id.toString()),
      ...excludeUserIds,
    ];

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: excludeIds } },
        { isOnboarded: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // Check if there's an active (pending/accepted) request
    const activeRequest = await FriendRequest.findOne({
      $or: [
        {
          sender: myId,
          recipient: recipientId,
          status: { $in: ["pending", "accepted"] },
        },
        {
          sender: recipientId,
          recipient: myId,
          status: { $in: ["pending", "accepted"] },
        },
      ],
    });

    if (activeRequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user",
      });
    }

    // Check if there's a rejected request that can be reactivated
    const rejectedRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId, status: "rejected" },
        { sender: recipientId, recipient: myId, status: "rejected" },
      ],
    });

    if (rejectedRequest) {
      // Only allow the original sender to re-send the request
      if (rejectedRequest.sender.toString() === myId) {
        rejectedRequest.status = "pending";
        await rejectedRequest.save();
        return res.status(201).json(rejectedRequest);
      } else {
        // If the original recipient wants to send a request after rejecting one,
        // delete the old rejected request and create a new one in the opposite direction
        await FriendRequest.findByIdAndDelete(rejectedRequest._id);
        // Continue to create a new request below (fall through to the create code)
      }
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add each user to the other's friends array
    // $addToSet: adds elements to an array only if they do not already exist.
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function rejectFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Verify the current user is the recipient
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to reject this request" });
    }

    // Update the request status to rejected
    friendRequest.status = "rejected";
    await friendRequest.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.log("Error in rejectFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
