import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useUserProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user.id) {
        supabase
          .from("profil")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            setUser(data);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return { user, loading };
}