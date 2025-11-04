import CryptoJS from 'crypto-js';
import type { BlobConfig, BlobSkinType } from '@kwami';

/**
 * Configuration parameters that define a Kwami's DNA
 * Excludes background, audio effects, and other non-body-form attributes
 */
export interface KwamiDNAConfig {
  // Blob geometry
  resolution: number;
  
  // Deformation parameters
  spikes: { x: number; y: number; z: number };
  time: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  
  // Visual properties
  colors: { x: string; y: string; z: string };
  shininess: number;
  wireframe: boolean;
  
  // Skin type
  skin: BlobSkinType;
  
  // Scale and opacity
  baseScale?: number;
  opacity?: number;
}

/**
 * Normalize color to ensure consistent hashing
 * Converts colors to lowercase hex format without alpha
 */
function normalizeColor(color: string): string {
  // Remove # if present
  let hex = color.replace('#', '').toLowerCase();
  
  // If shorthand hex (e.g., "f0a"), expand to full (e.g., "ff00aa")
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Remove alpha if present (8-digit hex)
  if (hex.length === 8) {
    hex = hex.substring(0, 6);
  }
  
  return hex;
}

/**
 * Round number to specified decimal places for consistent hashing
 */
function roundTo(num: number, decimals: number = 3): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Calculate a unique DNA hash for a Kwami based on its body configuration
 * 
 * The DNA is a SHA-256 hash of the serialized body configuration.
 * Only body-form parameters are included (no background, audio, etc.)
 * 
 * @param config - Kwami body configuration
 * @returns 64-character hexadecimal SHA-256 hash representing the Kwami's DNA
 * 
 * @example
 * ```typescript
 * const dna = calculateKwamiDNA({
 *   resolution: 180,
 *   spikes: { x: 0.2, y: 0.2, z: 0.2 },
 *   time: { x: 1, y: 1, z: 1 },
 *   rotation: { x: 0, y: 0, z: 0 },
 *   colors: { x: '#ff0066', y: '#00ff66', z: '#6600ff' },
 *   shininess: 50,
 *   wireframe: false,
 *   skin: 'tricolor',
 *   baseScale: 1.0,
 *   opacity: 1
 * });
 * // Returns: "a1b2c3d4e5f6..."
 * ```
 */
export function calculateKwamiDNA(config: KwamiDNAConfig): string {
  // Create a normalized, deterministic representation
  const dnaData = {
    // Geometry
    resolution: config.resolution,
    
    // Deformation (rounded to 3 decimal places for consistency)
    spikes: {
      x: roundTo(config.spikes.x, 3),
      y: roundTo(config.spikes.y, 3),
      z: roundTo(config.spikes.z, 3),
    },
    time: {
      x: roundTo(config.time.x, 3),
      y: roundTo(config.time.y, 3),
      z: roundTo(config.time.z, 3),
    },
    rotation: {
      x: roundTo(config.rotation.x, 4), // Higher precision for rotation
      y: roundTo(config.rotation.y, 4),
      z: roundTo(config.rotation.z, 4),
    },
    
    // Visual (normalized colors)
    colors: {
      x: normalizeColor(config.colors.x),
      y: normalizeColor(config.colors.y),
      z: normalizeColor(config.colors.z),
    },
    shininess: Math.round(config.shininess), // Integer value
    wireframe: config.wireframe ? 1 : 0, // Boolean as number
    
    // Skin
    skin: config.skin,
    
    // Scale and opacity
    baseScale: roundTo(config.baseScale ?? 1.0, 2),
    opacity: roundTo(config.opacity ?? 1.0, 2),
  };
  
  // Serialize to deterministic JSON string (sorted keys)
  const jsonString = JSON.stringify(dnaData, Object.keys(dnaData).sort());
  
  // Calculate SHA-256 hash
  const hash = CryptoJS.SHA256(jsonString);
  
  // Return as hexadecimal string
  return hash.toString(CryptoJS.enc.Hex);
}

/**
 * Extract DNA configuration from a full Blob configuration
 * Useful when you have a complete BlobConfig and need just the DNA-relevant parts
 */
export function extractDNAConfig(
  blobConfig: BlobConfig,
  skin: BlobSkinType,
  baseScale?: number,
  opacity?: number
): KwamiDNAConfig {
  return {
    resolution: blobConfig.resolution ?? 180,
    spikes: blobConfig.spikes ?? { x: 0.2, y: 0.2, z: 0.2 },
    time: blobConfig.time ?? { x: 1, y: 1, z: 1 },
    rotation: blobConfig.rotation ?? { x: 0, y: 0, z: 0 },
    colors: blobConfig.colors ?? { x: '#ff0000', y: '#00ff00', z: '#0000ff' },
    shininess: blobConfig.shininess ?? 50,
    wireframe: blobConfig.wireframe ?? false,
    skin,
    baseScale: baseScale ?? 1.0,
    opacity: opacity ?? 1.0,
  };
}

/**
 * Generate a short DNA identifier from the full hash
 * First 16 characters of the hash for display purposes
 * 
 * @param dna - Full 64-character DNA hash
 * @returns Short 16-character DNA identifier
 */
export function getShortDNA(dna: string): string {
  return dna.substring(0, 16);
}

/**
 * Validate that two Kwami configurations produce the same DNA
 * Useful for testing and verification
 */
export function compareDNA(config1: KwamiDNAConfig, config2: KwamiDNAConfig): boolean {
  const dna1 = calculateKwamiDNA(config1);
  const dna2 = calculateKwamiDNA(config2);
  return dna1 === dna2;
}
