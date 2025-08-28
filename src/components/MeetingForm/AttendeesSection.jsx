import React from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AttendeesSection = ({ asistentes, addAsistente, removeAsistente, updateAsistente }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2 flex items-center gap-2 w-full">
          <Users className="h-5 w-5 text-wine-DEFAULT" />
          7. Asistentes
        </h3>
      </div>
      
      <div className="space-y-4">
        {asistentes && asistentes.map((asistente, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 relative">
            <Input
              value={asistente.nombre || ''}
              onChange={(e) => updateAsistente(index, 'nombre', e.target.value)}
              placeholder={`Nombre Asistente ${index + 1}`}
              className="border-2 focus:border-wine-DEFAULT"
            />
            <select
              value={asistente.puesto || ''}
              onChange={(e) => updateAsistente(index, 'puesto', e.target.value)}
              className="border-2 focus:border-wine-DEFAULT rounded px-3 py-2"
            >
              <option value="" disabled>Selecciona Puesto</option>
              <option value="Director general">Director general</option>
              <option value="Director de área">Director de área</option>
              <option value="Coordinador">Coordinador</option>
              <option value="Subdirector">Subdirector</option>
              <option value="Jefe de departamento">Jefe de departamento</option>
              <option value="Operativo">Operativo</option>
            </select>
            <Input
              value={asistente.area || ''}
              onChange={(e) => updateAsistente(index, 'area', e.target.value)}
              placeholder="Área"
              className="border-2 focus:border-wine-DEFAULT"
            />
            {asistentes.length > 1 && (
              <Button
                onClick={() => removeAsistente(index)}
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-7 w-7 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
            onClick={addAsistente}
            className="bg-indigo-600 hover:bg-indigo-700 text-white mt-2 p-3 text-bold rounded"
            size="sm"
          >
            
            Agregar Asistente
        </button>
      </div>
    </div>
  );
};

export default AttendeesSection;