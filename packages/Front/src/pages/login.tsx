import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type LoginData = z.infer<typeof schema>;

export default function Login() {
  const { register, handleSubmit, formState } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  async function onSubmit(data: LoginData) {
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data) {
        alert((err as { response: { data: { error: string } } }).response.data.error);
      } else {
        alert('Erro de autenticação');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          {...register('email')}
          type="email"
          placeholder="E-mail"
          className="input"
        />
        {formState.errors.email && (
          <span className="text-red-500">{formState.errors.email.message}</span>
        )}

        <input
          {...register('password')}
          type="password"
          placeholder="Senha"
          className="input"
        />
        {formState.errors.password && (
          <span className="text-red-500">{formState.errors.password.message}</span>
        )}

        <button
          type="submit"
          className="btn-primary w-full disabled:opacity-50"
          disabled={formState.isSubmitting}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
