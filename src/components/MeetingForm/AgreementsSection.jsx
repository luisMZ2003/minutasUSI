import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const AgreementsSection = ({ acuerdos, addAcuerdo, removeAcuerdo, updateAcuerdo }) => {
  const safeAcuerdos = acuerdos || [];

  const addActividad = (acuerdoIndex) => {
    const acuerdo = safeAcuerdos[acuerdoIndex];
    const nuevasActividades = [
      ...(acuerdo.actividades || []),
      {
        id: Date.now(),
        actividad: '',
        responsables: [''],
        entregable: '',
        fechaInicio: '',
        fechaFin: ''
      }
    ];
    updateAcuerdo(acuerdoIndex, 'actividades', nuevasActividades);
  };

  const updateActividad = (acuerdoIndex, actividadIndex, campo, valor) => {
    const acuerdo = safeAcuerdos[acuerdoIndex];
    const nuevasActividades = acuerdo.actividades.map((act, i) =>
      i === actividadIndex ? { ...act, [campo]: valor } : act
    );
    updateAcuerdo(acuerdoIndex, 'actividades', nuevasActividades);
  };

  const removeActividad = (acuerdoIndex, actividadIndex) => {
    const acuerdo = safeAcuerdos[acuerdoIndex];
    const nuevasActividades = acuerdo.actividades.filter((_, i) => i !== actividadIndex);
    updateAcuerdo(acuerdoIndex, 'actividades', nuevasActividades);
  };

  const addResponsable = (acuerdoIndex, actividadIndex) => {
    const acuerdo = safeAcuerdos[acuerdoIndex];
    const nuevasActividades = acuerdo.actividades.map((act, i) =>
      i === actividadIndex
        ? { ...act, responsables: [...act.responsables, ''] }
        : act
    );
    updateAcuerdo(acuerdoIndex, 'actividades', nuevasActividades);
  };

  const updateResponsable = (acuerdoIndex, actividadIndex, respIndex, valor) => {
    const acuerdo = safeAcuerdos[acuerdoIndex];
    const nuevasActividades = acuerdo.actividades.map((act, i) =>
      i === actividadIndex
        ? {
            ...act,
            responsables: act.responsables.map((r, j) => (j === respIndex ? valor : r))
          }
        : act
    );
    updateAcuerdo(acuerdoIndex, 'actividades', nuevasActividades);
  };

  const removeResponsable = (acuerdoIndex, actividadIndex, respIndex) => {
    const acuerdo = safeAcuerdos[acuerdoIndex];
    const nuevasActividades = acuerdo.actividades.map((act, i) =>
      i === actividadIndex
        ? {
            ...act,
            responsables: act.responsables.filter((_, j) => j !== respIndex)
          }
        : act
    );
    updateAcuerdo(acuerdoIndex, 'actividades', nuevasActividades);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2 w-full">
          6. Acuerdos
        </h3>
      </div>

      {safeAcuerdos.map((acuerdo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 space-y-4"
        >
          {/* Descripción */}
          <div className="space-y-2">
            <Label>Descripción del Acuerdo</Label>
            <Textarea
              value={acuerdo.descripcion || ''}
              onChange={(e) => updateAcuerdo(index, 'descripcion', e.target.value)}
              placeholder="Descripción del acuerdo..."
              className="border-2 focus:border-wine-DEFAULT"
            />
          </div>

          {/* Responsable + Fecha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Responsable</Label>
              <Input
                value={acuerdo.responsable || ''}
                onChange={(e) => updateAcuerdo(index, 'responsable', e.target.value)}
                placeholder="Nombre del responsable"
                className="border-2 focus:border-wine-DEFAULT"
              />
            </div>
            <div className="space-y-2">
              <Label>Fecha de Entrega</Label>
              <Input
                type="date"
                value={acuerdo.fecha || ''}
                onChange={(e) => updateAcuerdo(index, 'fecha', e.target.value)}
                className="border-2 focus:border-wine-DEFAULT"
              />
            </div>
          </div>

          {/* Requerimientos */}
          <div className="space-y-2">
            <Label>Requerimientos de Entrega</Label>
            <Textarea
              value={acuerdo.requerimientos || ''}
              onChange={(e) => updateAcuerdo(index, 'requerimientos', e.target.value)}
              placeholder="Requerimientos de entrega..."
              className="border-2 focus:border-wine-DEFAULT"
            />
          </div>

          {/* Actividades */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Cronograma de Actividades</Label>
              <Button
                onClick={() => addActividad(index)}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Agregar Actividad
              </Button>
            </div>

            {(acuerdo.actividades || []).map((actividad, aIndex) => (
              <div key={aIndex} className="p-3 border rounded-lg bg-white space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Actividad #{aIndex + 1}
                  </span>
                  {(acuerdo.actividades.length > 1) && (
                    <Button
                      onClick={() => removeActividad(index, aIndex)}
                      variant="destructive"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                <Input
                  placeholder="Actividad..."
                  value={actividad.actividad}
                  onChange={(e) => updateActividad(index, aIndex, 'actividad', e.target.value)}
                />

                {/* Responsables */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label>Responsables</Label>
                    <Button
                      onClick={() => addResponsable(index, aIndex)}
                      size="sm"
                      className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  {actividad.responsables.map((resp, rIndex) => (
                    <div key={rIndex} className="flex gap-2">
                      <Input
                        placeholder="Responsable..."
                        value={resp}
                        onChange={(e) =>
                          updateResponsable(index, aIndex, rIndex, e.target.value)
                        }
                      />
                      {actividad.responsables.length > 1 && (
                        <Button
                          onClick={() => removeResponsable(index, aIndex, rIndex)}
                          variant="destructive"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Label className="p-3">Entregable</Label>
                <Input
                  placeholder="Entregable..."
                  value={actividad.entregable}
                  onChange={(e) => updateActividad(index, aIndex, 'entregable', e.target.value)}
                />

                <div className="space-y-2">
                  <Label>Fecha de Inicio</Label>
                  <Input
                    type="date"
                    value={actividad.fechaInicio}
                    onChange={(e) => updateActividad(index, aIndex, 'fechaInicio', e.target.value)}
                  />
                   <Label>Fecha de Fin</Label>
                  <Input
                    type="date"
                    value={actividad.fechaFin}
                    onChange={(e) => updateActividad(index, aIndex, 'fechaFin', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Botón eliminar acuerdo */}
          {safeAcuerdos.length > 1 && (
            <div className="flex justify-end">
              <Button
                onClick={() => removeAcuerdo(index)}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar Acuerdo
              </Button>
            </div>
          )}
        </motion.div>
      ))}
      {/* Botón Agregar Acuerdo fijo al final */}
      <Button
        onClick={addAcuerdo}
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 w-full mt-4"
        size="sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Agregar Acuerdo
      </Button>
    </div>
  );
};

export default AgreementsSection;
