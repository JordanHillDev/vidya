import * as dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// CREATE

export const insertRoom = async (roomId) => {
    const { data, error } = await supabase
        .from("rooms")
        .insert({ id: roomId })
        .select();
    if (error) console.log(error);
    return data;
};

export const insertUser = async (peerId) => {
    const { data, error } = await supabase
        .from("users")
        .insert({ id: peerId })
        .select();
    if (error) console.log(error);
    return data;
};

export const insertParticipant = async (
    peerId,
    roomId,
    userName,
    sharingVideo
) => {
    const { data, error } = await supabase
        .from("participants")
        .insert({
            user_id: peerId,
            room_id: roomId,
            username: userName,
            sharing_video: sharingVideo,
        })
        .select();
    if (error) console.log(error);
    return data;
};

export const insertMessage = async (roomId, peerId, message) => {
    const { data, error } = await supabase.from("messages").insert({
        room_id: roomId,
        user_id: peerId,
        message: message,
    });
    if (error) console.log(error);
    return data;
};

// READ

export const getParticipants = async (roomId) => {
    const { data, error } = await supabase
        .from("participants")
        .select("*")
        .eq("room_id", roomId);
    if (error) console.log(error);
    return data;
};

export const getMessages = async (roomId) => {
    const { data, error } = await supabase
        .from("messages")
        .select()
        .eq("room_id", roomId);
    if (error) console.log(error);
    return data;
};

// UPDATE

export const setPresent = async (roomId, peerId) => {
    const { data, error } = await supabase
        .from("participants")
        .update({ is_present: true })
        .match({ room_id: roomId, user_id: peerId });
    if (error) console.log(error);
    return data;
};

export const setNotPresent = async (roomId, peerId) => {
    const { data, error } = await supabase
        .from("participants")
        .update({ is_present: false })
        .match({ room_id: roomId, user_id: peerId });
    if (error) console.log(error);
    return data;
};

export default supabase;
