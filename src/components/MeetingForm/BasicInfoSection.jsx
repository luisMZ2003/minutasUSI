import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BasicInfoSection = ({ meetingData, updateField }) => {
  return (
    <div>
        <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2 mb-4">
          1. Lugar, Fecha y Hora
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <Label htmlFor="lugar" className="flex items-center gap-2 text-wine-DEFAULT">
                    <MapPin className="h-4 w-4" />
                    Lugar
                </Label>
                <Input
                    id="lugar"
                    value={meetingData.lugar}
                    onChange={(e) => updateField('lugar', e.target.value)}
                    placeholder="Ingrese el lugar de la reunión"
                    className="border-2 focus:border-wine-DEFAULT"
                />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="fecha" className="flex items-center gap-2 text-wine-DEFAULT">
                    <Calendar className="h-4 w-4" />
                    Fecha
                </Label>
                <Input
                    id="fecha"
                    type="date"
                    value={meetingData.fecha}
                    onChange={(e) => updateField('fecha', e.target.value)}
                    className="border-2 focus:border-wine-DEFAULT"
                />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="hora" className="flex items-center gap-2 text-wine-DEFAULT">
                    <Clock className="h-4 w-4" />
                    Hora
                </Label>
                <Input
                    id="hora"
                    type="time"
                    value={meetingData.hora}
                    onChange={(e) => updateField('hora', e.target.value)}
                    className="border-2 focus:border-wine-DEFAULT"
                />
            </div>
        </div>
    </div>
  );
};

export default BasicInfoSection;