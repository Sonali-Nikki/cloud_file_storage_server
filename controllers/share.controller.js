import crypto from "crypto";
import { supabase } from "../config/supabase.js";

export const shareFile = async (req, res) => {
  const { fileId } = req.params;
  const { permission = "view", expiresAt } = req.body;

  const token = crypto.randomBytes(32).toString("hex");

  await supabase.from("file_shares").insert({
    file_id: fileId,
    token,
    permission,
    expires_at: expiresAt || null
  });

  res.json({
    shareUrl: `${process.env.FRONTEND_URL}/share/${token}`
  });
};


export const accessSharedFile = async (req, res) => {
  const { token } = req.params;

  const { data: share } = await supabase
    .from("file_shares")
    .select("file_id, expires_at, permission, files(storage_key)")
    .eq("token", token)
    .single();

  if (!share) {
    return res.status(404).json({ error: "Invalid link" });
  }

  if (share.expires_at && new Date(share.expires_at) < new Date()) {
    return res.status(403).json({ error: "Link expired" });
  }

  const { data } = await supabase.storage
    .from("file")
    .createSignedUrl(share.files.storage_key, 600);

  res.json({ url: data.signedUrl });
};


export const searchFiles = async (req, res) => {
  const { q = "", page = 1 } = req.query;

  const limit = 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count } = await supabase
    .from("files")
    .select("*", { count: "exact" })
    .textSearch("search_vector", q)
    .range(from, to);

  res.json({
    page,
    total: count,
    results: data
  });
};