import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("an error occured during get cabins data");
    throw new Error(error.message);
  }
  return cabins;
}
