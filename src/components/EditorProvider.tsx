import React, { createContext, useContext, ReactNode } from 'react';
import { EditorCustomization, defaultConfig } from '../config/editorConfig';

interface EditorProviderProps {
  children: ReactNode;
  config?: Partial<EditorCustomization>;
}

// Create a context for editor configuration
const EditorContext = createContext<EditorCustomization>(defaultConfig);

// Custom hook to use the editor configuration
export const useEditor = () => useContext(EditorContext);

// EditorProvider component to wrap the application with configuration
export const EditorProvider: React.FC<EditorProviderProps> = ({ 
  children, 
  config = {} 
}) => {
  // Merge default config with provided custom config
  const editorConfig = React.useMemo(() => ({
    ...defaultConfig,
    ...config,
  }), [config]);

  return (
    <EditorContext.Provider value={editorConfig}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
