import React from 'react';
import { Label } from '@/components/ui/label';
import MultiSelect from './MultiSelect';

const normativeOptions = [
    { value: 'Admisión', label: 'A. Admisión' },
    { value: 'Promoción', label: 'B. Promoción' },
    { value: 'Reconocimiento', label: 'C. Reconocimiento' },
    { value: 'Cambio de Centro de Trabajo', label: 'D. Cambio de Centro de Trabajo' }
];

const administrativeOptions = [
    { value: 'Jurídico', label: 'A. Jurídico' },
    { value: 'Recursos Humanos', label: 'B. Recursos Humanos' },
    { value: 'Administración', label: 'C. Administración' }
];

const AreaSelectionSection = ({ meetingData, updateSelectedAreas }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2 mb-4">
              2. Selección de Áreas de Trabajo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="font-medium text-wine-DEFAULT">Área Normativa</Label>
                    <MultiSelect
                        options={normativeOptions}
                        selected={meetingData.selected_normativa}
                        onChange={(value) => updateSelectedAreas('selected_normativa', value)}
                        placeholder="Seleccionar un área..."
                        multi={false}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="font-medium text-wine-DEFAULT">Área Administrativa</Label>
                    <MultiSelect
                        options={administrativeOptions}
                        selected={meetingData.selected_administrativa}
                        onChange={(value) => updateSelectedAreas('selected_administrativa', value)}
                        placeholder="Seleccionar un área..."
                        multi={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default AreaSelectionSection;