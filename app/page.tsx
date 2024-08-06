'use client'
import ParticleSystem from "@/components/Particle";
import { ModeToggle } from "@/components/theme-changer";
import ThreeScene from "@/components/ThreeScene";
import { useRef, useState } from "react";


export default function Home() {
  return (
    <div >
      <ModeToggle
      
      />
      <div>
        <ThreeScene/>
      </div>

    </div>
  );
}
