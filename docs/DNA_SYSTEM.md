# Kwami DNA System

## Overview

The Kwami DNA system ensures that each Kwami NFT is unique and verifiably distinct from all other Kwamis. The DNA is a cryptographic fingerprint derived from the Kwami's body configuration, stored on-chain in the Solana blockchain.

## What is DNA?

DNA (Digital Nucleic Address) is a 256-bit hash (64 hexadecimal characters) that uniquely identifies a Kwami's physical appearance. It's calculated using SHA-256 hashing of the body configuration parameters.

### Example DNA
```
a3f5b2c8e9d4f1a7b6c3d8e2f9a1b4c7d0e5f8a2b9c6d3e0f7a4b1c8d5e2f9a6
```

## DNA Calculation

### Included Parameters

The DNA is calculated **only** from the Kwami's **body configuration**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `spikes.x` | number | X-axis spike intensity |
| `spikes.y` | number | Y-axis spike intensity |
| `spikes.z` | number | Z-axis spike intensity |
| `time.x` | number | X-axis time modulation |
| `time.y` | number | Y-axis time modulation |
| `time.z` | number | Z-axis time modulation |
| `rotation.x` | number | X-axis rotation speed |
| `rotation.y` | number | Y-axis rotation speed |
| `rotation.z` | number | Z-axis rotation speed |
| `colors.x` | number | X-axis color variation |
| `colors.y` | number | Y-axis color variation |
| `colors.z` | number | Z-axis color variation |
| `resolution` | number | Mesh resolution |
| `skin` | string | Skin type (e.g., "normal", "metallic") |
| `shininess` | number | Surface shininess value |
| `wireframe` | boolean | Wireframe mode enabled |
| `baseScale` | number | Base scale multiplier |
| `opacity` | number | Transparency level |

### Excluded Parameters

The following are **NOT** included in DNA calculation:

- **Background configuration** - Users can change backgrounds without affecting DNA
- **Audio effects** - Sound settings don't alter the visual identity
- **Mind configuration** - AI personality traits are separate from appearance
- **Soul configuration** - Emotional/behavioral traits are separate from appearance

### Calculation Algorithm

```typescript
function calculateKwamiDNA(config: KwamiDNAConfig): string {
  // 1. Create normalized object with sorted keys
  const normalized = {
    baseScale: config.baseScale,
    colors: {
      x: config.colors.x,
      y: config.colors.y,
      z: config.colors.z,
    },
    opacity: config.opacity,
    resolution: config.resolution,
    rotation: {
      x: config.rotation.x,
      y: config.rotation.y,
      z: config.rotation.z,
    },
    shininess: config.shininess,
    skin: config.skin,
    spikes: {
      x: config.spikes.x,
      y: config.spikes.y,
      z: config.spikes.z,
    },
    time: {
      x: config.time.x,
      y: config.time.y,
      z: config.time.z,
    },
    wireframe: config.wireframe,
  };

  // 2. Convert to canonical JSON string
  const jsonString = JSON.stringify(normalized);

  // 3. Calculate SHA-256 hash
  const hash = crypto.createHash('sha256');
  hash.update(jsonString);

  // 4. Return as hexadecimal string
  return hash.digest('hex');
}
```

## On-Chain DNA Registry

### Storage Structure

The DNA registry is stored as a Program Derived Address (PDA) on Solana:

```rust
pub struct DnaRegistry {
    pub authority: Pubkey,      // Collection authority
    pub dna_count: u32,          // Number of registered DNAs
    pub dnas: Vec<[u8; 32]>,     // Array of DNA hashes (max 1000)
}
```

### Capacity

- **Maximum DNAs per registry**: 1,000
- **Registry size**: ~32KB
- **Scalability**: Can create additional sharded registries if needed

### Uniqueness Validation

Before minting, the system checks if a DNA already exists:

1. Client calculates DNA locally
2. Backend queries the DNA registry PDA
3. Compares the new DNA against all registered DNAs
4. Rejects minting if DNA already exists
5. Adds DNA to registry upon successful mint

## DNA Change Detection

### Update Logic

When updating a Kwami, the system determines if DNA has changed:

```typescript
const oldDNA = calculateKwamiDNA(existingBodyConfig);
const newDNA = calculateKwamiDNA(updatedBodyConfig);

if (oldDNA !== newDNA) {
  // DNA changed - requires burn and remint
  return { needsBurnRemint: true };
} else {
  // DNA unchanged - update metadata only
  return { needsBurnRemint: false };
}
```

### Burn-and-Remint Flow

If body configuration changes:

1. **Burn** the old NFT
2. **Remove** old DNA from registry (frees the DNA for reuse)
3. **Calculate** new DNA
4. **Validate** new DNA uniqueness
5. **Mint** new NFT with new DNA
6. **Register** new DNA in registry

### Metadata-Only Update Flow

If only mind/soul configuration changes:

1. Calculate DNA (unchanged)
2. Update metadata URI on Arweave
3. Update NFT metadata on-chain
4. DNA remains in registry

## DNA Verification

### Client-Side Verification

Users can verify DNA before minting:

```typescript
const kwamiNftStore = useKwamiNftStore();

// Calculate DNA
const dna = kwamiNftStore.calculateDna(bodyConfig);

// Check uniqueness
const isUnique = await kwamiNftStore.checkDnaUniqueness(dna);

if (!isUnique) {
  console.error('This Kwami already exists!');
}
```

### On-Chain Verification

The Anchor program enforces DNA uniqueness:

```rust
pub fn mint_kwami(
    ctx: Context<MintKwami>,
    dna: [u8; 32],
    // ... other params
) -> Result<()> {
    let registry = &mut ctx.accounts.dna_registry;
    
    // Check if DNA exists
    require!(
        !registry.dnas.contains(&dna),
        ErrorCode::DnaAlreadyExists
    );
    
    // Add DNA to registry
    registry.dnas.push(dna);
    registry.dna_count += 1;
    
    // ... mint NFT
    
    Ok(())
}
```

## Security Considerations

### Collision Resistance

SHA-256 provides:
- **Hash space**: 2^256 possible values
- **Collision probability**: Negligible (< 10^-60 for millions of Kwamis)
- **Pre-image resistance**: Cannot reverse-engineer body config from DNA

### Attack Vectors

**Q: Can someone copy my Kwami?**
A: No. The DNA system prevents exact duplicates. Even tiny parameter changes create a completely different DNA.

**Q: Can someone predict my DNA?**
A: No. DNA is calculated client-side and checked before minting. The exact configuration is required to generate the same DNA.

**Q: What if two people generate the same config by chance?**
A: The first person to mint gets the DNA. The second attempt will be rejected as a duplicate.

## DNA Display

### UI Representation

DNA is displayed in the minting interface:

```vue
<QuamiKwamiMintDNAPreview :dna="dna" />
```

Features:
- ✅ Real-time DNA calculation
- ✅ Uniqueness status indicator
- ✅ Monospace font for readability
- ✅ Copy to clipboard functionality

### Blockchain Explorer

DNA can be viewed on-chain:
- **Solana Explorer**: View DNA in NFT metadata
- **Metaplex Explorer**: View in collection registry
- **Custom tools**: Query DNA registry directly

## Best Practices

### For Users

1. **Experiment freely** - Change body parameters until you find a unique look
2. **Check uniqueness** - Wait for green checkmark before minting
3. **Save configurations** - Keep a record of your Kwami's body settings
4. **Mind/soul updates** - These don't require reminting

### For Developers

1. **Always validate DNA** - Check uniqueness before minting
2. **Handle collisions gracefully** - Provide clear error messages
3. **Cache DNA calculations** - Avoid recalculating unnecessarily
4. **Test edge cases** - Verify behavior with identical configs

## FAQ

**Q: Why only body configuration?**
A: Body defines the visual identity. Mind and soul are behavioral traits that can evolve without changing the Kwami's appearance.

**Q: Can I change my Kwami's appearance later?**
A: Yes, but it requires burning the old NFT and minting a new one (burn-and-remint). The old DNA becomes available for reuse.

**Q: How many unique Kwamis are possible?**
A: Practically infinite. With 18 numeric parameters and multiple discrete options, the combination space is astronomical.

**Q: What happens if the registry fills up (1000 DNAs)?**
A: Additional registry accounts can be created and sharded. This is handled automatically by the program.

**Q: Can I see all registered DNAs?**
A: Yes, the DNA registry is publicly readable on-chain. However, you cannot reverse-engineer the body config from the DNA.

## Technical Resources

- **Implementation**: `app/utils/kwami/calculateKwamiDNA.ts`
- **Store**: `app/stores/kwami-nft.ts`
- **Backend API**: `server/api/kwami/check-dna.post.ts`
- **Anchor Program**: `solana/anchor/kwami-nft/programs/kwami-nft/src/lib.rs`
- **DNA Registry**: On-chain PDA at program address

## Version History

- **v0.9.0** - Initial DNA system implementation
- **v0.10.0** - Added burn-and-remint flow
- **v0.11.0** - Frontend DNA preview and validation
