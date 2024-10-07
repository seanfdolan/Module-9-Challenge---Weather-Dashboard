const allRoutes = (req: Request, _res: Response, next: any) => {
    console.log(`${req.method}`);
    next();
};
export default allRoutes;