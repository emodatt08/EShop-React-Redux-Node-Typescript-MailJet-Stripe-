import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Please enter name",    
        }),
        password: string({
            required_error: "Please enter password"
        }).min(6, "Password too short - should be 6 chars minimum"),
        passwordConfirmation: string({
            required_error: 'Please enter confirmation password'
        }).min(6, "Confirm Password should also be 6 chars minimum just like the password"),
        email: string({
            required_error: "Please enter email"
        }).email("Please enter a valid email")
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ['passwordConfirmation'],
    }),
});


export type createUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;