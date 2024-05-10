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
  const hasImage = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    ""
  );
  //https://tgbfmzqjdyefcbqwiadn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = !hasImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) {
    console.error("an error occured during get cabins data");
    throw new Error("Cabin could not be created");
  }
  //UPLOAD IMAGE
  const { errorStorage } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (errorStorage) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
