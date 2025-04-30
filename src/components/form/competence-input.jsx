import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { PatternFormat } from "react-number-format";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const CompetenceInput = ({
  control,
  name,
  label,
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
              <PatternFormat
                value={field.value}
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                getInputRef={field.ref}
                className={className}
                type={type}
                format="##/####"
                mask="_"
                customInput={Input}
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
