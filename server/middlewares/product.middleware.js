import { body, validationResult } from "express-validator";

export const validateProduct = [
    body("title").notEmpty().withMessage("Title is required"),
    
    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),
    
    body("carType")
        .notEmpty().withMessage("Car type is required")
        .isIn(["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Truck", "Van"])
        .withMessage("Car type is invalid"),
    
    body("company").notEmpty().withMessage("Company name is required"),
    
    body("dealer").notEmpty().withMessage("Dealer name is required"),

    (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        } catch (error) {
            return res.status(500).json({ 
                message: "Internal server error during validation",
                error: error.message 
            });
        }
    },
];
