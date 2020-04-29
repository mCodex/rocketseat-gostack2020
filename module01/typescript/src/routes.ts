import { Request, Response } from 'express'

import createUser from './services/createUser';

export const helloWorld = (req: Request , res: Response) => {
    const user = createUser({ 
        name: 'Mateus', 
        email: 'myemail@myemail.com', 
        password: '123456',
        techs: ['NodeJS', { title: 'React', experience: 100 }] 
    });

    return res.json(user);
}
