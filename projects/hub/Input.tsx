import { forwardRef, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { matchSorter } from "match-sorter";
import { Projects } from "../object";
import { useHub } from "../../context/hubSearch";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
  transparent?: boolean;
  disabled?: boolean;
}

export const BarButton = ({
  children,
  className,
  color,
  ...props
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button
      className={`py-2 text-sm rounded-r-8 bg-primary-700 text-primary-300 font-bold flex items-center justify-center h-8 hover:bg-primary-700 px-4 ${className}`}
      {...props}
    >
      <IoSearch className="h-3 w-3" />
    </button>
  );
};

export const Bar = forwardRef<HTMLInputElement, InputProps>(({ className, error, transparent, disabled, ...props }, ref) => {
  const bg = transparent ? `bg-transparent` : `bg-primary-700`;
  const ring = error ? `ring-1 ring-secondary` : "border-0";
  const cn = `w-full px-4 py-2 text-primary-100 h-8 placeholder-primary-300 rounded-l-8 ${bg} ${ring} ${className} `;

  const [projects, setProjects] = useState([]);
  const { dispatch } = useHub();

  useEffect(() => {
    const projects = new Projects([], true);
    projects.__init__().then(() => {
      setProjects(projects.toFilteredArray());
    });
  }, []);

  const handleChange = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
    let results = matchSorter(projects, value, { keys: ["key", "name", "path", "description", "tags", "badge", "language"] });

    if (results.length === projects.length && value.length === 0) {
      dispatch({ type: "clear" });
    } else if (results.length === 0) {
      dispatch({ type: "setArray", value: [false] });
    } else {
      dispatch({ type: "setArray", value: results });
    }
  };

  return <input ref={ref} className={cn} disabled={disabled} {...props} data-testid="input" onChange={handleChange} />;
});

Bar.displayName = "Input";
