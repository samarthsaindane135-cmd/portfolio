"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector3, Color, BufferGeometry, LineBasicMaterial } from "three";

const NODE_COUNT = 50;
const EDGE_DIST = 3.2;
const COLORS = {
  amber: new Color("#E8A33D"),
  teal: new Color("#5EEAD4"),
  muted: new Color("#8B93A7"),
};

function getPositions(count: number) {
  const positions: Vector3[] = [];
  for (let i = 0; i < count; i++) {
    positions.push(
      new Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 4
      )
    );
  }
  return positions;
}

function Scene() {
  const { pointer, viewport } = useThree();
  const nodes = useMemo(() => getPositions(NODE_COUNT), []);
  const [hovered, setHovered] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState(new Vector3(0, 0, 0));

  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < EDGE_DIST) {
          result.push([i, j]);
        }
      }
    }
    return result;
  }, [nodes]);

  // Scale for small viewports
  const scale = Math.min(viewport.width / 12, 1);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.08;
    const cx = pointer.x * 3;
    const cy = pointer.y * 2;
    const cp = new Vector3(cx, cy, 0);
    setCursorPos(cp);
  });

  return (
    <group scale={scale}>
      {/* Edges */}
      {edges.map(([i, j], idx) => {
        const start = nodes[i];
        const end = nodes[j];
        const mid = new Vector3().addVectors(start, end).multiplyScalar(0.5);
        const distToCursor = cursorPos.distanceTo(mid);
        const near = distToCursor < 3;
        return (
          <line key={`edge-${idx}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  start.x, start.y, start.z,
                  end.x, end.y, end.z,
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={near ? COLORS.amber : COLORS.muted}
              opacity={near ? 0.8 : 0.15}
              transparent
              linewidth={1}
            />
          </line>
        );
      })}

      {/* Nodes */}
      {nodes.map((pos, i) => {
        const distToCursor = cursorPos.distanceTo(pos);
        const near = distToCursor < 2.5;
        const size = near ? 0.25 : 0.12 + Math.random() * 0.08;
        return (
          <mesh
            key={`node-${i}`}
            position={pos}
            onPointerOver={() => setHovered(i)}
            onPointerOut={() => setHovered(null)}
          >
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial
              color={near ? COLORS.amber : hovered === i ? COLORS.teal : COLORS.muted}
              transparent
              opacity={near ? 1 : 0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ContextGraph() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
