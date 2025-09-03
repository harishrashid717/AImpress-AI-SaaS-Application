import { getAuth, clerkClient } from "@clerk/express";

const auth = async (req, res, next) => {
  try {
    
    const { userId, has} = getAuth(req);

    // Check if user is authenticated
    if (!userId) {
      const error = new Error("User not authenticated");
      error.statusCode = 401;
      throw error;
    }

 
    const hasPremiumPlan = has({ plan: "premium" });
    const user = await clerkClient.users.getUser(userId);
    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? "premium" : "free";
    next();
  } catch (error) {
    return next(error);
  }
};

export default auth;
