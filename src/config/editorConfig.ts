import React from 'react';

export type SaveFunction = (data: any) => Promise<void>;
export type ExportFunction = (format: string, quality?: number) => Promise<Blob | string>;
export type ImportFunction = () => Promise<any>;

export interface PluginConfig {
  name: string;
  component: React.ComponentType<any>;
  position: 'sidebar' | 'toolbar' | 'timeline' | 'modal';
}

export interface EditorCustomization {
  // Backend integration
  saveProject?: SaveFunction;
  loadProject?: (projectId: string) => Promise<any>;
  listProjects?: () => Promise<any[]>;
  
  // Export options
  exportVideo?: ExportFunction;
  exportImage?: ExportFunction;
  
  // Import options
  importMedia?: ImportFunction;
  
  // UI Customization
  theme?: 'light' | 'dark' | 'system';
  logo?: string | React.ReactNode;
  showExportButton?: boolean;
  showSaveButton?: boolean;
  
  // Additional features
  plugins?: PluginConfig[];
  
  // Rendering options
  renderingEngine?: 'client' | 'server';
  serverRenderingEndpoint?: string;
  
  // Event handlers
  onSave?: (data: any) => void;
  onExport?: (result: Blob | string) => void;
  onError?: (error: Error) => void;
}

// Default configuration with placeholder implementations
const defaultConfig: EditorCustomization = {
  saveProject: async (data) => {
    console.log('Default save implementation. Override this in your app.', data);
    // Store in localStorage as fallback
    localStorage.setItem('editor-project', JSON.stringify(data));
    return Promise.resolve();
  },
  
  loadProject: async (projectId) => {
    console.log('Default load implementation. Override this in your app.', projectId);
    const data = localStorage.getItem('editor-project');
    return data ? JSON.parse(data) : null;
  },
  
  exportVideo: async (format, quality = 1) => {
    console.log(`Default export implementation for ${format} at quality ${quality}`);
    throw new Error('Export functionality must be implemented by the host application');
  },
  
  theme: 'system',
  showExportButton: true,
  showSaveButton: true,
  renderingEngine: 'client',
  plugins: [],
};

// Configuration state
let editorConfig: EditorCustomization = { ...defaultConfig };

// Method to override default configuration
export function configureEditor(customConfig: Partial<EditorCustomization>): void {
  editorConfig = {
    ...defaultConfig,
    ...customConfig,
  };
}

// Hook to access editor configuration
export function useEditorConfig(): EditorCustomization {
  return editorConfig;
}

export { defaultConfig };
