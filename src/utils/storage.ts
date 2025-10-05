// Utilities for persistent storage
export const storage = {
  // Settings
  getSettings: () => {
    const stored = localStorage.getItem('settings');
    return stored ? JSON.parse(stored) : null;
  },
  
  saveSettings: (settings: any) => {
    localStorage.setItem('settings', JSON.stringify(settings));
  },

  // Alerts
  getAlerts: () => {
    const stored = localStorage.getItem('alerts');
    return stored ? JSON.parse(stored) : [];
  },
  
  saveAlerts: (alerts: any[]) => {
    localStorage.setItem('alerts', JSON.stringify(alerts));
  },

  // Dashboard state
  getDashboardState: () => {
    const stored = localStorage.getItem('dashboardState');
    return stored ? JSON.parse(stored) : null;
  },
  
  saveDashboardState: (state: any) => {
    localStorage.setItem('dashboardState', JSON.stringify(state));
  },

  // Clear all data
  clearAll: () => {
    localStorage.removeItem('settings');
    localStorage.removeItem('alerts');
    localStorage.removeItem('dashboardState');
  }
};
