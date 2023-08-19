import {
  EffectComposer,
  Vignette,
  Bloom,
  HueSaturation,
} from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer disableNormalPass multisampling={false}>
      <Bloom mipmapBlur intensity={1.8} luminanceThreshold={0.9} radius={0.9} />
      <Vignette offset={0.1} darkness={0.85} eskil={false} />
      <HueSaturation
        hue={0.1} // hue in radians
        saturation={0.15} // saturation in radians
      />
    </EffectComposer>
  );
}
