import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth, signInWithGoogle } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Star, Users, HandHeart } from 'lucide-react';

interface ToolStats {
  usageCount: number;
  averageRating: number;
  ratingCount: number;
}

export function ToolRating({ toolId }: { toolId: string }) {
  const [stats, setStats] = useState<ToolStats>({ usageCount: 0, averageRating: 0, ratingCount: 0 });
  const [user, setUser] = useState(auth.currentUser);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (usr) => setUser(usr));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    const docRef = doc(db, 'nosafix_tools', toolId);
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStats({
          usageCount: data.usageCount || 0,
          averageRating: data.averageRating || 0,
          ratingCount: data.ratingCount || 0
        });
      }
    });
    return () => unsub();
  }, [toolId]);

  const handleRate = async (rating: number) => {
    try {
      setIsSubmitting(true);
      let currentUser = user;
      if (!currentUser) {
        currentUser = await signInWithGoogle();
      }
      
      const idToken = await currentUser.getIdToken();
      
      const res = await fetch('/api/rateTool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, toolId, rating })
      });
      
      if (!res.ok) {
        throw new Error('Failed to submit rating');
      }
    } catch (e) {
      console.error('Rating failed', e);
      // Let the user know via a standard browser alert (or toast)
      // Since alert is discouraged in unprompted places, a soft error state is better.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white/50 dark:bg-black/20 p-4 rounded-2xl border border-white/20 mt-8 backdrop-blur-sm">
      <div className="flex items-center gap-3 border-r md:border-r-0 md:border-l md:pl-6 border-gray-200 dark:border-gray-700/50 pr-6 md:pr-0">
        <Users className="text-secondary w-6 h-6" />
        <div className="flex flex-col">
           <span className="text-2xl font-bold text-text-dark dark:text-text-light">{stats.usageCount.toLocaleString()}</span>
           <span className="text-xs text-text-dark/60 dark:text-text-light/60">שימושים בכלי</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 flex-1">
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    disabled={isSubmitting}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRate(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
                    title={!user ? 'התחבר כדי לדרג' : 'דרג'}
                >
                    <Star 
                        className={`w-7 h-7 \${
                            (hoverRating || Math.round(stats.averageRating)) >= star 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300 dark:text-gray-600'
                        } transition-colors`} 
                    />
                </button>
            ))}
        </div>
        <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-text-dark dark:text-text-light">{stats.averageRating.toFixed(1)}</span>
            <span className="text-sm text-text-dark/60 dark:text-text-light/60">
              ({stats.ratingCount} דירוגים)
            </span>
        </div>
      </div>
      
      {!user && (
         <div className="text-xs text-gray-500 flex flex-col items-center gap-1 bg-white/30 dark:bg-black/30 p-2 rounded-lg">
           <HandHeart className="w-4 h-4 text-primary" />
           <span>לדירוג יש להתחבר עם Google</span>
         </div>
      )}
    </div>
  );
}
