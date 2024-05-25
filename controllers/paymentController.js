import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

export const createOrder = async (req, res) => {
    try {
        const { amount, tourName, fullName, guestSize, phone, bookAt } = req.body;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpayInstance.orders.create(options);

        if (!order) return res.status(500).send('Some error occurred');

        res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            key_id: process.env.RAZORPAY_ID_KEY,
            product_name: tourName,
            description: `Booking for ${tourName}`,
            contact: phone,
            name: fullName,
            email: 'customer@example.com' // Static email, update as per your need
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
