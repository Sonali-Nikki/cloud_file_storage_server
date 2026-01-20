import { supabase } from "../config/supabase.js";

/* ===============================
   UPLOAD FILE
================================ */
export const uploadFile = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;

    const storageKey = `${req.user.id}/${Date.now()}-${file.name}`;


    const { error: uploadError } = await supabase.storage
      .from("file")
      .upload(storageKey, file.data, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      return res.status(400).json({ error: uploadError.message });
    }


    await supabase.from("files").insert({
      name: file.name,
      size: file.size,
      mime_type: file.mimetype,
      storage_key: storageKey,
      user_id: req.user.id,
      is_deleted: false,
    });

    res.json({ message: "File uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===============================
   GET FILES (ROOT)
================================ */
export const getFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: files, error } = await supabase
      .from("files")
      .select("*")
      .eq("user_id", userId)
      .eq("is_deleted", false)
      .is("folder_id", null)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      files: files || [],
      folders: [],
      path: [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===============================
   MOVE TO TRASH
================================ */
export const moveToTrash = async (req, res) => {
  const { id } = req.params;

  await supabase
    .from("uploads")
    .update({
      is_deleted: true,
      deleted_at: new Date(),
    })
    .eq("id", id)
    .eq("user_id", req.user.id);

  res.json({ message: "Moved to trash" });
};

/* ===============================
   GET TRASH
================================ */
export const getTrash = async (req, res) => {
  const userId = req.user.id;

  const { data } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", userId)
    .eq("is_deleted", true)
    .order("deleted_at", { ascending: false });

  res.json({
    files: data || [],
    folders: [],
    path: [{ name: "Trash" }],
  });
};

/* ===============================
   RESTORE FILE
================================ */
export const restoreFile = async (req, res) => {
  const { id } = req.params;

  await supabase
    .from("files")
    .update({
      is_deleted: false,
      deleted_at: null,
    })
    .eq("id", id)
    .eq("user_id", req.user.id);

  res.json({ message: "File restored" });
};

/* ===============================
   DELETE FOREVER
================================ */
export const deleteForever = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "File not found" });
  }

  // delete from storage
  await supabase.storage
    .from("file")
    .remove([data.storage_key]);

  // delete from table
  await supabase
    .from("files")
    .delete()
    .eq("id", id);

  res.json({ message: "Deleted permanently" });
};

