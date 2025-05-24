import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";

const packages = [
  {
    title: "OPEN BAR COMPLETO",
    content: "Drinks Clássicos + Autorais",
    description:
      "Ideal para eventos sofisticados que desejam uma experiência de bar completa e personalizada.",
    image: "/lp-1-2.png",
    imagePosition: "left",
  },
  {
    title: "OPEN BAR REDUZIDO",
    content: "Seleção De Drinks Menor",
    description:
      "Uma opção mais enxuta para quem quer um bar de qualidade, mas sem todas as variedades do COMPLETO.",
    image: "/lp-2-2.png",
    imagePosition: "right",
  },
  {
    title: "OPEN BAR PERSONALIZADO",
    content: "Escolha Seus Drinks",
    description:
      "Monte seu próprio bar com os drinks e serviços que fazem sentido para o seu evento.",
    image: "/lp-3-2.png",
    imagePosition: "left",
  },
];

export default function MidContent() {
  return (
    <div className="min-h-screen bg-[#963F0E] py-10 space-y-10 text-[#fff]">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold ">
          Bem-vindo à Elo Drinks!
        </h1>
        <p className="text-lg">
          Na Elo Drinks, transformamos eventos em experiências inesquecíveis com um
          serviço de bar sofisticado e personalizado. Oferecemos: Open Bar, Drinks
          Personalizados, Equipe Especializada, Estrutura Completa e Eventos Especiais.
        </p>
      </div>

      <div className="space-y-16">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col md:flex-row items-center gap-8",
              pkg.imagePosition === "right" && "md:flex-row-reverse"
            )}
          >
            <div className="w-full md:w-6/10">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="object-cover w-full"
              />
            </div>
            <Card className="w-full md:w-4/10 flex items-center bg-transparent border-none shadow-none">
              <CardContent className="text-center space-y-4">
                <div className="flex flex-col items-center">
                  <h2 className="text-4xl font-bold uppercase text-[#101820]">{pkg.title}</h2>
                  <p className="uppercase text-lg font-bold text-muted-foreground text-[#101820]">CONTÉM</p>
                </div>
                <div className="bg-[#101820] rounded-full mx-auto mb-4 p-1">
                  <p className="text-base">{pkg.content}</p>
                </div>
                <p className="text-base text-muted-foreground max-w-sm mx-auto">
                  {pkg.description}
                </p>
                <Button variant="outline" className="text-xl border-1 border-[#101820] text-[#101820] hover:bg-[#101820] hover:border-[#963F0E] hover:text-white w-full rounded-full">
                  Personalizar
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
