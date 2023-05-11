import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { TextureLoader, SphereBufferGeometry, MeshStandardMaterial } from 'three';
import { gsap } from 'gsap';

const Globe = ({ textureUrl, onPointerDown }) => {
    const globeRef = useRef(); // Reference to the globe mesh
    const texture = useLoader(TextureLoader, textureUrl); // Load the texture

    const geometry = useMemo(() => new SphereBufferGeometry(3, 64, 64), []);
    const material = useMemo(() => {
        const texture = new TextureLoader().load(textureUrl);
        return new MeshStandardMaterial({ map: texture });
    }, [textureUrl]); // Load the texture

    useFrame(({ clock }) => {
        globeRef.current.rotation.y = 0.01 * clock.getElapsedTime();
    }); // Rotate the globe

    useEffect(() => {
        const timeline = gsap.timeline({ defaults: { duration: 1 } });
        timeline.fromTo(globeRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
    }, []); // Animate the globe scale

    if (!texture) {
        return null;
    } // If the texture is not loaded, don't render anything

    return (
        <mesh
            ref={globeRef}
            geometry={geometry}
            material={material}
            onPointerDown={onPointerDown}
        />
    ); // Render the globe
};

export default Globe;
