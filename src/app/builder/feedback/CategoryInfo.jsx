import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

const SubcategorySection = ({ control, catIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `categories.${catIndex}.subcategories`,
  });

  return (
    <div className="bg-gray-50 border rounded-lg p-3 space-y-3">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Subcategories
      </p>

      <Controller
        control={control}
        name={`categories.${catIndex}.description`}
        render={({ field }) => (
          <input
            {...field}
            placeholder="Description"
            className="outline-none rounded-full placeholder:text-slate-700 placeholder:text-[14px] placeholder:font-medium py-1 px-4 border-2 border-solid border-slate-300 w-full"
          />
        )}
      />

      {fields.map((sub, subIndex) => (
        <div key={sub.id} className="flex items-center gap-2">
          <Controller
            control={control}
            name={`categories.${catIndex}.subcategories.${subIndex}.name`}
            render={({ field }) => (
              <input
                {...field}
                placeholder={`Subcategory name ${subIndex + 1}`}
                className="outline-none rounded-full placeholder:text-slate-700 placeholder:text-[14px] placeholder:font-medium py-1 px-4 border-2 border-solid border-slate-300 w-full"
              />
            )}
          />
          <button
            type="button"
            onClick={() => remove(subIndex)}
            className="text-blue-500 hover:text-blue-600 border border-blue-500 p-1 rounded-full"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "" })}
        className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
      >
        + Add subcategory
      </button>
    </div>
  );
};

const CategoryInfo = ({ control , errors,  onChange = () => {} }) => {
  // const { control } = useForm({
  //   defaultValues: { categories: [] },
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  // ✅ useWatch is subscription-based — it only emits when values
  //    actually change, unlike watch() which gives a new object every render
  const values = useWatch({ control });

  // ✅ onChange excluded from deps intentionally — it's a parent-provided
  //    callback with no stable ref guarantee. Wrap in useCallback at the
  //    call site if you need it in deps.
  React.useEffect(() => {
    onChange(values);
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-4">
      {fields.map((category, catIndex) => (
        <div key={category.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm text-gray-500">
              Category {catIndex + 1}
            </h3>
            <button
              type="button"
              onClick={() => remove(catIndex)}
              className="text-blue-500 hover:text-blue-600 border border-blue-500 p-1 rounded-full"
            >
              <FiTrash2 size={15} />
            </button>
          </div>

          <div className="bg-gray-50 border rounded-lg p-3 space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Name
            </p>
            <Controller
              control={control}
              name={`categories.${catIndex}.categoryName`}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Category name"
                  className="outline-none rounded-full placeholder:text-slate-700 placeholder:text-[14px] placeholder:font-medium py-1 px-4 border-2 border-solid border-slate-300 w-full"
                />
              )}
            />
          </div>

          <SubcategorySection control={control} catIndex={catIndex} />
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ categoryName: "", description: "", subcategories: [] })
        }
        className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
      >
        + Add Category
      </button>
    </div>
  );
};

export default CategoryInfo;
