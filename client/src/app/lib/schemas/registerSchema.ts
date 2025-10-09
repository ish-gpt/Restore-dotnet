import z from "zod";

const passwordRegex = new RegExp(/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/);

export const registerSchema = z.object({
    email:z.string().email(),
    password: z.string().regex(passwordRegex,{
        message:'Password must contains 1 lowercase character, 1 uppercase character,1 number, 1 special and 6-10 characters'
    })
});

export type RegisterSchema = z.infer<typeof registerSchema>;