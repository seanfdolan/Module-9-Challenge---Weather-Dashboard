const allRoutes = (req, _res, next) => {
    console.log(`${req.method}`);
    next();
};
export default allRoutes;
