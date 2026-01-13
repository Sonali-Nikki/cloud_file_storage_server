import { supabase } from "../config/supabase.js";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = req.files.file;

  const storageKey = `${req.user.id}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("file")
    .upload(storageKey, file.data, {
      contentType: file.mimetype,
    });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  await supabase.from("files").insert({
    name: file.name,
    size_bytes: file.size,
    mime_type: file.mimetype,
    storage_key: storageKey,
    owner_id: req.user.id,
  });

  res.json({ message: "File uploaded successfully" });
};



export const renameFile = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { error } = await supabase
    .from("files")
    .update({ name })
    .eq("id", id)
    .eq("owner_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "File renamed" });
};

export const deleteFile = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("files")
    .update({ is_deleted: true })
    .eq("id", id)
    .eq("owner_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "File moved to trash" });
};
