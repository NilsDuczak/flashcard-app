# 📚 Flashcard App

A simple flashcard app with a Supabase backend, React frontend, and an intuitive user interface.

## 🚀 Features

- Create, view, and delete flashcard sets
- Add and remove flashcards within sets
- Modal confirmation window when deleting sets
- Responsive design with Tailwind CSS
- Real-time database using **Supabase**

## 🛠️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/flashcard-app.git
cd flashcard-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ **Configure Supabase**

1. Create an account on [Supabase](https://supabase.com/)
2. Create a new project and copy your API keys
3. Create a `.env` file in the root directory and add:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

### 4️⃣ Start development

```bash
npm run dev
```

## 📂 Project Structure

```
📂 src
 ├── 📁 components
 │   ├── AddFlashcard.jsx
 │   ├── AddSet.jsx
 │   ├── FlashCard.jsx
 │   ├── Header.jsx
 │   ├── Modal.jsx
 │   ├── Sidebar.jsx
 │   ├── supabaseClient.js
 ├── 📄 App.jsx
 ├── 📄 main.jsx
 ├── 📄 index.css
```

## 📝 Database Structure (Supabase)

### 📌 **Table: `sets`**
| Column  | Type   | Description  |
|---------|--------|--------------|
| id      | UUID   | Unique ID of the set |
| name    | TEXT   | Name of the set |

### 📌 **Table: `flashcards`**
| Column  | Type   | Description  |
|---------|--------|--------------|
| id      | UUID   | Unique ID of the card |
| set_id  | UUID   | Reference to the flashcard set |
| question | TEXT  | Question on the card |
| answer  | TEXT   | Answer on the card |



