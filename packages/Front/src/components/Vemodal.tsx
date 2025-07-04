import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../services/api";

type VehicleModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

type FormValues = {
    name: string;
    plate: string;
};

export default function VehicleModal({ onClose, onSuccess }: VehicleModalProps) {
    const { register, handleSubmit, formState } = useForm<FormValues>({
        resolver: zodResolver(
            z.object({
                name: z.string().min(2),
                plate: z.string().regex(/^[A-Z]{3}-\d{4}$/, 'Placa no formato ABC-1234'),
            })
        ),
    });

    async function onSubmit(values: FormValues) {
        await api.post('/vehicles', values);
        onSuccess();
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4"
            >
                <h2 className="text-xl font-bold">Novo Veículo</h2>
                <input {...register('name')} placeholder="Nome" className="input" />
                <input {...register('plate')} placeholder="Placa" className="input uppercase" />
                <button className="btn-primary w-full" disabled={formState.isSubmitting}>
                    Salvar
                </button>
                <button type="button" className="btn-secondary w-full" onClick={onClose}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}

import type { Resolver } from "react-hook-form";

function useForm<T extends Record<string, unknown>>({ resolver }: { resolver: Resolver<T> }) {
    return useReactHookForm<T>({ resolver });
}

