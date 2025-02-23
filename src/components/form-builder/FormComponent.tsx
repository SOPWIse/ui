import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import React from "react";
import {
  BaseComponent,
  CheckboxField,
  HtmlContent,
  InputField,
  RadioButton,
  TextArea,
} from "./flow-builder.types";

function parseStyleString(styleString: string): React.CSSProperties {
  return styleString.split(";").reduce((style, rule) => {
    if (rule.trim()) {
      const [key, value] = rule.split(":");
      if (key && value) {
        const camelKey = key
          .trim()
          .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        // @ts-ignore
        style[camelKey] = isNaN(Number(value.trim()))
          ? value.trim()
          : Number(value.trim());
      }
    }
    return style;
  }, {} as React.CSSProperties);
}

interface FormComponentProps {
  component: BaseComponent;
}

export function FormComponent({ component }: FormComponentProps) {
  const { register, setValue, watch } = useFormContext();
  const fieldName = component.pk || "";

  switch (component.type) {
    case "input-field":
      return (
        <div className="space-y-3">
          <Label htmlFor={fieldName} className="text-base">
            Input
          </Label>
          <Input
            id={fieldName}
            placeholder={(component as InputField).placeholder}
            className="w-full py-6 text-lg"
            {...register(fieldName)}
          />
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center space-x-3">
          <Checkbox
            id={fieldName}
            className="w-2 h-2"
            checked={watch(fieldName)}
            onCheckedChange={(checked) => setValue(fieldName, checked)}
          />
          <Label htmlFor={fieldName} className="text-base">
            {(component as CheckboxField).label}
          </Label>
        </div>
      );

    case "radio-button":
      return (
        <div className="flex items-center space-x-3">
          <RadioGroup
            defaultValue={
              (component as RadioButton).checked ? fieldName : undefined
            }
            onValueChange={(value) =>
              setValue((component as RadioButton).name, value)
            }
          >
            <RadioGroupItem
              value={fieldName}
              id={fieldName}
              className="w-6 h-6"
            />
          </RadioGroup>
          <Label htmlFor={fieldName} className="text-base">
            {(component as RadioButton).label}
          </Label>
        </div>
      );

    case "text-area":
      return (
        <div className="space-y-3">
          <Label htmlFor={fieldName} className="text-base">
            Text Area
          </Label>
          <Textarea
            id={fieldName}
            placeholder={(component as TextArea).placeholder}
            rows={(component as TextArea).rows}
            className="w-full text-lg min-h-[150px] resize-y"
            {...register(fieldName)}
          />
        </div>
      );

    case "html": {
      const Tag =
        (component as HtmlContent).tag &&
        (component as HtmlContent).tag !== "text"
          ? ((component as HtmlContent).tag as keyof JSX.IntrinsicElements)
          : "span";

      const voidElements = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ];

      const attributes = { ...(component as HtmlContent).attributes };
      const {
        style: styleString,
        class: htmlClass,
        ...restAttributes
      } = attributes;

      let style: React.CSSProperties = styleString
        ? parseStyleString(styleString)
        : {};

      const styleMappings: Record<
        string,
        (value: string) => React.CSSProperties
      > = {
        border: (value) => ({ border: `${value}px solid black` }),
        cellpadding: (value) => ({ padding: `${value}px` }),
        cellspacing: (value) => ({ borderSpacing: `${value}px` }),
        width: (value) => ({ width: value }),
        height: (value) => ({ height: value }),
      };

      Object.entries(restAttributes).forEach(([key, value]) => {
        if (styleMappings[key] && typeof value === "string") {
          style = { ...style, ...styleMappings[key](value) };

          delete restAttributes[key];
        }
      });

      const finalClassName = htmlClass ? `${htmlClass}` : "";
      const props = { ...restAttributes, style, className: finalClassName };

      if (voidElements.includes(Tag)) {
        return <Tag {...props} />;
      }

      if (
        (component as HtmlContent).children &&
        (component as HtmlContent).children?.length
      ) {
        return (
          <Tag {...props}>
            {(component as HtmlContent).children?.map((ele: any) => (
              <FormComponent key={ele.pk} component={ele} />
            ))}
          </Tag>
        );
      }

      if ((component as HtmlContent).content) {
        return (
          <Tag
            {...props}
            dangerouslySetInnerHTML={{
              __html: (component as HtmlContent).content,
            }}
          />
        );
      }

      return <Tag {...props} />;
    }

    default:
      return null;
  }
}
