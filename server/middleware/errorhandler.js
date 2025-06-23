export const errorHandler = (error, req, res, next) => {
  console.log(error.stack);
  console.log(error);
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
