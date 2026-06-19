# Dots and Boxes 🎮

A classic and addictive two-player game where players take turns drawing lines between dots. Complete the fourth side of a box to claim it and earn a point!

## 🎯 Game Objective

- Players take turns drawing lines between dots
- Complete the fourth side of a box to claim it and score a point
- The player with the most boxes at the end wins!
- The game ends when all boxes are claimed

## 🎮 How to Play

1. **Two Players**: Player 1 (Blue) vs Player 2 (Red)
2. **Click a Line**: Click on any available line between dots to claim it
3. **Complete a Box**: When you draw the line that completes a box (all 4 sides), you get:
   - 1 point
   - An extra turn
4. **Continue**: If you don't complete a box, the turn passes to the other player
5. **Win**: The player with more points when all boxes are claimed wins!

## ⚙️ Game Features

- 🎨 Beautiful gradient design with color-coded players
- 📊 Real-time score tracking
- 🔄 Turn indicator showing whose turn it is
- ✨ Visual feedback when lines are selected
- 🎯 Clear box completion animation
- 📱 Responsive design for different screen sizes
- 🔁 Easy "New Game" button to restart anytime

## 🚀 How to Deploy

### Using GitHub Pages:

1. Go to your repository settings
2. Navigate to **Pages** section
3. Select **Deploy from a branch**
4. Choose **main** branch
5. Click Save
6. Your game will be live at: `https://shriyabh5-pixel.github.io/Shriya-game/`

## 📂 File Structure

```
Shriya-game/
├── index.html      # HTML structure
├── style.css       # Styling and animations
├── script.js       # Game logic and mechanics
└── README.md       # Documentation
```

## 🎮 Game Controls

| Action | Description |
|--------|-------------|
| **Click Line** | Draw a line between two dots |
| **New Game** | Start a fresh game |
| **Play Again** | Start after game ends |

## 🛠️ Customization

You can easily customize the game by modifying in `script.js`:

```javascript
const GRID_SIZE = 4; // Change to 3, 5, 6, etc. for different board sizes
const CELL_SIZE = 40; // Change cell size for bigger/smaller board
```

In `style.css`:

- **Player 1 Color**: Change `#667eea` (blue) to your preferred color
- **Player 2 Color**: Change `#ff6b6b` (red) to your preferred color
- **Background Gradient**: Modify the gradient colors in `body`

## 📝 Game Strategy Tips

1. **Try to leave your opponent without options** - Force them into a position where they complete boxes for you
2. **Complete multiple boxes in a chain** - Taking one box gives you an extra turn!
3. **Sacrifice boxes early** - Sometimes it's worth losing early boxes to set up a winning chain later
4. **Control the center** - Having boxes in strategic positions gives you control over the game

## 📈 Future Enhancements

- [ ] AI opponent (Easy/Medium/Hard)
- [ ] Different grid sizes (3x3, 5x5, 6x6)
- [ ] Sound effects
- [ ] Multiplayer online
- [ ] Game statistics and leaderboard
- [ ] Mobile touch controls optimization
- [ ] Undo last move feature

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy playing Dots and Boxes! 🎮✨**
