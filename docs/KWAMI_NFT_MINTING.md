# Kwami NFT Minting Guide

## Introduction

Welcome to the Kwami NFT ecosystem! This guide will walk you through creating, minting, and managing your unique Kwami NFT on the Solana blockchain.

## What is a Kwami NFT?

A Kwami NFT is a non-fungible token that represents your unique AI companion. Each Kwami has:

- 🧬 **Unique DNA** - Cryptographic fingerprint based on body configuration
- 🎨 **3D Model** - Interactive GLB file stored on Arweave
- 🖼️ **Thumbnail** - Preview image for wallets and marketplaces
- 🧠 **Mind Configuration** - AI personality and capabilities
- ❤️ **Soul Configuration** - Emotional and behavioral traits
- 📜 **Metadata** - Complete configuration stored permanently

## Prerequisites

### 1. Wallet Setup

You need a Solana wallet to mint and manage Kwami NFTs:

- **Recommended**: [Phantom Wallet](https://phantom.app)
- **Alternatives**: Solflare, Backpack, or any Solana-compatible wallet

#### Installing Phantom

1. Visit [phantom.app](https://phantom.app)
2. Download browser extension (Chrome, Firefox, Brave, Edge)
3. Create new wallet or import existing
4. **Important**: Save your seed phrase securely!

### 2. SOL for Fees

You'll need SOL in your wallet to pay for:

- **Minting fee**: ~0.01 SOL (varies with network)
- **Storage fee**: ~0.002 SOL (Arweave upload)
- **Transaction fees**: ~0.000005 SOL per transaction

#### Getting SOL

**Devnet (Testing)**:
- Use Solana faucet: https://faucet.solana.com
- Or use the Quami faucet button in the wallet

**Mainnet (Production)**:
- Buy SOL on exchanges (Coinbase, Binance, Kraken)
- Transfer to your Phantom wallet

### 3. QWAMI Tokens (Optional)

QWAMI tokens are used to power AI services. You can mint without them, but you'll need them later for:
- AI interactions
- Voice synthesis
- Advanced features

## Minting Your First Kwami

### Step 1: Connect Your Wallet

1. Open the Quami app
2. Click the **Wallet** icon
3. Click **Connect Wallet**
4. Approve connection in Phantom
5. Wait for wallet data to load

### Step 2: Configure Your Kwami

#### Body Configuration

Navigate to the **Kwami** window and select the **Body** tab:

1. **Spikes** - Adjust X, Y, Z intensity for blob shape
2. **Time** - Set temporal modulation for animation
3. **Rotation** - Configure rotation speeds
4. **Colors** - Choose color variations (X, Y, Z axes)
5. **Resolution** - Set mesh detail (higher = smoother)
6. **Skin Type** - Select material (normal, metallic, etc.)
7. **Shininess** - Adjust surface reflectivity
8. **Wireframe** - Toggle wireframe mode
9. **Base Scale** - Set overall size
10. **Opacity** - Adjust transparency

**💡 Tip**: Experiment! Each tiny change creates a completely different DNA.

#### Mind Configuration (Optional)

Switch to the **Mind** tab:

1. **AI Model** - Select base personality model
2. **Voice** - Choose voice characteristics
3. **Language** - Set preferred language(s)
4. **Capabilities** - Enable specific AI features

#### Soul Configuration (Optional)

Switch to the **Soul** tab:

1. **Emotional Range** - Set emotional expressiveness
2. **Personality Traits** - Configure behavioral patterns
3. **Interaction Style** - Define how Kwami responds

### Step 3: Generate DNA

1. Navigate to the **Mint** tab
2. Your DNA is **automatically calculated** as you adjust body settings
3. Wait for DNA uniqueness check (green ✓ = unique, red ✗ = already exists)

#### If DNA Already Exists

Don't worry! Just tweak any body parameter slightly:
- Change a spike value by 0.1
- Adjust rotation speed
- Modify color slightly

The DNA will instantly update and check for uniqueness again.

### Step 4: Add Metadata

1. **Name** (required) - Give your Kwami a name (max 50 characters)
   - Example: "Cosmic Dancer", "Neon Guardian", "Wave Walker"

2. **Description** (optional) - Tell your Kwami's story (max 500 characters)
   - Share its personality
   - Describe its purpose
   - Add creative lore

### Step 5: Mint!

1. Review your configuration
2. Check DNA uniqueness (must be green ✓)
3. Click **Mint Kwami NFT**
4. Review the transaction in Phantom
5. Approve the transaction
6. Wait for confirmation (usually 10-30 seconds)

#### Progress Stages

You'll see these stages during minting:

1. ⏳ **Calculating DNA** - Computing unique fingerprint
2. ⏳ **Checking uniqueness** - Validating against registry
3. ⏳ **Preparing assets** - Rendering 3D model and thumbnail
4. ⏳ **Uploading to Arweave** - Permanent storage upload
5. ⏳ **Creating transaction** - Building Solana transaction
6. ⏳ **Awaiting signature** - Waiting for wallet approval
7. ⏳ **Confirming** - Blockchain confirmation
8. ✅ **Success** - Your Kwami is minted!

### Step 6: View Your Kwami

After successful minting:

1. Open the **Wallet** window
2. Your new Kwami appears in "Kwami NFTs" section
3. View on Solana Explorer (click transaction link)
4. Check Metaplex metadata on Arweave

## Managing Your Kwamis

### Viewing Your Collection

1. Open **Wallet** window
2. See all your Kwami NFTs listed
3. Click a Kwami to view details

### Updating Your Kwami

You can update your Kwami in two ways:

#### Metadata-Only Update (Mind/Soul)

Changes that **don't** affect DNA:
- Mind configuration changes
- Soul configuration changes
- Name updates
- Description updates

**Process**:
1. Navigate to **Kwami** > **Mint**
2. Load your existing Kwami
3. Update mind or soul settings
4. Click **Update Kwami**
5. System detects no DNA change
6. Metadata updated on Arweave
7. NFT updated on-chain

**Cost**: ~0.002 SOL (Arweave + transaction fees)

#### Burn-and-Remint (Body Changes)

Changes that **do** affect DNA:
- Any body configuration parameter
- Spikes, time, rotation, colors, etc.

**Process**:
1. System detects DNA change
2. Prompts: "Body changed - requires burn and remint"
3. Confirm burn-and-remint
4. Old NFT is burned
5. Old DNA is removed from registry (freed for reuse)
6. New DNA is calculated and validated
7. New NFT is minted
8. New DNA is registered

**Cost**: ~0.012 SOL (burn + mint + storage fees)

**⚠️ Warning**: Burn-and-remint creates a new NFT with a new mint address. Third-party listings/trades will reference the old address.

### Transferring Your Kwami

1. Use Phantom wallet's "Send" feature
2. Select your Kwami NFT
3. Enter recipient's Solana address
4. Confirm transaction

### Selling Your Kwami

List on Solana NFT marketplaces:
- [Magic Eden](https://magiceden.io)
- [Tensor](https://tensor.trade)
- [OpenSea (Solana)](https://opensea.io)

## Troubleshooting

### "DNA Already Exists"

**Problem**: Someone minted this exact configuration already.

**Solution**:
1. Change any body parameter slightly
2. DNA will recalculate automatically
3. Check for green ✓ uniqueness indicator
4. Try minting again

### "Insufficient SOL"

**Problem**: Not enough SOL for transaction fees.

**Solution**:
1. Check wallet balance in Wallet window
2. Get more SOL:
   - Devnet: Use faucet
   - Mainnet: Buy and transfer SOL

### "Transaction Failed"

**Problem**: Blockchain transaction didn't complete.

**Common causes**:
- Network congestion
- Insufficient fees
- Wallet disconnected
- Program account issues

**Solution**:
1. Check Phantom for error details
2. Ensure wallet is still connected
3. Refresh the page
4. Try transaction again
5. Contact support if persists

### "Wallet Not Connected"

**Problem**: Phantom disconnected or locked.

**Solution**:
1. Unlock Phantom wallet
2. Click "Connect Wallet" again
3. Approve connection
4. Refresh wallet data

### "Arweave Upload Failed"

**Problem**: Asset upload to Arweave failed.

**Solution**:
1. Check internet connection
2. Wait a moment and retry
3. Ensure assets are properly rendered
4. Contact support if persists

## Best Practices

### Security

- ✅ **Never share** your seed phrase
- ✅ **Verify** transaction details before approving
- ✅ **Use** hardware wallet for valuable NFTs
- ✅ **Enable** Phantom's security features
- ❌ **Don't** approve suspicious transactions

### Creating Unique Kwamis

- 🎨 **Experiment** with extreme parameter values
- 🔀 **Randomize** settings and refine
- 🎯 **Focus** on specific aesthetic goals
- 📊 **Track** configurations you like
- 💾 **Save** successful combinations

### Gas Optimization

- ⏰ **Mint during** off-peak hours (lower fees)
- 📦 **Batch** multiple operations when possible
- 🔍 **Check** network status before minting
- ⚖️ **Balance** features vs. costs

## Advanced Features

### QWAMI Token Integration

Once you have QWAMI tokens:

1. Interact with your Kwami's AI
2. Generate voice responses
3. Access premium features
4. Participate in governance

### Collection Analytics

View your collection stats:
- Total Kwamis owned
- Total QWAMI balance
- Minting history
- DNA patterns

### API Access

Developers can:
- Query DNA registry
- Fetch Kwami metadata
- Build custom tools
- Create marketplace integrations

## Support & Community

### Getting Help

- 📖 **Documentation**: Read this guide and technical docs
- 💬 **Discord**: Join the Quami community
- 🐦 **Twitter**: Follow [@QuamiAI](https://twitter.com/QuamiAI)
- 📧 **Email**: support@quami.ai

### Resources

- **Solana Explorer**: https://explorer.solana.com
- **Metaplex Docs**: https://docs.metaplex.com
- **Arweave Docs**: https://docs.arweave.org
- **Phantom Guide**: https://help.phantom.app

## FAQ

**Q: How much does it cost to mint?**
A: Approximately 0.012 SOL (devnet) or varies on mainnet based on network fees.

**Q: Can I mint multiple Kwamis?**
A: Yes! Mint as many as you want. Each must have unique DNA.

**Q: What if I lose my wallet?**
A: If you lose your seed phrase, you lose access to your NFTs. Always backup securely.

**Q: Can I change my Kwami's name later?**
A: Yes, name changes are metadata updates (no burn-and-remint needed).

**Q: Are Kwamis interoperable with other platforms?**
A: Yes! They're standard Metaplex NFTs compatible with all Solana wallets and marketplaces.

**Q: What happens to my QWAMI when I transfer a Kwami?**
A: QWAMI tokens are separate. Transferring a Kwami doesn't transfer tokens.

**Q: Can I mint on mobile?**
A: Yes! Use Phantom mobile app with the Quami web interface.

**Q: What's stored on-chain vs. Arweave?**
A: On-chain: NFT ownership, DNA, metadata URI. Arweave: Full metadata, 3D model, thumbnail.

**Q: Are there royalties?**
A: Check collection settings. Typically 5-10% royalty on secondary sales.

**Q: Can I bulk mint?**
A: Not currently. Each mint requires unique DNA validation.

## Next Steps

Now that you know how to mint Kwamis:

1. ✅ Create your first Kwami
2. 🎨 Experiment with different configurations
3. 💬 Share your Kwami on social media
4. 🤝 Join the community
5. 🚀 Explore advanced features

Happy minting! 🎉
