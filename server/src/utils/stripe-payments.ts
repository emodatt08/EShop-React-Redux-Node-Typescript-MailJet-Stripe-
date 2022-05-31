import config from 'config';
import Stripe from 'stripe';

const stripe = new Stripe(config.get('stripeSecret'),{
  apiVersion: '2020-08-27',
});

export async function createPaymentToken(cardData: any) {
    let token = {};
    try {
        token = await stripe.tokens.create({
            card: {
                number: cardData.card_number,
                exp_month: cardData.exp_month,
                exp_year: cardData.exp_year,
                cvc: cardData.cvv
            }
        });
    } catch (error: any) {
        switch (error.type) {
            case 'StripeCardError':
                token.error = error.message;
                break;
            default:
                token.error = error.message;
                break;
        }
    }
    return token;
}


export async function createCharge(token: any, stripeData: any) {
    let charge = {};
    try {
        charge = await stripe.charges.create({
            amount: stripeData.total_price,
            currency: stripeData.currency,
            description: stripeData.description,
            source: token.id
        });
    } catch (error: any) {
        switch (error.type) {
            case 'StripeCardError':
                charge.error = error.message;
                break;
            default:
                charge.error = error.message;
                break;
        }
    }
    return charge;
}