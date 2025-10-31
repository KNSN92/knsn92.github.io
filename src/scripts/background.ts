import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

function setupBackground() {
    const bgCanvas = document.getElementById("bg-canvas")! as HTMLCanvasElement;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
        canvas: bgCanvas
    });

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00081f);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 600);
    // const controls = new OrbitControls(camera, document.documentElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    let material;

    const saturnLikeSys = new THREE.Group();

    material = new THREE.MeshPhongMaterial({ color: 0x00ccff, opacity: 0.8, transparent: true });
    const sphereGeom = new THREE.SphereGeometry(80);
    const saturnLikePlanet = new THREE.Mesh(sphereGeom, material);
    saturnLikeSys.add(saturnLikePlanet);
    
    let ringGeom;
    let ring;
    const rings = [] as THREE.Mesh[][];
    material = new THREE.MeshPhongMaterial({ color: 0xff00ff, opacity: 0.8, transparent: true });
    ringGeom = new THREE.RingGeometry(150, 200, 45, 1, 0, Math.PI * 1.5);
    ring = new THREE.Mesh(ringGeom, material);
    rings.push([ring]);
    saturnLikeSys.add(ring);
    material = new THREE.MeshPhongMaterial({ color: 0x88ff88, opacity: 0.8, transparent: true });
    ringGeom = new THREE.RingGeometry(250, 350, 45, 1, Math.PI * 1.5, Math.PI);
    ring = new THREE.Mesh(ringGeom, material);
    rings.push([ring]);
    saturnLikeSys.add(ring);
    material = new THREE.MeshPhongMaterial({ color: 0x88ffff, opacity: 0.8, transparent: true });
    ringGeom = new THREE.RingGeometry(250, 325, 45, 1, Math.PI * 0.75, Math.PI * 0.5);
    ring = new THREE.Mesh(ringGeom, material);
    rings.at(-1)!.push(ring);
    saturnLikeSys.add(ring);
    material = new THREE.MeshPhongMaterial({ color: 0xffff88, opacity: 0.8, transparent: true });
    ringGeom = new THREE.RingGeometry(400, 450, 45, 1, Math.PI * 1.25, Math.PI * 0.5);
    ring = new THREE.Mesh(ringGeom, material);
    rings.push([ring]);
    saturnLikeSys.add(ring);
    material = new THREE.MeshPhongMaterial({ color: 0xff8888, opacity: 0.8, transparent: true });
    ringGeom = new THREE.RingGeometry(400, 550, 45, 1, Math.PI * 0, Math.PI);
    ring = new THREE.Mesh(ringGeom, material);
    rings.at(-1)!.push(ring);
    saturnLikeSys.add(ring);

    saturnLikeSys.rotation.x = -0.8;
    saturnLikeSys.rotation.y = 0.4;
    saturnLikeSys.position.x = -300;
    saturnLikeSys.position.z = 100;
    scene.add(saturnLikeSys);

    // const planeGeom = new THREE.PlaneGeometry(1200, 675);
    // const texLoader = new THREE.TextureLoader();
    // const texBg = texLoader.load("/bg.png");
    // const planeMaterial = new THREE.MeshBasicMaterial({ map: texBg });
    // const plane = new THREE.Mesh(planeGeom, planeMaterial);
    // plane.position.set(0, 0, -200);
    // scene.add(plane);

    const starWidth = width * 3;
    const starHeight = height * 3;

    function genStarParticles() {
        const len = Math.min(starWidth / 6 + starHeight / 4, 50000);
        let vertices: number[] = [];
        let colors: number[] = [];
        let comet: number[] = [];
        for(let i = 0; i < len; i++) {
            const x = starWidth * (Math.random() - 0.5) * 2;
            const y = starHeight * (Math.random() - 0.5) * 2;
            const z = -300 - 1600 * (Math.random());
            vertices.push(x, y, z);
    
            const r = Math.random() * 0.5 + 0.5;
            const g = Math.random() * 0.5 + 0.5;
            const b = Math.random() * 0.5 + 0.5;
            colors.push(r, g, b);

            if(Math.random() < 0.1) {
                comet.push((Math.random() - 0.5) * 2.5);
                comet.push((Math.random() - 0.5) * 2.5);
            }else {
                comet.push(1.0);
                comet.push(1.0);
            }
        }
        bufferGeom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        bufferGeom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        bufferGeom.setAttribute("comet", new THREE.Float32BufferAttribute(comet, 2));
    }
    const bufferGeom = new THREE.BufferGeometry();
    genStarParticles();

    const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
            "viewport": { value: new THREE.Vector2(0, 0) },
            "offset": { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: `
            varying vec3 vColor;
            varying float depth;

            in vec3 color;
            in vec2 comet;

            uniform vec2 viewport;
            uniform vec2 offset;

            void main() {
                depth = position.z * position.z;
                vec3 newPosition = position + vec3(offset * comet * (depth * -0.0025) * 1.5, 0);
                newPosition = vec3(mod(newPosition.x, viewport.x), mod(newPosition.y, viewport.y), newPosition.z) - vec3(viewport.x * 0.5, viewport.y * 0.5, 0.0);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                gl_PointSize = depth * 0.00005;
                vColor = color;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            varying float depth;

            out vec4 outColor;
            void main() {
                outColor = vec4(vColor * (1.0 - depth * 0.000001), 1.0);
            }
        `,
        glslVersion: THREE.GLSL3
    });
    const points = new THREE.Points(bufferGeom, particleMaterial);
    scene.add(points);
    
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;
    let lastX: number;
    let lastY: number;
    let starOffset = new THREE.Vector2(0, 0);
    let starVelocity = new THREE.Vector2(Math.random() * 0.02, Math.random() * 0.02);

    function refreshCanvasSize() {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        starVelocity = new THREE.Vector2(Math.random() * 0.02, Math.random() * 0.02);
        particleMaterial.uniforms["viewport"] = { value: new THREE.Vector2(starWidth, starHeight) };
        genStarParticles();
    }

    window.addEventListener("DOMContentLoaded", refreshCanvasSize);
    window.addEventListener("resize", refreshCanvasSize);

    function onmove(e: MouseEvent | TouchEvent) {
        function getPos(e: MouseEvent | TouchEvent) {
            if(e instanceof MouseEvent) {
                return [e.clientX, e.clientY];
            }else{
                return [
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY
                ];
            }
        }
        if(!(lastX && lastY)) {
            [lastX, lastY] = getPos(e);
        }
        const [currentX, currentY] = getPos(e);
        mouseSpeedX = (currentX - lastX) / width;
        mouseSpeedY = (currentY - lastY) / height;
        lastX = currentX;
        lastY = currentY;

        let input = new THREE.Vector2(-mouseSpeedX, mouseSpeedY).multiplyScalar(0.05);
        const input_len = input.length();
        const star_vel_len = starVelocity.length();
        const diff = (input_len * star_vel_len > 0) ? input.dot(starVelocity) / (input_len * star_vel_len) : 0;
        input = input.multiplyScalar((1 - diff + 1));
        starVelocity = starVelocity.add(input);
    }

    window.addEventListener("mousemove", onmove);
    window.addEventListener("touchmove", onmove)
    
    let rotVelX = 0;
    let rotVelY = 0;

    tick();

    function tick() {
        rotVelX += mouseSpeedY * Math.PI / 15;
        rotVelY += mouseSpeedX * Math.PI / 15;
        mouseSpeedX = 0;
        mouseSpeedY = 0;
        rotVelX = (rotVelX + 0.002) * 0.95 - 0.002;
        rotVelY = (rotVelY + 0.002) * 0.95 - 0.002;
        // starVelocity = starVelocity.add(new THREE.Vector2(0.005, 0.005)).multiplyScalar(0.99).sub(new THREE.Vector2(0.005, 0.005));

        rings.forEach((ringss, i) => {
            ringss.forEach((ring) => {
                const ringGeom = ring.geometry as THREE.RingGeometry;
                const r = ringGeom.parameters.innerRadius / 100;
                const speed = 4 / (r * r)
                ring.rotateZ((rotVelX + rotVelY) * speed * (i % 2 === 0 ? 1 : -1));
            });
        });

        starOffset = starOffset.add(starVelocity);
        particleMaterial.uniforms["offset"] = { value: starOffset }

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}

setupBackground();
