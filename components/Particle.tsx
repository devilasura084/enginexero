import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';

const ParticleSystem = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer());
  const particleSystem = useRef<THREE.Points>(new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 })));

  useEffect(() => {
    if (mountRef.current) {
      renderer.current.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
      mountRef.current.appendChild(renderer.current.domElement);

      // Create the particle system
      const particleCount = 1000;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
      particleSystem.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      scene.current.add(particleSystem.current);

      // Animate the particles
      const animate = () => {
        requestAnimationFrame(animate);
        particleSystem.current.rotation.x += 0.001;
        particleSystem.current.rotation.y += 0.002;
        renderer.current.render(scene.current, camera.current);
      };
      animate();
    }
  }, []);

  return <div className='w-[70svw] h-[70svh] m-auto' ref={mountRef} />;
};

export default ParticleSystem;