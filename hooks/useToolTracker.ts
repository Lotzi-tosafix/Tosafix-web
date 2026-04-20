import { useEffect } from 'react';

export function useToolTracker(toolId: string) {
  useEffect(() => {
    // Only track once per session logic can be done with sessionStorage
    const trackedKey = `tracked_tool_${toolId}`;
    if (!sessionStorage.getItem(trackedKey)) {
      fetch('/api/useTool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId })
      }).then(res => {
         if (res.ok) {
            sessionStorage.setItem(trackedKey, 'true');
         }
      }).catch(err => {
         console.error('Failed to log tool usage:', err);
      });
    }
  }, [toolId]);
}
