import * as THREE from "three";

// function setupBackground() {
//     const bgCanvas = document.getElementById("bg-canvas") as HTMLCanvasElement;
//     if (!bgCanvas) return;
//     const ctx = bgCanvas.getContext("2d");
//     if(!ctx) return;
//     const width = bgCanvas.width;
//     const height = bgCanvas.height;
//     ctx.fillStyle = "#fff";
//     ctx.font = "12px serif";
//     ctx.fillText("何か置く", 0, height * 0.25);
//     ctx.font = "9px serif";
//     ctx.fillText("画質ガビガビや", 0, height * 0.75);
// }

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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    let material;
    const cubeGeom = new THREE.BoxGeometry(400, 400, 400);
    material = new THREE.MeshPhongMaterial({ color: 0x00ffcc,  });
    const cube1 = new THREE.Mesh(cubeGeom, material);
    cube1.translateX(600);
    // scene.add(cube1);
    material = new THREE.MeshPhongMaterial({ color: 0x00ccff });;
    const cube2 = new THREE.Mesh(cubeGeom, material);
    cube2.translateX(-600);
    // scene.add(cube2);

    // const planeGeom = new THREE.PlaneGeometry(1200, 675);
    // const texLoader = new THREE.TextureLoader();
    // const texBg = texLoader.load("/bg.png");
    // const planeMaterial = new THREE.MeshBasicMaterial({ map: texBg });
    // const plane = new THREE.Mesh(planeGeom, planeMaterial);
    // plane.position.set(0, 0, -200);
    // scene.add(plane);

    function genStarParticles() {
        const len = Math.min(width / 6 + height / 4, 50000);
        let vertices: number[] = [];
        let colors: number[] = [];
        let comet: number[] = [];
        for(let i = 0; i < len; i++) {
            const x = width * (Math.random() - 0.5) * 2;
            const y = height * (Math.random() - 0.5) * 2;
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

            in vec3 color;
            in vec2 comet;

            uniform vec2 viewport;
            uniform vec2 offset;

            void main() {
                vec3 newPosition = position + vec3(offset * comet * position.z * 1.5, 0);
                newPosition = vec3(mod(newPosition.x, viewport.x), mod(newPosition.y, viewport.y), newPosition.z) - vec3(viewport.x * 0.5, viewport.y * 0.5, 0.0);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                gl_PointSize = position.z * -0.015;
                vColor = color;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            out vec4 outColor;
            void main() {
                outColor = vec4(vColor, 1.0);
            }
        `,
        glslVersion: THREE.GLSL3
    });
    const points = new THREE.Points(bufferGeom, particleMaterial);
    scene.add(points);

    function refreshCanvasSize() {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        particleMaterial.uniforms["viewport"] = { value: new THREE.Vector2(width * 1.5, height * 1.5) };
        genStarParticles();
    }

    window.addEventListener("DOMContentLoaded", refreshCanvasSize);
    window.addEventListener("resize", refreshCanvasSize);
    
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;
    let lastMouseX: number;
    let lastMouseY: number;
    let starOffset = new THREE.Vector2(0, 0);
    let starVelocity = new THREE.Vector2(Math.random() * 0.02, Math.random() * 0.02);

    window.addEventListener("mousemove", (e) => {
        if(!(lastMouseX && lastMouseY)) {
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }
        mouseSpeedX = (e.clientX - lastMouseX) / width;
        mouseSpeedY = (e.clientY - lastMouseY) / height;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        let input = new THREE.Vector2(-mouseSpeedX, mouseSpeedY).multiplyScalar(0.05);
        const input_len = input.length();
        const star_vel_len = starVelocity.length();
        const diff = (input_len * star_vel_len > 0) ? input.dot(starVelocity) / (input_len * star_vel_len) : 0;
        input = input.multiplyScalar((1 - diff) + 1);
        starVelocity = starVelocity.add(input);
    });
    
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
        // starVelocity = starVelocity.multiplyScalar(0.99);

        cube1.rotateX(rotVelX);
        cube1.rotateY(rotVelY);
        cube2.rotateX(rotVelX);
        cube2.rotateY(rotVelY);

        starOffset = starOffset.add(starVelocity);
        particleMaterial.uniforms["offset"] = { value: starOffset }

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}

setupBackground();
