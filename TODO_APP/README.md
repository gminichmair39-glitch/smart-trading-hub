# Todo List App

A modern, fully functional to-do list application built with React and Electron. Manage your tasks with ease using local storage for persistence.

## Features

✨ **Core Features:**
- ✅ Create, edit, and delete tasks
- 📝 Add descriptions to tasks
- 📅 Set due dates for tasks
- 🎯 Assign priority levels (High, Medium, Low)
- 🏷️ Organize tasks by categories (General, Work, Personal, Shopping, Health)
- ✓ Mark tasks as completed
- 🔍 Filter tasks (All, Active, Completed)
- 📊 Sort tasks (By date, priority, due date)
- 💾 Auto-save to local storage
- 📱 Fully responsive design
- 🎨 Beautiful gradient UI

## Technology Stack

- **Frontend:** React 18
- **Desktop:** Electron 28
- **Storage:** Browser LocalStorage
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Styling:** CSS3

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository
   ```bash
   git clone https://github.com/gminichmair39-glitch/smart-trading-hub.git
   cd smart-trading-hub/TODO_APP
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development mode
   ```bash
   npm run dev
   ```

   This will open:
   - React development server on `http://localhost:3000`
   - Electron window

## Building

### Development Mode

```bash
npm start
```

### Production Build (Windows)

```bash
npm run build-win
```

This creates an installer and portable executable in the `dist/` folder.

## Usage

### Adding a Task

1. Click "Add New Task" button
2. Fill in the task title (required)
3. Optionally add:
   - Description
   - Due date
   - Priority level
   - Category
4. Click "Add Task"

### Managing Tasks

- **Complete Task:** Click the checkbox to mark as done
- **Edit Task:** Click the edit icon to modify title/description
- **Delete Task:** Click the trash icon to remove
- **Filter:** Use filter buttons to view All, Active, or Completed tasks
- **Sort:** Sort by Most Recent, Priority, or Due Date

### Local Storage

- All tasks are automatically saved to browser's localStorage
- Data persists even after closing the application
- Storage location:
  - **Windows:** `%APPDATA%/Todo List App/`
  - **macOS:** `~/Library/Application Support/Todo List App/`
  - **Linux:** `~/.config/Todo List App/`

## Data Structure

Each task is stored with the following properties:

```javascript
{
  id: "uuid",                    // Unique identifier
  title: "Task title",           // Task name (required)
  description: "Details",        // Additional info (optional)
  dueDate: "2024-12-31",        // Due date (optional)
  priority: "high",             // Priority: low, medium, high
  category: "work",             // Category tag
  completed: false,             // Completion status
  createdAt: "ISO timestamp",   // Creation time
  completedAt: null             // Completion time
}
```

## Features Breakdown

### Dashboard Stats
- **Total:** Count of all tasks
- **Active:** Count of incomplete tasks
- **Completed:** Count of finished tasks

### Filtering
- **All:** Show all tasks
- **Active:** Show incomplete tasks
- **Completed:** Show finished tasks

### Sorting Options
- **Most Recent:** Sort by creation date (newest first)
- **Priority:** Sort by priority level (High → Low)
- **Due Date:** Sort by due date (earliest first)

### Task Metadata
- Priority badge with color coding:
  - 🔴 High (Red)
  - 🟠 Medium (Orange)
  - 🔵 Low (Blue)
- Category emoji for quick identification
- Time tracking (when task was created)
- Overdue indicator for tasks past due date

## Customization

### Adding New Categories

Edit `TaskItem.js` and update the `getCategoryEmoji` function:

```javascript
const getCategoryEmoji = (category) => {
  const emojis = {
    general: '📌',
    work: '💼',
    personal: '👤',
    shopping: '🛒',
    health: '🏥',
    // Add new categories here
    custom: '🎯',
  };
  return emojis[category] || '📌';
};
```

Then update the categories array in `TaskForm.js`:

```javascript
const categories = ['general', 'work', 'personal', 'shopping', 'health', 'custom'];
```

### Changing Color Scheme

Edit `src/index.css` and `App.css` to customize the gradient:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Keyboard Shortcuts

- `Ctrl+Q` (Cmd+Q on Mac): Exit application
- `F12`: Open Developer Tools
- `Ctrl+R`: Reload application

## Screenshots

[Add screenshots here]

## File Structure

```
TODO_APP/
├── public/
│   ├── electron.js
│   ├── preload.js
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskForm.js
│   │   ├── TaskForm.css
│   │   ├── TaskList.js
│   │   ├── TaskList.css
│   │   ├── TaskItem.js
│   │   ├── TaskItem.css
│   │   ├── TaskFilters.js
│   │   └── TaskFilters.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Performance Tips

1. **Limit Tasks:** For optimal performance, keep under 1000 tasks
2. **Regular Cleanup:** Delete completed tasks you no longer need
3. **Storage Limits:** Browser localStorage typically has 5-10MB limit

## Troubleshooting

### Tasks Not Saving
- Clear browser cache and reload
- Check browser's localStorage is enabled
- Try using a different browser

### App Won't Start
- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 16 or higher
- Try reinstalling Electron: `npm install electron --save-dev`

### Storage Issues
- Clear localStorage: Open DevTools → Application → Local Storage → Clear All
- Export tasks before clearing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues or feature requests, please open an issue on GitHub.

## Future Enhancements

- [ ] Task recurring options
- [ ] Custom color tags
- [ ] Export/Import functionality
- [ ] Cloud sync
- [ ] Mobile app version
- [ ] Dark/Light theme toggle
- [ ] Notifications & reminders
- [ ] Task dependencies
- [ ] Time tracking
- [ ] Collaboration features

## Author

Created with ❤️ for productivity
