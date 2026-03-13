import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface StlModelProps {
  url: string;
  scale: number;
}

const StlModel = ({ url, scale }: StlModelProps) => {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current && geometry) {
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;
      if (box) {
        const center = new THREE.Vector3();
        box.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);
      }
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry} scale={[scale, scale, scale]}>
      <meshStandardMaterial color="hsl(32, 95%, 55%)" metalness={0.3} roughness={0.6} />
    </mesh>
  );
};

interface StlViewerProps {
  file: File | null;
  scale: number;
}

const StlViewer = ({ file, scale }: StlViewerProps) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setObjectUrl(null);
    }
  }, [file]);

  if (!objectUrl) {
    return (
      <div className="w-full h-80 rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center">
        <p className="text-muted-foreground font-display text-lg">Upload an STL file to preview</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80 rounded-lg border border-border overflow-hidden bg-muted/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 150]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <Suspense fallback={null}>
          <StlModel url={objectUrl} scale={scale} />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
};

export default StlViewer;
