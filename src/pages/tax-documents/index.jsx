import { useTranslation } from "react-i18next";
import { TaxDocumentsDialog } from "./dialog";

export const TaxDocuments = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col max-h-screen pb-24">
      <div className="px-6 py-4">
        <h1 className="text-left font-bold text-brand-500 text-2xl">
          Documentos fiscais
        </h1>

        <TaxDocumentsDialog />
        <div className="mt-4 text-sm text-gray-500">Listagem</div>
      </div>
    </div>
  );
};
