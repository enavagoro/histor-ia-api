import { getValueByKey, setKeyValue } from "../../shared/services/redis.service";
import { Comment } from "../../shared/types/types";

export const addComments = async (comment: Comment) => {
    const commentsString = await getValueByKey('comments');
    console.log('commentsString:', commentsString)

    const comments = commentsString ? JSON.parse(commentsString) : [];
    comments.push(comment);
    await setKeyValue('comments', JSON.stringify(comments))
}

export const getComments = async () => {
    const comments = await getValueByKey('comments');
    console.log('?:', comments)
    return comments ? JSON.parse(comments) : [];
}