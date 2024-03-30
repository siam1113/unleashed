import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    router.push("/");
  }

  return <div className="w-full p-3 flex flex-row justify-between bg-primary mt-2">
    <ul className="flex flex-row">
      <li className="p-3 text-white border border-primary rounded text-lg font-medium bg-green-700 me-1 cursor-pointer" onClick={() => router.push("/find/team")}>Find Your Team</li>
      <li className="p-3 text-white border border-primary rounded text-lg font-medium bg-green-700 me-1 cursor-pointer" onClick={() => router.push("/find/individual")}>Find Individual</li>
      <li className="p-3 text-white border border-primary rounded text-lg font-medium bg-green-700 me-1 cursor-pointer" onClick={() => router.push("/profile")}>Your Profile</li>
    </ul>
    <Button color="p-3 text-white border border-primary rounded text-lg font-medium bg-green-600" onClick={handleLogout} >Logout</Button>
  </div>
}