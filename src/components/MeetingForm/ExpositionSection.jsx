import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ExpositionSection = ({ meetingData, updateField }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="exposicionAreas" className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2">
          4. Exposición de las Áreas
        </Label>
        <Textarea
          id="exposicionAreas"
          value={meetingData.exposicion_areas || ''}
          onChange={(e) => updateField('exposicion_areas', e.target.value)}
          placeholder="Resumen de las reuniones y exposiciones de las áreas seleccionadas..."
          className="border-2 focus:border-wine-DEFAULT min-h-[120px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="exposicionCT" className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2">
          5. Exposición de la CT
        </Label>
        <Textarea
          id="exposicionCT"
          value={meetingData.exposicion_ct || ''}
          onChange={(e) => updateField('exposicion_ct', e.target.value)}
          placeholder="Exposición de la Coordinación de Tecnologías..."
          className="border-2 focus:border-wine-DEFAULT min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default ExpositionSection;