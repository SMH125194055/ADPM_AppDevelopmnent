import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';
import Auth from '@/components/Auth';
import Account from '@/components/account';
import { useNavigation } from 'expo-router';
import { useSessionContext } from '@/components/sessionContext';

export default function App() {
  const { session, isLoading: sessionLoading } = useSessionContext();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (session?.user) {
      fetchUserDetails(session.user.id);
    } else {
      
      setLoading(false);
    }
  }, [session]);

  const fetchUserDetails = async (userId: string) => {
    const { data, error } = await supabase
      .from('user')
      .select('id,role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user details:', error);
      setLoading(false);
      return;
    }

    setUserRole((prevValue) => {
      console.log('Previous value of setUserRole:', prevValue);

      const newValue = data?.role || null;
      console.log('Updated value setUserRole:', newValue);

      return newValue;});
    // setIsProfileComplete(data?.id || undefined);
    // Update the state with old value logic
    setIsProfileComplete(data?.id || undefined);
    setLoading((prevValue) => {
      console.log('Previous value of loading:', prevValue);

      const newValue = false;
      console.log('Updated value of loading:', newValue);

      return newValue; // Set the new state
    });
  };

  useEffect(() => {
    if (!loading && userRole) {
      if (userRole === 'doctor') {
        navigation.navigate('(doctor)');
      } else {
        navigation.navigate('(patient)');
      }
    }
  }, [loading, userRole]);

  if (sessionLoading || loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!session || !session.user) {
    return <Auth />;
  }
  if (!isProfileComplete) {
    return <Account key={session.user.id} session={session} />;
  }

  return null; // Avoid rendering anything after navigation
}
