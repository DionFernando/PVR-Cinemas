import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Link } from 'expo-router';

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Min 6 characters'),
});
type Form = z.infer<typeof schema>;

export default function RegisterScreen() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = async ({ name, email, password }: Form) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (cred.user && name) {
        await updateProfile(cred.user, { displayName: name });
      }
    } catch (e: any) {
      console.log('REGISTER_ERROR', e?.code, e?.message);
      const msg = mapAuthError(e?.code) || 'Registration failed';
      Alert.alert('Error', msg);
    }
  };

  return (
    <View className="flex-1 bg-black px-6 py-10">
      <Text className="text-brand-400 text-3xl font-bold mb-8">Create account</Text>

      <Text className="text-white">Full name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-zinc-900 text-white rounded-xl px-4 py-3"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text className="text-red-400">{errors.name.message}</Text>}

      <Text className="text-white mt-4">Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-zinc-900 text-white rounded-xl px-4 py-3"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text className="text-red-400">{errors.email.message}</Text>}

      <Text className="text-white mt-4">Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-zinc-900 text-white rounded-xl px-4 py-3"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text className="text-red-400">{errors.password.message}</Text>}

      <Pressable
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        className="mt-6 rounded-full bg-brand-400 py-3 items-center"
      >
        <Text className="text-black font-semibold">{isSubmitting ? 'Creating…' : 'Create account'}</Text>
      </Pressable>

      <Text className="text-zinc-400 mt-6">
        Already have an account? <Link href="/(auth)/login" className="text-brand-400">Sign in</Link>
      </Text>
    </View>
  );
}

function mapAuthError(code?: string) {
  switch (code) {
    case 'auth/email-already-in-use': return 'Email is already in use';
    case 'auth/invalid-email': return 'Invalid email address';
    case 'auth/weak-password': return 'Password is too weak';
    default: return undefined;
  }
}
