import { supabase } from "../config/supabase.js";

const checkPermission = (requiredRole) => {
  return async (req, res, next) => {
    const { fileId } = req.params;

    const { data } = await supabase
      .from("file_permissions")
      .select("role")
      .eq("file_id", fileId)
      .eq("user_id", req.user.id)
      .single();

    if (!data) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (requiredRole === "edit" && data.role === "view") {
      return res.status(403).json({ error: "Edit permission required" });
    }

    next();
  };
};

export default checkPermission;
