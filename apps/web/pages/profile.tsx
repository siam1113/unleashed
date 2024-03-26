import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import { AuthContext } from "../components/authenticator";
import { useContext } from "react";

export default async function Profile() {
  const router = useRouter();
  const handleLogout = () => {
    const context = useContext(AuthContext);
    context.setIsAuthenticated(false);
    router.push("/");
  }
  return <Button color="p-5 text-white border rounded text-xl font-bold bg-green-700" onClick={handleLogout} >Logout</Button>
}