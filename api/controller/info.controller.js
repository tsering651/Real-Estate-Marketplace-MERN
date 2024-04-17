import Information from "../models/info.model.js"; // Corrected import path
export const reqSending = async (req, res, next) => {
    try {
        const listing = await Information.create(req.body);
        return res.status(201).json(listing); 
    } catch (error) {
        next(error);
    }
}


