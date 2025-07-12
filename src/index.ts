// Import global styles
import './styles/global.css';

import Editor from './features/editor/editor';
import useStore from './features/editor/store/use-store';
import useDataState from './features/editor/store/use-data-state';
import { getCompactFontData, loadFonts } from './features/editor/utils/fonts';
import { FONTS } from './features/editor/data/fonts';
import { ThemeProvider } from './components/theme-provider';

// Export main components
export { Editor };

// Export hooks and utilities
export { useStore, useDataState, getCompactFontData, loadFonts };

// Export data
export { FONTS };

// Export theme provider for styling consistency
export { ThemeProvider };

// Export default Editor component for easier importing
export default Editor;

// Main entry point for the React Video Editor library

// Export components
export { default as EditorProvider, useEditor } from './components/EditorProvider';

// Export types and configuration
export { 
  configureEditor, 
  useEditorConfig,
  type EditorCustomization,
  type SaveFunction,
  type ExportFunction,
  type ImportFunction,
  type PluginConfig
} from './config/editorConfig';

// Export utility functions
export { exportToMP4, exportToImage } from './utils/exportUtils';
export { importMedia } from './utils/importUtils';

// Note: The VideoEditor component would be imported and exported here when created
// export { default as VideoEditor } from './components/VideoEditor';
