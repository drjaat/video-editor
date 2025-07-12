<p align="center">
  <a href="https://github.com/designcombo/react-video-editor">
    <img width="150px" height="150px" src="https://cdn.designcombo.dev/logo-white.png"/>
  </a>
</p>
<h1 align="center">React Video Editor</h1>

<div align="center">
  
Video Editor application using React and TypeScript.

<p align="center">
    <a href="https://combo.sh/">Combo</a>
    ·  
    <a href="https://discord.gg/jrZs3wZyM5">Discord</a>
    ·  
    <a href="https://github.com/designcombo/react-video-editor">X</a>
</p>
</div>

[![](https://cdn.designcombo.dev/editor-preview.png)](https://github.com/designcombo/react-video-editor)

## ✨ Features

- 🎬 Timeline Editing: Arrange and trim media on a visual timeline.
- 🌟 Effects and Transitions: Apply visual effects, filters, and transitions.
- 🔀 Multi-track Support: Edit multiple video and audio tracks simultaneously.
- 📤 Export Options: Save videos in various resolutions and formats.
- 👀 Real-time Preview: See immediate previews of edits.

## ⌨️ Development

Clone locally:

```bash
git clone git@github.com:designcombo/react-video-editor.git
cd react-video-editor
pnpm install
pnpm dev
```

Open your browser and visit http://localhost:5173 , see more at [Development](https://github.com/designcombo/react-video-editor/react-video-editor).

# React Video Editor

A powerful video editing component for React applications.

## Installation

```bash
npm install react-video-editor
# or
yarn add react-video-editor
```

## Usage

```jsx
import { Editor, ThemeProvider } from 'react-video-editor';
import 'react-video-editor/dist/style.css'; // Import styles

function App() {
  const handleSave = (data) => {
    console.log('Video project data:', data);
    // Save to your backend or localStorage
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Editor 
        initialProjectName="My Awesome Video"
        onSave={handleSave}
        width={1080}
        height={1920}
      />
    </ThemeProvider>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialProjectName` | string | "Untitled video" | Initial name of the project |
| `user` | object | null | User information object |
| `fonts` | array | FONTS | Custom fonts to use in the editor |
| `width` | number | 1080 | Canvas width |
| `height` | number | 1920 | Canvas height |
| `className` | string | "" | Additional CSS classes |
| `onSave` | function | undefined | Callback when project is saved |

## Customizing Fonts

You can provide custom fonts to use in the editor:

```jsx
import { Editor, FONTS } from 'react-video-editor';

const customFonts = [...FONTS, {
  name: 'My Custom Font',
  url: 'https://example.com/my-font.woff2',
  category: 'sans-serif'
}];

function App() {
  return <Editor fonts={customFonts} />;
}
```

## License

MIT