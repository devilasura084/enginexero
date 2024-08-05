import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const acceleration = 0.001; 
  const deceleration = 0.002; 
  const maxSpeed = 0.1; 
  const maxjump=2;
  const gravity=0.001;
  const initialjumpspeed=0.1;
  const maxFallSpeed = 0.5;
  const [isAutoMoving, setIsAutoMoving] = useState(false);
  const autoMoveIntervalRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotateleft = useRef<boolean>(false);
  const rotateright = useRef<boolean>(false);
  const rotateup=useRef<boolean>(false);
  const rotatedown=useRef<boolean>(false);
  const moveLeft = useRef<boolean>(false);
  const moveRight = useRef<boolean>(false);
  const moveUp = useRef<boolean>(false);
  const moveDown = useRef<boolean>(false);
  const jump=useRef<boolean>(false);
  const isJumping = useRef<boolean>(false);
  const leftSpeed = useRef<number>(0);
  const rightSpeed = useRef<number>(0); 
  const upspeed=useRef<number>(0);
  const downspeed=useRef<number>(0);
  const frontspeed=useRef<number>(0);
  const backspeed=useRef<number>(0);
  const moveleftspeed=useRef<number>(0);
  const moverightspeed=useRef<number>(0);
  const jumpspeed=useRef<number>(0);
  

  useEffect(() => {
    if (!canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(width, height);

    const geometry = new THREE.BoxGeometry();
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
        new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
        new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
        new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
        new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Cyan
      ];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    camera.position.z = 5;
  
  
    const animate = () => {
      requestAnimationFrame(animate);
      if(rotateleft.current)
      {
        leftSpeed.current=Math.min(leftSpeed.current+acceleration,maxSpeed);
        cube.rotation.y -= leftSpeed.current;
      }
      if(!rotateleft.current)
      {
        if (leftSpeed.current > 0) {
          leftSpeed.current = Math.max(leftSpeed.current - deceleration, 0);
          cube.rotation.y -= leftSpeed.current; 
        }
      }
      if(rotateright.current)
      {
        rightSpeed.current=Math.min(rightSpeed.current+acceleration,maxSpeed);
        cube.rotation.y += rightSpeed.current;
      }
      if(!rotateright.current)
        {
          if (rightSpeed.current > 0) {
            rightSpeed.current = Math.max(rightSpeed.current - deceleration, 0);
            cube.rotation.y += rightSpeed.current; 
          }
        }
      if(rotateup.current)
        {
          upspeed.current=Math.min(upspeed.current+acceleration,maxSpeed);
          cube.rotation.x -= upspeed.current;
        }
      if(!rotateup.current)
        {
          if (upspeed.current > 0) {
            upspeed.current = Math.max(upspeed.current - deceleration, 0);
            cube.rotation.x -= upspeed.current; 
          }
        }
      if(rotatedown.current)
        {
          downspeed.current=Math.min(downspeed.current+acceleration,maxSpeed);
          cube.rotation.x += downspeed.current;
        }
      if(!rotatedown.current)
        {
          if (downspeed.current > 0) {
            downspeed.current = Math.max(downspeed.current - deceleration, 0);
            cube.rotation.x += downspeed.current; 
          }
        }
      if(moveUp.current)
        {
          frontspeed.current=Math.min(frontspeed.current+acceleration,maxSpeed);
          cube.position.z -= frontspeed.current;
        }
      if(!moveUp.current)
        {
          if (frontspeed.current > 0) {
            frontspeed.current = Math.max(frontspeed.current - deceleration, 0);
            cube.position.z -= frontspeed.current; 
          }
        }
      if(moveDown.current)
        {
          backspeed.current=Math.min(backspeed.current+acceleration,maxSpeed);
          cube.position.z += backspeed.current;
        }
      if(!moveDown.current)
        {
          if (backspeed.current > 0) {
            backspeed.current = Math.max(backspeed.current - deceleration, 0);
            cube.position.z += backspeed.current; 
          }
        }
      if(moveLeft.current)
        {
          moveleftspeed.current=Math.min(moveleftspeed.current+acceleration,maxSpeed);
          cube.position.x -= moveleftspeed.current;
        }
      if(!moveLeft.current)
        {
          if (moveleftspeed.current > 0) {
            moveleftspeed.current = Math.max(moveleftspeed.current - deceleration, 0);
            cube.position.x -= moveleftspeed.current; 
          }
        }
      if(moveRight.current)
        {
          moverightspeed.current=Math.min(moverightspeed.current+acceleration,maxSpeed);
          cube.position.x += moverightspeed.current;
        }
      if(!moveRight.current)
        {
          if (moverightspeed.current > 0) {
            moverightspeed.current = Math.max(moverightspeed.current - deceleration, 0);
            cube.position.x += moverightspeed.current; 
          }
        }
      if (jump.current && !isJumping.current) {
        jumpspeed.current = initialjumpspeed;
        isJumping.current = true;
      }
      
      if (isJumping.current) {
        // Apply jump velocity
        cube.position.y += jumpspeed.current;
        
        // Apply gravity
        jumpspeed.current -= gravity;
        
        // Cap fall speed
        if (jumpspeed.current < -maxFallSpeed) {
          jumpspeed.current = -maxFallSpeed;
        }
        
        // Check if we've reached the ground
        if (cube.position.y <= 0) {
          cube.position.y = 0;
          isJumping.current = false;
          jumpspeed.current = 0;
        }
        
        // Check if we've reached max height
        if (cube.position.y > maxjump) {
          cube.position.y = maxjump;
          jumpspeed.current = 0;
        }
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    const handlekeydown=(e:KeyboardEvent)=>{
      e.preventDefault();
      switch(e.key)
      {
        case 'ArrowLeft':
          rotateleft.current = true;
          break;
        case 'ArrowRight':
          rotateright.current=true;
          break;
        case 'ArrowUp':
          rotateup.current=true;
          break;
        case 'ArrowDown':
          rotatedown.current=true;
          break;
        case 'a': 
          moveLeft.current = true;
          break;
        case 'd': 
          moveRight.current = true;
          break;
        case 'w': 
          moveUp.current = true;
          break;
        case 's':
          moveDown.current = true;
          break;
        case ' ':
          jump.current=true;
          break;
      }
    }
    const handleKeyup = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          rotateleft.current=false;
          break;
        case 'ArrowRight':
          rotateright.current = false;
          break;
        case 'ArrowUp':
          rotateup.current=false;
          break;
        case 'ArrowDown':
          rotatedown.current=false;
          break;
        case 'a':
          moveLeft.current = false;
          break;
        case 'd':
          moveRight.current = false;
          break;
        case 'w':
          moveUp.current = false;
          break;
        case 's':
          moveDown.current = false;
          break;
        case ' ':
          jump.current=false;
          break;
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown',handlekeydown);
    window.addEventListener('keyup',handleKeyup)
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown',handlekeydown);
        window.removeEventListener('keyup',handleKeyup);
        if (autoMoveIntervalRef.current) {
          clearInterval(autoMoveIntervalRef.current);
        }
      };
  }, []);
  const simulateRandomKeypress = () => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'a', 'd', 'w', 's', ' '];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const event = new KeyboardEvent('keydown', { key: randomKey });
    window.dispatchEvent(event);
  
    // Simulate key release after a short delay
    setTimeout(() => {
      const releaseEvent = new KeyboardEvent('keyup', { key: randomKey });
      window.dispatchEvent(releaseEvent);
    }, Math.random() * 400 + 10); // Random duration between 100ms and 600ms
  };
  const toggleAutoMove = () => {
    if (isAutoMoving) {
      if (autoMoveIntervalRef.current) {
        clearInterval(autoMoveIntervalRef.current);
        autoMoveIntervalRef.current = null;
      }
    } else {
      autoMoveIntervalRef.current = window.setInterval(() => {
        simulateRandomKeypress();
      }, 300); // Simulate a keypress every second
    }
    setIsAutoMoving(!isAutoMoving);
  };
  return (<>
    <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    <button 
      onClick={toggleAutoMove} 
      className='absolute right-10 top-10'
    >
      {isAutoMoving ? 'Stop Auto Move' : 'Start Auto Move'}
    </button>
  </>);
};

export default ThreeScene;