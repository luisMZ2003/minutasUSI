import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSession = useCallback(async (session) => {
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        handleSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUp = useCallback(async (email, password, options) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message || "Something went wrong",
      });
      return { error };
    }

    // Si el usuario se creó correctamente, crea el registro en la tabla usuarios
    // Esto permite que cada usuario tenga múltiples minutas y pueda administrarlas (crear, actualizar, eliminar) en el futuro.
    // La lógica para listar, actualizar y eliminar minutas por usuario se desarrollará más adelante.
    const userId = data?.user?.id;
    if (userId) {
      const { error: dbError } = await supabase
        .from('usuarios')
        .insert([{ id: userId, email }]);
      if (dbError) {
        toast({
          variant: "destructive",
          title: "Error creando usuario en la base de datos",
          description: dbError.message,
        });
      }
    }

    return { error };
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Something went wrong",
      });
      return { error };
    }

    // Verificar si el usuario existe en la tabla usuarios, si no, crearlo
    const userId = data?.user?.id;
    if (userId) {
      const { data: userDb, error: dbError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('id', userId)
        .single();
      if (!userDb && !dbError) {
        // Si no existe, lo creamos
        const { error: insertError } = await supabase
          .from('usuarios')
          .insert([{ id: userId, email }]);
        if (!insertError) {
          toast({
            title: "Usuario creado automáticamente",
            description: "Tu perfil fue registrado correctamente en la base de datos.",
          });
        }
      }
    }

    return { error };
  }, [toast]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
    }

    return { error };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }), [user, session, loading, signUp, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
