import { CollectionType } from "@/lib/types";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const multiselect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [openCommandItem, setOpenCommandItem] = useState(false);

  console.log("value in multiselect", value)

  let selectedItem: CollectionType[];

  if (value.length === 0) {

    selectedItem = [];

  } else {

    selectedItem = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];

  }

  const selectableItems = collections.filter((collection) => !selectedItem.includes(collection)); 

  return (
    <div>
      <Command className="overflow-visible">
       <div className="flex gap-1 flex-wrap border rounded-md">

            <div>
                {selectedItem.map((collection) => (
                  <Badge key={collection._id}>
                    {collection.title}
                    <button type="button" className="ml-2 hover:text-red-700" onClick={() => onRemove(collection._id)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
            </div>
            <CommandInput
              placeholder={placeholder}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpenCommandItem(false)}
              onFocus={() => setOpenCommandItem(true)}
            />
        </div>

        <div className="mt-2">
          {openCommandItem && (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup className="w-full z-30 top-0 overflow-auto border rounded-md shadow-md">
                {selectableItems.map((collection) => (
                  <CommandItem
                    key={collection._id}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onChange(collection._id);
                      setInputValue("");
                    }}
                    className="cursor-pointer"
                  >
                    {collection.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </div>
      </Command>
    </div>
  );
};

export default multiselect;
