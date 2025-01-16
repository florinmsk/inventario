import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@nextui-org/react";
import { logout } from "../(auth)/actions";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <section>
      <h2>Dashboard</h2>
      <p></p> <Button onPress={logout}>Delogare</Button>
    </section>
  );
}
