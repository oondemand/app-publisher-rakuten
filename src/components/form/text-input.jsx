import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const TextInput = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className = "focus-visible:ring-brand-350",
  required = false,
}) => {
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-brand-500">
              {t(label)} {required && "*"}
            </FormLabel>
            <FormControl>
              <Input
                className={className}
                type={type}
                placeholder={t(placeholder)}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
