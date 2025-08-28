import React from 'react';
import { Label } from '@/components/ui/label';
import MultiSelect from './MultiSelect';

const normativeOptions = [
    { value: 'Admisión Educación Básica', label: 'A. Admisión Educación Básica' },
    { value: 'Admisión Educación Media Superior', label: 'B. Admisión Educación Media Superior' },
    { value: 'Promoción Vertical Educación Básica', label: 'C. Promoción Vertical Educación Básica' },
    { value: 'Promoción Vertical Educación Media Superior', label: 'D. Promoción Vertical Educación Media Superior' },
    { value: 'Promoción a Horas Adicionales', label: 'E. Promoción a Horas Adicionales' },
    { value: 'Promoción Horizontal', label: 'F. Promoción Horizontal' },
    { value: 'Reconocimiento Beca Comisión', label: 'G. Reconocimiento Beca Comisión' },
    { value: 'Reconocimiento Práctica Educativa', label: 'H. Reconocimiento Práctica Educativa' },
    { value: 'Reconocimiento AAA', label: 'I. Reconocimiento AAA' },
];

const administrativeOptions = [
    { value: 'Vinculación de Procesos Transversales y Gestión Normativa (CCT)', label: 'A. Vinculación de Procesos Transversales y Gestión Normativa (CCT)' },
    { value: 'Coordinación de Calificación e Instrumentación', label: 'B. Coordinación de Calificación e Instrumentación' },
    { value: 'Administración', label: 'C. Administración' },
    { value: 'Jurídico', label: 'D. Jurídico' }
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