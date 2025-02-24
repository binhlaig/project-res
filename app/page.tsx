"use client"

import { useSession } from "next-auth/react"
import Link from "next/link";


const mainpage = () => {
  const { data: session } = useSession();
  const user = session?.user

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {!user && (
        <div className="border border-solid border-black rounded">
          <Link href="/login">Log In</Link>
        </div>
      )}
      {user && (
        <div className="border border-solid border-black rounded">
          <Link href="/dashboard">home</Link>
        </div>
      )}
    </div>
  )
}

export default mainpage