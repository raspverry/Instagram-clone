import { Users } from "./Users";

export const POSTS = [
    {
        imageurl: 'https://images.pexels.com/photos/11031074/pexels-photo-11031074.jpeg',
        user: Users[0].user,
        likes: 2222,
        caption: 'Sea Gull',
        profile_picture: Users[0].image,
        comments: [
            {
                user: 'fdasfasdfa',
                comment: 'WOW! WOW'
            },
            {
                user: 'vksldfasdfe',
                comment: 'ABEK ekLKER!'
            }
        ]
    },
    {
        imageurl: 'https://images.pexels.com/photos/11031074/pexels-photo-11031074.jpeg',
        user: Users[1].user,
        likes: 12312,
        caption: 'Sea Gull',
        profile_picture: Users[0].image,
        comments: [
            {
                user: 'fdasfasdfa',
                comment: 'WOW! WOW'
            },
            
        ]
    },
    {
        imageurl: 'https://images.pexels.com/photos/11031074/pexels-photo-11031074.jpeg',
        user: Users[2].user,
        likes: 3333,
        caption: 'Sea Gull',
        profile_picture: Users[0].image,
        comments: [
            {
                user: 'fdasfasdfa',
                comment: 'WOW! WOW'
            },
            {
                user: 'vksldfasdfe',
                comment: 'ABEK ekLKER!'
            }
        ]
    },
]