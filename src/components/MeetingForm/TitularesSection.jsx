import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UserSquare } from 'lucide-react';

const TitularesSection = ({ meetingData, updateTitular }) => {
  const selectedAreas = [
    ...(meetingData.selected_normativa || []),
    ...(meetingData.selected_administrativa || [])
  ];

  if (selectedAreas.length === 0) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2 mb-4">
              3. Titulares de Áreas Seleccionadas
            </h3>
            <div className="text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500">Seleccione un área en la sección 2 para agregar a los titulares.</p>
            </div>
        </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2 mb-4">
        3. Titulares de Áreas Seleccionadas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedAreas.map(area => (
          <div key={area} className="space-y-2">
            <Label htmlFor={`titular-${area}`} className="font-medium text-wine-DEFAULT flex items-center gap-2">
                <UserSquare className="h-4 w-4" />
                Titular de: {area}
            </Label>
            <Input
              id={`titular-${area}`}
              value={(meetingData.titulares && meetingData.titulares[area]) || ''}
              onChange={(e) => updateTitular(area, e.target.value)}
              placeholder={`Nombre del titular de ${area}`}
              className="border-2 focus:border-wine-DEFAULT"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitularesSection;