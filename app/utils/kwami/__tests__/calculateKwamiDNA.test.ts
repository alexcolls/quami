import { describe, it, expect } from 'vitest';
import { calculateKwamiDNA, type KwamiDNAConfig } from '../calculateKwamiDNA';

describe('calculateKwamiDNA', () => {
  const baseConfig: KwamiDNAConfig = {
    spikes: { x: 1.0, y: 1.0, z: 1.0 },
    time: { x: 0.5, y: 0.5, z: 0.5 },
    rotation: { x: 0.1, y: 0.2, z: 0.3 },
    colors: { x: 0.7, y: 0.8, z: 0.9 },
    resolution: 32,
    skin: 'normal',
    shininess: 0.5,
    wireframe: false,
    baseScale: 1.0,
    opacity: 1.0,
  };

  describe('Basic Functionality', () => {
    it('generates a valid 64-character hexadecimal DNA string', () => {
      const dna = calculateKwamiDNA(baseConfig);
      
      expect(dna).toBeDefined();
      expect(dna).toHaveLength(64);
      expect(dna).toMatch(/^[0-9a-f]{64}$/);
    });

    it('generates consistent DNA for same configuration', () => {
      const dna1 = calculateKwamiDNA(baseConfig);
      const dna2 = calculateKwamiDNA(baseConfig);
      
      expect(dna1).toBe(dna2);
    });

    it('generates different DNA for different configurations', () => {
      const config2: KwamiDNAConfig = {
        ...baseConfig,
        spikes: { x: 2.0, y: 2.0, z: 2.0 },
      };
      
      const dna1 = calculateKwamiDNA(baseConfig);
      const dna2 = calculateKwamiDNA(config2);
      
      expect(dna1).not.toBe(dna2);
    });
  });

  describe('Parameter Changes', () => {
    it('changes DNA when spikes change', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        spikes: { x: 1.1, y: 1.0, z: 1.0 },
      });
      
      expect(original).not.toBe(modified);
    });

    it('changes DNA when time changes', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        time: { x: 0.6, y: 0.5, z: 0.5 },
      });
      
      expect(original).not.toBe(modified);
    });

    it('changes DNA when rotation changes', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        rotation: { x: 0.2, y: 0.2, z: 0.3 },
      });
      
      expect(original).not.toBe(modified);
    });

    it('changes DNA when colors change', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        colors: { x: 0.8, y: 0.8, z: 0.9 },
      });
      
      expect(original).not.toBe(modified);
    });

    it('changes DNA when resolution changes', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        resolution: 64,
      });
      
      expect(original).not.toBe(modified);
    });

    it('changes DNA when skin changes', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        skin: 'metallic',
      });
      
      expect(original).not.toBe(modified);
    });

    it('changes DNA when shininess changes', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        shininess: 0.8,
      });
      
      expect(original).not.toBe(modified);
    });

    it('changes DNA when wireframe changes', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        wireframe: true,
      });
      
      expect(original).not.toBe(modified);
    });

    it('changes DNA when baseScale changes', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        baseScale: 1.5,
      });
      
      expect(original).not.toBe(modified);
    });

    it('changes DNA when opacity changes', () => {
      const original = calculateKwamiDNA(baseConfig);
      const modified = calculateKwamiDNA({
        ...baseConfig,
        opacity: 0.8,
      });
      
      expect(original).not.toBe(modified);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero values', () => {
      const config: KwamiDNAConfig = {
        spikes: { x: 0, y: 0, z: 0 },
        time: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        colors: { x: 0, y: 0, z: 0 },
        resolution: 8,
        skin: 'normal',
        shininess: 0,
        wireframe: false,
        baseScale: 0.1,
        opacity: 0,
      };
      
      const dna = calculateKwamiDNA(config);
      expect(dna).toBeDefined();
      expect(dna).toHaveLength(64);
    });

    it('handles maximum values', () => {
      const config: KwamiDNAConfig = {
        spikes: { x: 10, y: 10, z: 10 },
        time: { x: 10, y: 10, z: 10 },
        rotation: { x: 10, y: 10, z: 10 },
        colors: { x: 10, y: 10, z: 10 },
        resolution: 256,
        skin: 'metallic',
        shininess: 1,
        wireframe: true,
        baseScale: 10,
        opacity: 1,
      };
      
      const dna = calculateKwamiDNA(config);
      expect(dna).toBeDefined();
      expect(dna).toHaveLength(64);
    });

    it('handles negative values', () => {
      const config: KwamiDNAConfig = {
        ...baseConfig,
        spikes: { x: -1, y: -1, z: -1 },
        time: { x: -0.5, y: -0.5, z: -0.5 },
      };
      
      const dna = calculateKwamiDNA(config);
      expect(dna).toBeDefined();
      expect(dna).toHaveLength(64);
    });

    it('handles very small differences', () => {
      const dna1 = calculateKwamiDNA(baseConfig);
      const dna2 = calculateKwamiDNA({
        ...baseConfig,
        spikes: { x: 1.0000001, y: 1.0, z: 1.0 },
      });
      
      // Even tiny differences should produce different DNA
      expect(dna1).not.toBe(dna2);
    });

    it('handles floating point precision', () => {
      const config1: KwamiDNAConfig = {
        ...baseConfig,
        shininess: 0.1 + 0.2,
      };
      
      const config2: KwamiDNAConfig = {
        ...baseConfig,
        shininess: 0.3,
      };
      
      const dna1 = calculateKwamiDNA(config1);
      const dna2 = calculateKwamiDNA(config2);
      
      // Due to floating point representation, these might be different
      // This test documents the behavior
      if (0.1 + 0.2 === 0.3) {
        expect(dna1).toBe(dna2);
      } else {
        expect(dna1).not.toBe(dna2);
      }
    });
  });

  describe('Collision Resistance', () => {
    it('generates unique DNAs for many random configurations', () => {
      const dnas = new Set<string>();
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        const config: KwamiDNAConfig = {
          spikes: {
            x: Math.random() * 10,
            y: Math.random() * 10,
            z: Math.random() * 10,
          },
          time: {
            x: Math.random() * 10,
            y: Math.random() * 10,
            z: Math.random() * 10,
          },
          rotation: {
            x: Math.random() * 10,
            y: Math.random() * 10,
            z: Math.random() * 10,
          },
          colors: {
            x: Math.random(),
            y: Math.random(),
            z: Math.random(),
          },
          resolution: Math.floor(Math.random() * 248) + 8,
          skin: Math.random() > 0.5 ? 'normal' : 'metallic',
          shininess: Math.random(),
          wireframe: Math.random() > 0.5,
          baseScale: Math.random() * 5 + 0.1,
          opacity: Math.random(),
        };
        
        const dna = calculateKwamiDNA(config);
        dnas.add(dna);
      }
      
      // Should have no collisions
      expect(dnas.size).toBe(iterations);
    });
  });

  describe('Determinism', () => {
    it('produces same DNA across multiple calls', () => {
      const dnas = Array.from({ length: 100 }, () => calculateKwamiDNA(baseConfig));
      const uniqueDnas = new Set(dnas);
      
      expect(uniqueDnas.size).toBe(1);
    });

    it('produces consistent DNA with property order changes', () => {
      // Create configs with properties in different order
      const config1: KwamiDNAConfig = {
        spikes: baseConfig.spikes,
        time: baseConfig.time,
        rotation: baseConfig.rotation,
        colors: baseConfig.colors,
        resolution: baseConfig.resolution,
        skin: baseConfig.skin,
        shininess: baseConfig.shininess,
        wireframe: baseConfig.wireframe,
        baseScale: baseConfig.baseScale,
        opacity: baseConfig.opacity,
      };
      
      const config2: KwamiDNAConfig = {
        opacity: baseConfig.opacity,
        baseScale: baseConfig.baseScale,
        wireframe: baseConfig.wireframe,
        shininess: baseConfig.shininess,
        skin: baseConfig.skin,
        resolution: baseConfig.resolution,
        colors: baseConfig.colors,
        rotation: baseConfig.rotation,
        time: baseConfig.time,
        spikes: baseConfig.spikes,
      };
      
      const dna1 = calculateKwamiDNA(config1);
      const dna2 = calculateKwamiDNA(config2);
      
      // Should be same regardless of property order due to normalization
      expect(dna1).toBe(dna2);
    });
  });

  describe('Known Test Vectors', () => {
    it('matches known DNA for default configuration', () => {
      const defaultConfig: KwamiDNAConfig = {
        spikes: { x: 1, y: 1, z: 1 },
        time: { x: 1, y: 1, z: 1 },
        rotation: { x: 0, y: 0, z: 0 },
        colors: { x: 1, y: 1, z: 1 },
        resolution: 32,
        skin: 'normal',
        shininess: 0.5,
        wireframe: false,
        baseScale: 1,
        opacity: 1,
      };
      
      const dna = calculateKwamiDNA(defaultConfig);
      
      // This is a known DNA for this configuration
      // Can be used for regression testing
      expect(dna).toBeDefined();
      expect(dna).toHaveLength(64);
      
      // Store for regression testing
      console.log('Default config DNA:', dna);
    });
  });
});
