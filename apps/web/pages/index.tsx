import { useRouter } from "next/router";
import { useEffect } from "react";
import Profile from "./profile";

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/profile');
  });

  return <Profile />;
}