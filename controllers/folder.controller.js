import { supabase } from "../config/supabase.js";

export const createFolder = async (req, res) => {
  const { name, parentId } = req.body;

  const { data, error } = await supabase
    .from("folders")
    .insert([{
      name,
      owner_id: req.user.id,
      parent_id: parentId || null
    }])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data);
};

export const getFolderContents = async (req, res) => {
  const { id } = req.params;

  const { data: folders } = await supabase
    .from("folders")
    .select("*")
    .eq("parent_id", id)
    .eq("is_deleted", false);

  const { data: files } = await supabase
    .from("files")
    .select("*")
    .eq("folder_id", id)
    .eq("is_deleted", false);

  res.json({ folders, files });
};

export const deleteFolder = async (req, res) => {
  const { id } = req.params;    
    const { data, error } = await supabase  
        .from("folders")    
        .update({ is_deleted: true })
        .eq("id", id)           
        .eq("owner_id", req.user.id)
        .select()
        .single();
    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Folder deleted", folder: data });
}



