export interface History{
    id: String;
    title: String;
    text: String; // base 64
    image: String; // base 64 || url?
    stats: Stats;
}

export interface Stats{
    prompt: String;
    promptLikes: Number;
    params: Object;
    imagePrompt: String;
    imagePromptLikes: Number;
}

//

export interface Comment {
    userName: String
    userPrompt: String
    ip: String // unique or maybe mac::adress
    likes: { [key: string]: boolean };
}

export type Comments =  {[key: string]: Comment }; // restart when the day end

//

export interface Image {
    userName: String
    userImagePrompt: String
    ip: String // unique or maybe mac::adress
    likes: { [key: string]: boolean };
}

export type Images =  {[key: string]: Image }; // restart when the day end

// Params

export interface Param {
    title: String,
    percentage: Number // 0 - 100
}

export type Params =  {[key: string]: Param };
