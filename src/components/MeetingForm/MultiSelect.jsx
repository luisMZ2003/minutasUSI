import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const MultiSelect = ({ options, selected, onChange, placeholder, className, multi = false }) => {
  const [open, setOpen] = useState(false);
  
  // Ensure 'selected' is always an array, even if null or undefined
  const safeSelected = Array.isArray(selected) ? selected : (selected ? [selected] : []);

  const getLabel = (value) => {
    const option = options.find(option => option.value === value);
    return option ? option.label : value;
  };

  const handleSelect = (optionValue) => {
    let newSelected;
    if (multi) {
      newSelected = safeSelected.includes(optionValue)
        ? safeSelected.filter((item) => item !== optionValue)
        : [...safeSelected, optionValue];
    } else {
      newSelected = [optionValue]; // Always return an array for consistency
      setOpen(false);
    }
    onChange(newSelected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between h-auto min-h-[40px]", className)}
        >
          <div className="flex gap-1 flex-wrap">
            {safeSelected.length > 0 ? (
              safeSelected.map((value) => (
                <Badge
                  key={value}
                  variant="secondary"
                  className="rounded-sm px-1 font-normal bg-wine-DEFAULT/10 text-wine-DEFAULT"
                >
                  {getLabel(value)}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Buscar área..." />
          <CommandEmpty>No se encontró el área.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    safeSelected.includes(option.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;