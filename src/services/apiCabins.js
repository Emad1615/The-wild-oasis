import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("an error occured during get cabins data");
    throw new Error(error.message);
  }
  return cabins;
}
export async function creatingEditingCabin(newCabin, id) {
  let query = supabase.from("cabins");
  if (!id) query = query.insert([newCabin]);
  if (id) query = query.update({ newCabin }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) {
    console.error("an error occured during get cabins data");
    throw new Error(error.message);
  }
  return data;
}
