import { Button } from "@repo/ui";
import { useContext } from "react";
import { AuthContext } from "../components/authenticator";

export async function Login() {
  const context = useContext(AuthContext);
  const handleLogin = () => {
    context.setIsAuthenticated(true);
  }
  return <Button color="p-5 text-white border rounded text-xl font-bold bg-green-700" onClick={handleLogin}>Login</Button>
}