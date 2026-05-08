export const adminMiddle =  (req, res, next) => {
   if (req.user.role !=="admin") {
      return res.status(403).json({
        status:false,
        message:"Only admin allowed"
      })
   }
   next()
};