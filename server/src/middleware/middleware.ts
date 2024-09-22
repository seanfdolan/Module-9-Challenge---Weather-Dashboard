const allRoutes = (req: Request, res: Response, next: any) => {
    console.log(`${req.method}`);
    next();
};
export default allRoutes;