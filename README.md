# Smart Trading Hub

A fully offline desktop application for traders to manage their trading activities, calculate lot sizes, track compound growth, maintain a trading journal, and access learning materials.

## Features

- 📊 **Dashboard**: Overview of your trading statistics
- 📝 **Trading Journal**: Record and track your trading notes
- 🧮 **Lot Size Calculator**: Calculate optimal lot sizes based on risk management
- 📈 **Compound Calculator**: Calculate compound growth over time
- 📋 **Track Record**: Maintain a complete history of your trades
- 🎓 **Academy**: Access learning materials organized by difficulty level
- 🔒 **Offline First**: Works completely offline with local SQLite database

## Technology Stack

- **Frontend**: React 18
- **Desktop**: Electron 28
- **Database**: SQLite (better-sqlite3)
- **Styling**: CSS3
- **Icons**: Lucide React
- **Build**: Electron Builder

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository
   ```bash
   git clone https://github.com/gminichmair39-glitch/smart-trading-hub.git
   cd smart-trading-hub
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development mode
   ```bash
   npm run dev
   ```

   This will open two terminals:
   - React development server on `http://localhost:3000`
   - Electron window

## Building

### Development Build

```bash
npm start
```

### Production Build (Windows)

```bash
npm run build-win
```

This will create an installer and portable executable in the `dist/` folder.

## Database

The application uses SQLite for local data storage. The database file (`trading-hub.db`) is stored in the user's application data directory:

- **Windows**: `%APPDATA%/Smart Trading Hub/`
- **macOS**: `~/Library/Application Support/Smart Trading Hub/`
- **Linux**: `~/.config/Smart Trading Hub/`

### Database Schema

#### Trades Table
- `id`: Unique identifier
- `symbol`: Trading symbol (e.g., EURUSD)
- `entry_price`: Entry price of the trade
- `exit_price`: Exit price (nullable for open trades)
- `lot_size`: Size of the trade
- `entry_date`: Date of entry
- `exit_date`: Date of exit (nullable)
- `profit_loss`: Calculated profit or loss
- `win_loss`: Status (win/loss)
- `notes`: Trade notes

#### Journal Entries Table
- `id`: Unique identifier
- `date`: Entry date
- `title`: Entry title
- `content`: Entry content
- `tags`: Comma-separated tags
- `created_at`: Creation timestamp

#### Learning Materials Table
- `id`: Unique identifier
- `title`: Material title
- `category`: Category (beginner/intermediate/advanced)
- `content`: Material content
- `difficulty_level`: Difficulty level

#### Calculator History Table
- `id`: Unique identifier
- `calculator_type`: Type of calculator (lot-size/compound)
- `inputs`: JSON of calculator inputs
- `result`: JSON of calculation result
- `created_at`: Creation timestamp

## Usage

### Lot Size Calculator

1. Navigate to "Lot Size Calculator"
2. Enter your account balance, risk percentage, entry price, and stop loss
3. Click "Calculate Lot Size" to see the recommended lot size

### Compound Calculator

1. Navigate to "Compound Calculator"
2. Enter initial capital, monthly return percentage, and number of months
3. View the final amount and ROI

### Trading Journal

1. Click "New Entry" to create a journal entry
2. Add title, content, and tags
3. Your entries are saved and organized by date

### Track Record

1. Click "New Trade" to record a trade
2. Enter trade details (symbol, entry/exit price, lot size, dates)
3. View statistics including win rate and total profit/loss

### Academy

1. Browse learning materials by difficulty level
2. Add your own materials using "Add Learning Material"
3. Filter by category to find relevant content

## Screenshots

[Add screenshots here]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub.

## Roadmap

- [ ] Advanced charting capabilities
- [ ] Risk analysis tools
- [ ] Trade statistics and analytics
- [ ] Import/Export functionality
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Real-time news integration
- [ ] Cloud sync (optional)

## Author

Created with ❤️ for traders
