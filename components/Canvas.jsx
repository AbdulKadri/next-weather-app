import { Canvas } from 'react-three-fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Globe from './Globe';

const CustomCanvas = () => {
    const handleGlobePointerDown = (e) => {
        e.stopPropagation(); // Prevent the click from propagating to the parent element
    };

    return (
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} /> {/* Set the camera position */}
            <ambientLight intensity={0.5} /> {/* Add some ambient light */}
            <pointLight position={[5, 5, 5]} /> {/* Add a point light */}
            <Globe
                textureUrl="/earth.jpg"
                onPointerDown={handleGlobePointerDown}
            /> {/* Render the globe */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.1}
                rotateSpeed={0.5}
                autoRotate={true}
                autoRotateSpeed={0.5}
            /> {/* Add orbit controls */}
        </Canvas>
    ); // Render the canvas
};

export default CustomCanvas;
