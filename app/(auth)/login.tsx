import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Link } from 'expo-router';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Min 6 characters'),
});

type Form = z.infer<typeof schema>;

export default function LoginScreen() {
  const { register, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async ({ email, password }: Form) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      const msg = mapAuthError(e?.code) || 'Login failed';
      Alert.alert('Error', msg);
    }
  };

  return (
    <View className="flex-1 bg-black px-6 py-10">
      <Text className="text-brand-400 text-3xl font-bold mb-8">PVR Cinemas</Text>

      <View className="gap-3">
        <Text className="text-white">Email</Text>
        <TextInput
          className="bg-zinc-900 text-white rounded-xl px-4 py-3"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(t) => setValue('email', t, { shouldValidate: true })}
          {...register('email')}
        />
        {errors.email && <Text className="text-red-400">{errors.email.message}</Text>}

        <Text className="text-white mt-4">Password</Text>
        <TextInput
          className="bg-zinc-900 text-white rounded-xl px-4 py-3"
          secureTextEntry
          onChangeText={(t) => setValue('password', t, { shouldValidate: true })}
          {...register('password')}
        />
        {errors.password && <Text className="text-red-400">{errors.password.message}</Text>}

        <Pressable
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          className="mt-6 rounded-full bg-brand-400 py-3 items-center"
        >
          <Text className="text-black font-semibold">{isSubmitting ? 'Signing in…' : 'Sign in'}</Text>
        </Pressable>

        <Text className="text-zinc-400 mt-6">
          No account? <Link href="/(auth)/register" className="text-brand-400">Create one</Link>
        </Text>
      </View>
    </View>
  );
}

function mapAuthError(code?: string) {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-disabled':
      return 'This user is disabled';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email or password is incorrect';
    case 'auth/too-many-requests':
      return 'Too many attempts, try again later';
    default:
      return undefined;
  }
}
