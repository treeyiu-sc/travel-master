import { Trash2, Upload } from "lucide-react";
import { ShoppingItem } from "../types";
import Button from "./Button";

interface ShoppingItemFormProps {
  item: ShoppingItem;
  index: number;
  totalItems: number;
  onUpdate: (index: number, field: keyof ShoppingItem, value: string) => void;
  onRemove: (index: number) => void;
}

export default function ShoppingItemForm({
  item,
  index,
  totalItems,
  onUpdate,
  onRemove,
}: ShoppingItemFormProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onUpdate(index, "image", reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border rounded-lg p-3 mb-3 bg-white">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm">Item #{index + 1}</span>
        {totalItems > 1 && (
          <Button
            variant="danger"
            size="sm"
            icon={Trash2}
            onClick={() => onRemove(index)}
          >
            Remove
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          type="text"
          placeholder="產品名稱 *"
          value={item.productName}
          onChange={(e) => onUpdate(index, "productName", e.target.value)}
          className="px-3 py-1 border rounded"
          required
        />
        <input
          type="number"
          placeholder="價錢"
          value={item.price || ""}
          onChange={(e) => onUpdate(index, "price", e.target.value)}
          className="px-3 py-1 border rounded"
        />
      </div>

      <textarea
        placeholder="描述"
        value={item.description || ""}
        onChange={(e) => onUpdate(index, "description", e.target.value)}
        className="w-full px-3 py-1 border rounded mb-2"
        rows={2}
      />

      <div className="flex items-center gap-2">
        {item.image && (
          <img src={item.image} alt="Product" className="w-16 h-16 object-cover rounded border" />
        )}
        <label className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition cursor-pointer inline-flex items-center gap-1 text-sm">
          <Upload size={14} /> 上傳圖片
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
        {item.image && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onUpdate(index, "image", "")}
          >
            移除圖片
          </Button>
        )}
      </div>
    </div>
  );
}
