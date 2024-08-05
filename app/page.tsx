'use client'
import { ModeToggle } from "@/components/theme-changer";
import ThreeScene from "@/components/ThreeScene";
import { useRef, useState } from "react";


export default function Home() {
  
  return (
    <div>
      <ModeToggle/>
      <ThreeScene/>
    </div>
  );
}
