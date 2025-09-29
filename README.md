# Rick and Morty CLI Game 🛸

A cryptographically secure command-line implementation of a probabilistic game between Rick and Morty, based on the Monty Hall problem with cryptographic fair play mechanisms.

## Game Overview

This game models a scenario where Rick and Morty engage in a probabilistic guessing game involving multiple boxes and a portal gun. The game uses cryptographic protocols to ensure fairness and implements two different Morty strategies.

### Key Features

- **Cryptographically Secure**: Uses HMAC-SHA3-256 with 256-bit keys for fair random number generation
- **Multiple Strategies**: Supports different Morty implementations (Classic and Lazy)
- **Real-time Statistics**: Tracks and displays game statistics with theoretical vs experimental probabilities
- **Extensible Architecture**: Modular design allows for easy addition of new Morty strategies
- **Interactive CLI**: Full command-line interface with input validation and error handling

## � Installation

### Prerequisites

- Node.js 14+ (specified in package.json engines)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nocillax/rick-and-morty-cli-game.git
   cd rick-and-morty-cli-game
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Make executable (Linux/Mac only):**
   ```bash
   chmod +x bin/randm.js
   ```

## 🎲 How to Play

### Basic Usage

```bash
node bin/randm.js <boxes> <morty-implementation>
```

### Examples

```bash
# Play with ClassicMorty using 5 boxes
node bin/randm.js 5 ./src/morties/ClassicMorty.js

# Play with LazyMorty using 10 boxes
node bin/randm.js 10 ./src/morties/LazyMorty.js

# Show help
node bin/randm.js --help

# Show version
node bin/randm.js --version
```

### Arguments

- `<boxes>`: Number of boxes (integer > 2)
- `<morty-implementation>`: Path to Morty implementation file

### Game Flow

1. **Portal Gun Placement**: Uses first fair random number protocol

   - Morty generates secret value and HMAC commitment
   - Rick provides input value
   - Portal gun location = (Morty's secret + Rick's input) % N

2. **Rick's Guess**: Rick guesses which box contains the portal gun

3. **Morty's Decision**: Morty removes boxes based on strategy

   - **ClassicMorty**: Uses second fair protocol when Rick guesses correctly
   - **LazyMorty**: Makes deterministic choices (highest-indexed empty box)

4. **Final Choice**: Rick chooses to STAY or SWITCH

5. **Results**: Game reveals portal gun location and determines winner

## 📊 Sample Game Output

```
✅ Game engine ready!

Morty: Oh geez, Rick, I'm gonna hide your portal gun in one of the 3 boxes, okay?
Morty: HMAC1=C8E79615E637E6B14DDACA2309069A76D0882A4DD8102D9DEAD3FD6AC4AE289A

Morty: Rick, enter your number [0,3) so you don't whine later that I cheated, alright?
Rick: 2

Morty: Okay, okay, I hid the gun. What's your guess [0,3)?
Rick: 1

Morty: Let's, uh, generate another value now, I mean, to select a box to keep in the game.
Morty: HMAC2=265AF2F829CB22BD213B525E4409476703B03255E648B61454DB3F9CF696395A

Morty: Rick, enter your number [0,2), and, uh, don't say I didn't play fair, okay?
Rick: 0

Morty: I'm keeping the box you chose, I mean 1, and the box 0.

Morty: You can switch your box (enter 0), or, you know, stick with it (enter 1).
Rick: 1

Morty: Aww man, my 1st random value is 1.
Morty: KEY1=BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2
Morty: So the 1st fair number is (2 + 1) % 3 = 0.

Morty: Aww man, my 2nd random value is 0.
Morty: KEY2=0125EC72E1BE61C71C6D3CF2B5F9DC03C713963E7A026273ECCFE77958A44B1D
Morty: Uh, okay, the 2nd fair number is (0 + 0) % 2 = 0.

Morty: You portal gun is in the box 0.
Morty: Aww man, you lost, Rick. Now we gotta go on one of _my_ adventures!

Morty: D-do you wanna play another round (y/n)?
Rick: n

Morty: Okay… uh, bye!

                  GAME STATS

┌──────────────┬───────────────┬─────────────┐
│ Game results │ Rick switched │ Rick stayed │
├──────────────┼───────────────┼─────────────┤
│ Rounds       │ 0             │ 1           │
├──────────────┼───────────────┼─────────────┤
│ Wins         │ 0             │ 0           │
├──────────────┼───────────────┼─────────────┤
│ P (estimate) │ ?             │ 0.000       │
├──────────────┼───────────────┼─────────────┤
│ P (exact)    │ 0.667         │ 0.333       │
└──────────────┴───────────────┴─────────────┘
```

## 🎭 Morty Strategies

- **ClassicMorty**: Uses fair random protocol for all decisions
- **LazyMorty**: Makes deterministic choices (keeps highest-indexed empty box)

Both implement the Monty Hall problem: P(stay) = 1/N, P(switch) = (N-1)/N

## 🔐 Security

Uses HMAC-SHA3-256 with 256-bit keys for cryptographically secure fair play.

## 📊 Statistics

Tracks win/loss ratios and compares experimental vs theoretical probabilities.

## 🛠️ Development

To add new Morty strategies, create a class in `src/morties/` with these methods:

- `getName()`: Strategy name
- `decideBoxToKeep()`: Main logic
- `getTheoreticalWinProbability()`: Probability calculation

**Dependencies:** commander, prompt-sync, cli-table3

## 📝 License

By NoCiLLaX <3

---

_"Wubba lubba dub dub!"_ - Rick Sanchez
