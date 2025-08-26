
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Users, UserCheck, PlusCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

const MemberList = ({ title, members, icon, type, addTeamMember, removeTeamMember, updateTeamMember }) => {
  return (
    <div className="space-y-3">
      <Label className="font-semibold text-gray-700 flex items-center gap-2">
        {icon}
        {title}
      </Label>
      <div className="space-y-2">
        {members.map((member, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="text"
              value={member}
              onChange={(e) => updateTeamMember(type, index, e.target.value)}
              placeholder={`Nombre de ${title.slice(0, -1)}`}
              className="border-2 focus:border-wine-DEFAULT"
            />
            <Button
              variant="destructive"
              size="icon"
              className="h-9 w-9 flex-shrink-0"
              onClick={() => removeTeamMember(type, index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="w-full border-dashed border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
        onClick={() => addTeamMember(type)}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Agregar {title.slice(0, -1)}
      </Button>
    </div>
  );
};


const TechTeamSection = ({ responsables, apoyo, addTeamMember, removeTeamMember, updateTeamMember }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2">
        9. Responsables de la Transcripción (CT)
      </h3>
      <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        <MemberList 
          title="Responsables del Programa" 
          members={responsables || []} 
          icon={<UserCheck className="h-5 w-5 text-wine-DEFAULT"/>}
          type="responsables_programa"
          addTeamMember={addTeamMember}
          removeTeamMember={removeTeamMember}
          updateTeamMember={updateTeamMember}
        />
        <MemberList 
          title="Personal de Apoyo" 
          members={apoyo || []}
          icon={<Users className="h-5 w-5 text-wine-DEFAULT"/>}
          type="personal_apoyo"
          addTeamMember={addTeamMember}
          removeTeamMember={removeTeamMember}
          updateTeamMember={updateTeamMember}
        />
      </div>
    </div>
  );
};

export default TechTeamSection;
