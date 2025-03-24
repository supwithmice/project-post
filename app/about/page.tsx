'use client'
import { Divider } from "@mantine/core"
import { useRouter } from "next/navigation"

export default function About() {
  const router = useRouter()
  return (<div>
    <h1>About</h1>
    <button onClick={() => router.push('/')}>home</button>
  </div>)
}
