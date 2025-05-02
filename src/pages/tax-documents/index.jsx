import { useTranslation } from "react-i18next";
import { TaxDocumentsDialog } from "./dialog";
import { TaxDocumentsList } from "./list";

export const TaxDocuments = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col max-h-screen pb-24">
      <div className="px-6 pt-4">
        <h1 className="text-left font-bold text-brand-500 text-2xl">
          Documentos fiscais
        </h1>
        <TaxDocumentsDialog />
      </div>
      <TaxDocumentsList />
    </div>
  );
};
