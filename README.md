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

## 🎭 Morty Implementations

### ClassicMorty

- **Behavior**: Uses fair random protocol for all decisions
- **Strategy**: Never removes the box with the portal gun
- **Random Generation**: Always generates fair random values
- **Use Case**: Traditional Monty Hall probability scenario

### LazyMorty

- **Behavior**: Removes boxes with lowest possible indices (keeps highest index)
- **Strategy**: Never removes the box with the portal gun

- **Random Generation**: Ignores random values, uses deterministic logic - **ClassicMorty**: Uses second fair protocol when Rick guesses correctly

- **Use Case**: Predictable box selection patterns - **LazyMorty**: Makes deterministic choices (highest-indexed empty box)

## 🔒 Cryptographic Protocol4. **Final Choice**: Rick chooses to STAY or SWITCH

The game implements a **provably fair protocol** ensuring transparency:5. **Results**: Game reveals portal gun location and determines winner

1. **Key Generation**: 256-bit cryptographically secure random key## 🏗️ Architecture

2. **Value Generation**: Morty's value using `crypto.randomInt()`

3. **HMAC Creation**: HMAC-SHA3-256 of Morty's value

4. **User Input**: Rick provides input for collaborative randomness

5. **Result Calculation**: `(morty_value + rick_value) % N````

6. **Verification**: Original key and value revealed for verificationrick-and-morty-game/

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

## 🎭 Morty Implementations

### ClassicMorty

- **When Rick is wrong**: Always keeps Rick's box and portal gun box
- **When Rick is correct**: Uses second fair random number protocol to choose which empty box to keep
- **Probability**: P(stay) = 1/N, P(switch) = (N-1)/N

### LazyMorty

- **When Rick is wrong**: Always keeps Rick's box and portal gun box
- **When Rick is correct**: Deterministically keeps the empty box with highest index
- **Probability**: Same as ClassicMorty despite different decision process

## 🔐 Cryptographic Protocol

### Fair Random Number Generation

The game uses a cryptographic commitment scheme to ensure fairness:

1. **Commitment Phase**:

- **`LazyMorty`**: Deterministic lowest-index removal

  - Morty generates random value `m`

  - Morty creates HMAC: `HMAC-SHA3-256(key, m)`

- Morty reveals HMAC to Rick

### Dependencies

- **`commander`**: Command-line argument parsing2. **Input Phase**:

- **`prompt-sync`**: Synchronous user input handling

- **`cli-table3`**: ASCII table rendering - Rick provides input value `r`

- **`crypto`**: Cryptographic operations (Node.js built-in)

3. **Revelation Phase**:

### Security Features - Morty reveals secret value `m` and key

- **HMAC-SHA3-256**: Cryptographic message authentication - Game verifies HMAC matches

- **256-bit Keys**: Secure random key generation using `crypto.randomBytes()` - Fair number calculated: `(m + r) % N`

- **Secure Random**: `crypto.randomInt()` for cryptographically secure values

- **Protocol Verification**: Keys revealed after input for transparency### Security Properties

### Error Handling- **Unpredictability**: Neither player can predict the outcome alone

- ✅ Clear, user-friendly error messages- **Verifiability**: All computations can be verified using revealed values

- ✅ No stack traces exposed to users- **Non-repudiation**: HMAC prevents tampering with committed values

- ✅ Comprehensive input validation- **Fairness**: Both players contribute equally to randomness

- ✅ File existence verification

## 📊 Statistics and Analysis

## 🧪 Testing

The game tracks comprehensive statistics:

### Available Morty Implementations

````bash- **Win/Loss counts** by strategy (stay vs switch)

# Test all implementations- **Experimental probabilities** vs theoretical expectations

node test-morties.js- **Round-by-round history** with decision details

```- **Confidence levels** based on sample size



### Error Testing Examples### Example Output

```bash

# Missing arguments```

node bin/randm.js┌──────────┬──────┬────────┬───────┬──────────┬────────────┬──────────────┐

│ Strategy │ Wins │ Losses │ Total │ Win Rate │ Theoretical │ Difference   │

# Invalid box count  ├──────────┼──────┼────────┼───────┼──────────┼────────────┼──────────────┤

node bin/randm.js 2 ./src/morties/ClassicMorty.js│ Stay     │ 12   │ 48     │ 60    │ 20.00%   │ 20.00%     │ +0.00%       │

│ Switch   │ 32   │ 8      │ 40    │ 80.00%   │ 80.00%     │ +0.00%       │

# Non-existent file│ Overall  │ 44   │ 56     │ 100   │ 44.00%   │ Variable   │ N/A          │

node bin/randm.js 3 ./nonexistent.js└──────────┴──────┴────────┴───────┴──────────┴────────────┴──────────────┘

````

## 🏗️ Architecture

### Project Structure

```
rick-and-morty-cli-game/
├── bin/
│   └── randm.js                    # Main executable entry point
├── src/
│   ├── core/
│   │   ├── ArgumentParser.js       # Command-line argument validation
│   │   ├── FairProtocol.js         # Cryptographic HMAC protocol implementation
│   │   ├── GameEngine.js           # Main game loop and logic
│   │   ├── KeyManager.js           # Secure key generation and management
│   │   ├── MortyLoader.js          # Dynamic Morty implementation loading
│   │   ├── ResultsDisplay.js       # Game output and message formatting
│   │   ├── StatisticsCollector.js  # Game statistics and reporting
│   │   └── UserInterface.js        # Input validation and user interaction
│   └── morties/
│       ├── ClassicMorty.js         # Traditional Monty Hall strategy
│       └── LazyMorty.js            # Deterministic strategy
├── package.json                    # Project configuration and dependencies
├── package-lock.json               # Dependency lock file
└── README.md                       # This documentation
```

### Core Components

The codebase follows **Single Responsibility Principle** with well-structured classes:

#### FairProtocol

- Implements HMAC-SHA3-256 cryptographic commitment scheme
- Generates 256-bit cryptographically secure keys
- Creates and verifies HMAC commitments
- Provides fair random number calculation: `(morty + rick) % N`

#### GameEngine

- Manages complete game flow and user interactions
- Handles first and second fair random number protocols
- Integrates with Morty implementations for decision logic
- Collects and displays game statistics

#### MortyLoader

- Dynamically loads Morty strategy implementations
- Enables easy extension with new strategies
- Validates Morty implementations have required methods

## 🧪 Testing

### Running Tests

```bash
# Test all Morty implementations (if test file exists)
npm test
```

### Error Testing Examples

```bash
# Missing arguments
node bin/randm.js

# Invalid box count
node bin/randm.js 2 ./src/morties/ClassicMorty.js

# Non-existent file
node bin/randm.js 3 ./nonexistent.js
```

## 🎯 Probability Mathematics

### Monty Hall Problem Theory

For N boxes with 1 portal gun:

- **Stay Probability**: `1/N` (original choice remains)
- **Switch Probability**: `(N-1)/N` (all other boxes combined)

### Example with 3 Boxes

- **Stay**: 33.3% chance (1/3)
- **Switch**: 66.7% chance (2/3)

The game tracks both experimental results and theoretical probabilities for comparison.

## 🛠️ Development

### Adding New Morty Strategies

1. Create new class in `src/morties/` directory
2. Implement required methods:

   - `getName()`: Return strategy name
   - `decideBoxToKeep(rickChoice, portalGunBox, allBoxes)`: Main decision logic
   - `getTheoreticalWinProbability(N)`: Calculate theoretical probabilities

3. Export as default from new file

Example:

```javascript
export default class CustomMorty {
    getName() {
        return 'CustomMorty';
    }

    decideBoxToKeep(rickChoice, portalGunBox, allBoxes) {
        // Custom logic here
        return {
            boxesToKeep: [...],
            reasoning: '...',
            usedSecondProtocol: false
        };
    }

    getTheoreticalWinProbability(N) {
        return {
            stay: 1/N,
            switch: (N-1)/N
        };
    }
}
```

4. Test with: `node bin/randm.js 3 ./src/morties/CustomMorty.js`

### Dependencies

Key dependencies defined in `package.json`:

- **`commander`**: Command-line argument parsing (^12.1.0)
- **`prompt-sync`**: Synchronous user input handling (^4.2.0)
- **`cli-table3`**: ASCII table rendering (^0.6.3)
- **`crypto`**: Cryptographic operations (Node.js built-in)

### Technical Details

- **ES6 Modules**: Uses `"type": "module"` in package.json
- **Node.js 14+**: Minimum required version specified in engines
- **Security**: HMAC-SHA3-256 with 256-bit keys using `crypto.randomBytes()`
- **Error Handling**: Comprehensive input validation and user-friendly messages

- English code and output

- User-friendly error handling### Configuration

## 🎓 Educational Value

This implementation demonstrates:

### Computer Science Concepts

- **Cryptographic Protocols**: HMAC, commitment schemes, key generation
- **Object-Oriented Design**: Modularity and single responsibility principle
- **Probability Theory**: Monty Hall problem, experimental vs theoretical analysis
- **Software Architecture**: Clean modular design with dependency injection

### Mathematics

- **Conditional Probability**: P(win|stay) vs P(win|switch)
- **Statistical Analysis**: Convergence to theoretical probabilities
- **Cryptographic Hash Functions**: SHA3-256, collision resistance

### Security

- **Fair Play Mechanisms**: Preventing cheating in digital games
- **Commitment Schemes**: Cryptographic binding and hiding
- **Randomness Generation**: Cryptographically secure randomness

## 🐛 Troubleshooting

### Common Issues

1. **Module Not Found**: Ensure you're running from project root directory
2. **Invalid Arguments**: Check minimum boxes (3) and valid file paths
3. **HMAC Verification Failed**: Indicates tampering - restart game
4. **Permission Denied**: Make script executable with `chmod +x bin/randm.js`

### Error Codes

- **Exit 0**: Normal completion
- **Exit 1**: Error (invalid arguments, file not found, etc.)
- **SIGINT**: User interrupted (Ctrl+C)

## 📝 License

This project is part of an educational course on IT internship development.

## 🤝 Contributing

This is an educational project demonstrating:

- Modern JavaScript (ES6+) best practices
- Cryptographic protocol implementation
- Interactive CLI application development
- Object-oriented design patterns
- Statistical analysis and visualization

---

_"Wubba lubba dub dub! Science doesn't care about your feelings, Rick!"_ - Morty Smith

```

```
