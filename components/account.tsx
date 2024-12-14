import { supabase } from '@/lib/supabase'
import { Picker } from '@react-native-picker/picker'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState(Number)
  const [cnic, setCnic] = useState(Number)
  const [role, setRole] = useState('patient') // Default role
  const [email, setEmail] = useState('')
  const [updatedAt, setUpdatedAt] = useState(new Date())
  const [patientId, setPatientId] = useState(Number)

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('user')
        .select(`userName,firstName,lastName,cnic,phoneNumber,update_at,email,role,id`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.userName)
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setCnic(data.cnic)
        setPhone(data.phoneNumber)
        setEmail(data.email)
        setUpdatedAt(data.update_at)
        setRole(data.role || 'patient')
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    firstName,
    lastName,
    phone,
    cnic,
    role,
  }: {
    username: string
    firstName: string
    lastName: string
    phone: number
    cnic: number
    role: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session.user.id,
        email: session.user.email,
        userName: username,
        firstName,
        lastName,
        phoneNumber: phone,
        cnic,
        role,
        update_at: new Date(),
      }

      const { data, error } = await supabase.from('user').upsert(updates)

      if (error) {
        throw error
      }

      Alert.alert('Profile updated successfully!')
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="First Name" value={firstName || ''} onChangeText={(text) => setFirstName(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Last Name" value={lastName || ''} onChangeText={(text) => setLastName(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="CNIC" value={String(cnic) || ''} keyboardType="numeric" onChangeText={(text) => setCnic(Number(text))} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Phone Number" value={String(phone) || ''} keyboardType="numeric" onChangeText={(text) => setPhone(Number(text))} />
      </View>
      <View style={styles.verticallySpaced}>
        <Picker selectedValue={role} onValueChange={(value) => setRole(value)}>
          <Picker.Item label="Patient" value="patient" />
          <Picker.Item label="Doctor" value="doctor" />
        </Picker>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, firstName, lastName, cnic, phone, role })}
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
