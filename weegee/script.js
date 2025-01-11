// List of possible random names derived from "weegee"
const namePool = [
    "Weegee", "Weegz", "Weegster", "Wiggy", "WeegeeOne", "Wheegee", "Wigster", "Weegius", 
    "Weegify", "Weggy", "Wegster", "Weegatron", "Weegzilla", "Weegetron", "Weezy", 
    "WeggyBoy", "Weegemaster", "Weegemancer", "WeggyPants", "WeegeeLord"
  ];
  
  // Keep track of used names
  const usedNames = new Set();
  
  // Function to generate a unique name
  function getUniqueName() {
    let name;
    
    do {
      // Randomly choose a name from the pool
      name = namePool[Math.floor(Math.random() * namePool.length)];
      
      // If this name is already used, append "2"
      if (usedNames.has(name)) {
        name += "2";
      } else {
        // If it's a new name, add it to the set of used names
        usedNames.add(name);
        break;
      }
    } while (true);
  
    return name;
  }
  


// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);  // Starting position for camera
camera.lookAt(0, 5, 0);

// Create a WebGL renderer and set the size of the canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);  // Add the renderer's canvas to the body

// Create a floor with a texture
const floorTexture = new THREE.TextureLoader().load('textures/grass.jpg');  // Adjust the path to your texture
floorTexture.wrapS = THREE.RepeatWrapping;  // Repeat the texture across the surface
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10);  // Set how many times it repeats in the X and Y direction

const floorGeometry = new THREE.PlaneGeometry(100, 100);  // A large floor plane
const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });  // Apply texture to the material
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;  // Make the floor flat (rotate it by 90 degrees)
scene.add(floor);  // Add the floor to the scene

// Create a texture for the NPC sprites (adjust the path to your sprite)
const npcTexture = new THREE.TextureLoader().load('sprites/Weegee.webp');  // Replace with your actual path
npcTexture.minFilter = THREE.NearestFilter;  // Ensure crisp edges for the texture
npcTexture.magFilter = THREE.NearestFilter;

// NPC Material and Sprite Setup
const npcMaterial = new THREE.SpriteMaterial({ map: npcTexture });

// Define a variable to control the number of NPCs
const numNPCs = 20;  // Change this number to adjust the number of NPCs
let npcs = [];

// Create the NPCs
for (let i = 0; i < numNPCs; i++) {
    const npc = new THREE.Sprite(npcMaterial);
    npc.scale.set(2, 5, 2);  // Scale up the NPC sprite (adjusted size)
    
    // Set initial position above the floor based on the sprite height (half the scale.y)
    npc.position.set(Math.random() * 20 - 10, 2.5, Math.random() * 20 - 10);  // Position is 2.5 units above the ground (half of 5)
    
    npc.velocity = new THREE.Vector3(0, 0, 0);  // Initialize velocity
    npcs.push(npc);
    scene.add(npc);
  }
  
  // NPC Movement - Move randomly at intervals, add gravity and jumping behavior
  function updateNPCs() {
    npcs.forEach(npc => {
      // Randomize movement at intervals
      if (Math.random() < 0.02) {  // Small chance to change direction
        const randomDirection = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5);
        randomDirection.normalize();
        npc.velocity = randomDirection.multiplyScalar(0.1);
      }
  
      // Apply gravity (simple falling effect)
      npc.velocity.y -= 0.02;  // Simulate gravity
  
      // Jumping behavior (simple condition)
      if (npc.position.y <= 2.5) {  // Jump when close to the ground (2.5 is half the sprite's height)
        npc.velocity.y = 0.3;  // Jump with a small upward velocity
      }
  
      // Apply movement
      npc.position.add(npc.velocity);
  
      // Keep NPCs on the plane and above the floor
      if (npc.position.x > 50) npc.position.x = 50;
      if (npc.position.x < -50) npc.position.x = -50;
      if (npc.position.z > 50) npc.position.z = 50;
      if (npc.position.z < -50) npc.position.z = -50;
      if (npc.position.y < 2.5) npc.position.y = 2.5;  // Prevent NPCs from falling through the floor
    });
  }
  

// Handle window resizing to adjust the camera and renderer
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();  // Important to update the projection matrix
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle WASD and Arrow Key Movement for the Camera
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let speed = 0.6;  // Movement speed

window.addEventListener('keydown', (event) => {
  if (event.key === 'w' || event.key === 'ArrowUp') moveForward = true;
  if (event.key === 's' || event.key === 'ArrowDown') moveBackward = true;
  if (event.key === 'a' || event.key === 'ArrowLeft') moveLeft = true;
  if (event.key === 'd' || event.key === 'ArrowRight') moveRight = true;
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'w' || event.key === 'ArrowUp') moveForward = false;
  if (event.key === 's' || event.key === 'ArrowDown') moveBackward = false;
  if (event.key === 'a' || event.key === 'ArrowLeft') moveLeft = false;
  if (event.key === 'd' || event.key === 'ArrowRight') moveRight = false;
});

// Update camera position based on keyboard input
function updateCamera() {
  // Move the camera along the world axes, not the camera's local axes
  const direction = new THREE.Vector3(0, 0, 0);  // This will store the direction to move

  // Adjust movement direction based on key presses
  if (moveForward) direction.z -= 1;
  if (moveBackward) direction.z += 1;
  if (moveLeft) direction.x -= 1;
  if (moveRight) direction.x += 1;

  // Normalize the direction vector to avoid faster diagonal movement
  direction.normalize();

  // Apply the movement, but in world space (by multiplying by camera.worldToLocal)
  camera.translateOnAxis(direction, speed);
}

// OrbitControls for mouse-based camera movement (import it into the HTML as needed)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;


// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update camera position
  updateCamera();

  // Update NPC positions
  updateNPCs();

  // Render the scene from the perspective of the camera
  renderer.render(scene, camera);
}

animate();  // Start the animation loop


