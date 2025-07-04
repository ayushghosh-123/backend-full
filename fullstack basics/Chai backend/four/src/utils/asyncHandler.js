const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export { asyncHandler };



// const asyncHandler = (fn) => async(res, req, next) => {
//     try {
//         await fn(req, res. next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }