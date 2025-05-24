import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EventConfigForm() {
  return (
    <div className="w-full px-20 mx-auto text-[#fff] grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block font-semibold mb-2">Número de convidados</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="text-[#fff] bg-[#101820]" >
            {[50, 100, 200, 300, 400].map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block font-semibold mb-2">Balcão</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="text-[#fff] bg-[#101820]">
            {[0, 1, 2, 3, 4].map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block font-semibold mb-2">Funcionários</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="text-[#fff] bg-[#101820]">
            {[5, 10, 15, 20, 25, 30].map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}