
export const driverMiddle = async (req, res, next) => {
  if (req.user.role !=="driver") {
     return res.status(403).json({
        status:false,
        message:"Only driver allowed"
      })
  }

  if (!req.user.isApproved) {
     return res.status(403).json({
        status:false,
        message:"wait for admin aprroved"
      })
  }
  next()
};