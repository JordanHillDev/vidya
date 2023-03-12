import * as dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

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

export const insertParticipant = async (peerId, roomId) => {
    const { data, error } = await supabase
        .from("participants")
        .insert({ user_id: peerId, room_id: roomId })
        .select();
    if (error) console.log(error);
    return data;
};

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

export default supabase;
