import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Mail, CheckCircle, UserSquare } from 'lucide-react';
import { Label } from '@/components/ui/label';

const SignaturePad = ({ signer, index, updateSignerField, removeSigner }) => {
  const sigPad = useRef(null);

  const clear = () => {
    if (signer.signature) {
      updateSignerField(index, 'signature', '');
    } else if (sigPad.current) {
      sigPad.current.clear();
      updateSignerField(index, 'signature', '');
    }
  };

  const saveSignature = () => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
      updateSignerField(index, 'signature', dataUrl);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-4 grid-cols-2 relative">
      <div className="relative">
        <UserSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          value={signer.text ||''}
          placeholder="Nombre del firmante"
          onChange={(e) => updateSignerField(index, 'text', e.target.value)}
          className="pl-10 focus:border-wine-DEFAULT font-semibold"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="email"
          placeholder="Correo institucional del firmante"
          value={signer.email || ''}
          onChange={(e) => updateSignerField(index, 'email', e.target.value)}
          className="pl-10 focus:border-wine-DEFAULT"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-600">Firma:</Label>
        <div className="relative w-full h-40 bg-white rounded-md border-2 border-dashed border-gray-300 mt-1">
          {signer.signature ? (
            <>
              <img src={signer.signature} alt="Firma guardada" className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none" />
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                <CheckCircle className="h-5 w-5" />
              </div>
            </>
          ) : (
            <SignatureCanvas
              ref={sigPad}
              penColor='black'
              canvasProps={{ className: "w-full h-full rounded-md" }}
              onEnd={saveSignature}
            />
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        {/* Botón eliminar*/}
        <Button
          onClick={() => removeSigner(index)}
          variant="ghost"
          size="icon"
          className="absolute left-4 bg-red-200 text-red-700 hover:bg-red-300 hover:text-red-800 p-1"
          title="Eliminar firmante" 
        >
          ×
        </Button>
        <Button onClick={clear} variant="outline" size="sm" className="hover:border-wine-DEFAULT hover:text-wine-DEFAULT">
          <RefreshCw className="h-4 w-4 mr-2" />
          Limpiar Firma
        </Button>
      </div>
    </div>
  );
};

const SignatureSection = ({ signers, updateSignerField, removeSigner, addSigner }) => {
  if (!signers || signers.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2">
          8. Firmas Digitales de Representantes
        </h3>
        <div className="flex justify-end mt-4">
          <Button 
            onClick={addSigner} 
            variant="outline" 
            className="border-gold-DEFAULT text-gold-DEFAULT hover:bg-gold-DEFAULT"
          >
            Agregar firma de representante
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-gold-DEFAULT pb-2">
        8. Firmas Digitales de Representantes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {signers.map((signer, index) => (
          <SignaturePad 
            key={`${signer.title || ''}-${index}`}
            signer={signer}
            index={index}
            updateSignerField={updateSignerField}
            removeSigner={removeSigner}
          />
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Button 
          onClick={addSigner} 
          variant="outline" 
          className="border-gold-DEFAULT text-gold-DEFAULT hover:bg-gold-DEFAULT"
        >
          Agregar firma de representante
        </Button>
      </div>
    </div>
  );
};

export default SignatureSection;