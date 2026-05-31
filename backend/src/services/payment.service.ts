import stripe from "../config/stripe";

const createCheckoutSession = async ({ cartItems, orderId, userId }: { cartItems: any[], orderId: string, userId: string }) => {
    const line_items = cartItems.map((item) => ({
        price_data: {
            currency: "inr",

            product_data: {
                name: item.name,
                images: [item.image],
            },

            unit_amount: item.price * 100,
        },

        quantity: item.quantity,
    }));

    console.log(orderId)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: line_items,
        mode: "payment",

        success_url: `${process.env.CLIENT_URL}/checkout/order-success?orderId=${orderId}`,
        cancel_url: `${process.env.CLIENT_URL}/checkout/order-cancel`,

        metadata: {
            orderId,
            userId,
        },
    });

    return session;
}

export default createCheckoutSession;