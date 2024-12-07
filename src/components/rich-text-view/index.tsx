import { PlaceholderBox } from "../placeholder-box";

interface Props {
  value?: string;
}

const RichTextView = ({ value }: Props) => {
  return (
    <div className="w-full h-max">
      {value ? (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: value ?? "",
          }}
        ></div>
      ) : (
        <PlaceholderBox text="No Content Added" className="min-h-[400px]" />
      )}
    </div>
  );
};

export default RichTextView;
