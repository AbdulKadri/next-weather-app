import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Globe from './Globe';

const CustomCanvas = () => {
    const handleGlobePointerDown = (e) => {
        e.stopPropagation();
    };

    return (
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} />
            <Globe
                textureUrl="/earth.jpg"
                onPointerDown={handleGlobePointerDown}
            />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.1}
                rotateSpeed={0.5}
                autoRotate={true}
                autoRotateSpeed={0.5}
            />
        </Canvas>
    );
};

export default CustomCanvas;
