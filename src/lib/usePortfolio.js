import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const usePortfolioData = (userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from Supabase
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const { data: portfolio, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (portfolio) {
          setData(portfolio.content);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  // Save data to Supabase
  const saveData = async (content) => {
    if (!userId) {
      setError('User not authenticated');
      return false;
    }

    try {
      const { data: existing } = await supabase
        .from('portfolios')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existing) {
        const { error } = await supabase
          .from('portfolios')
          .update({ content, updated_at: new Date() })
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('portfolios')
          .insert([{ user_id: userId, content, created_at: new Date(), updated_at: new Date() }]);

        if (error) throw error;
      }

      setData(content);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return { data, loading, error, saveData };
};

// Authentication functions
export const loginWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (err) {
    return { user: null, error: err.message };
  }
};

export const registerWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (err) {
    return { user: null, error: err.message };
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (err) {
    return { error: err.message };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (err) {
    return { user: null, error: err.message };
  }
};

// Listen to auth changes
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};
