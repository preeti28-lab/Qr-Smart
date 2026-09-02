import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { Switch } from "antd";
import { FiTrash2, FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { allergyImages } from "./constant"; // ← same import as MoreInfo

/* ─────────────────────────────────────────────────────────────────────────────
   ALLERGEN PICKER
   Controlled via RHF Controller — value is string[] of allergen names.
   Mirrors the toggle + tooltip card pattern from MoreInfo.renderItem()
───────────────────────────────────────────────────────────────────────────── */
const AllergenPicker = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field }) => {
        const selected = field.value ?? [];

        const toggle = (allergenName) => {
          const updated = selected?.includes(allergenName)
            ? selected.filter((n) => n !== allergenName)
            : [...selected, allergenName];
          field.onChange(updated);
        };

        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-black ">
                Allergens
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {allergyImages.map((item) => {
                const isSelected = selected?.includes(item.name);
                return (
                  <div
                    key={item.name}
                    className="relative group cursor-pointer"
                    onClick={() => toggle(item.name)}
                  >
                    {/* Tooltip — same as MoreInfo */}
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                        pointer-events-none opacity-0 translate-y-1 scale-95
                        group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                        transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                        bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 shadow-md"
                    >
                      {item.name}
                    </div>

                    {/* Card — same selected style as MoreInfo */}
                    <div
                      className={`flex flex-col items-center p-2 rounded-md border transition-all duration-200 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.name}
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    />
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   PRICE ROWS  (multi-price mode)
   Each row has a "size" InputField + a "price" InputField
───────────────────────────────────────────────────────────────────────────── */
const PriceRows = ({ control, errors, sectionIndex, productIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.products.${productIndex}.prices`,
  });

  // Pull the nested errors object for this product's prices array (if any)
  const priceErrors =
    errors?.sections?.[sectionIndex]?.products?.[productIndex]?.prices ?? [];

  return (
    <div className="space-y-2">
      {fields.map((price, pi) => (
        <div key={price.id} className="flex gap-2 items-start">
          <div className="flex-1">
            <InputField
              control={control}
              errors={priceErrors[pi] ?? {}}
              name={`sections.${sectionIndex}.products.${productIndex}.prices.${pi}.size`}
              label="Size / Variant"
              type="text"
            />
          </div>
          <div className="w-32">
            <InputField
              control={control}
              errors={priceErrors[pi] ?? {}}
              name={`sections.${sectionIndex}.products.${productIndex}.prices.${pi}.price`}
              label="Price"
              type="number"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(pi)}
            className="mt-6 p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition flex-shrink-0"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ size: "", price: "" })}
        className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium hover:text-indigo-800 transition"
      >
        <FiPlus size={13} /> Add price variant
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCT CARD
   Fields: ImageField · productName · productTranslatedName · productDescription
           multiPrice Switch → single price InputField  OR  PriceRows
───────────────────────────────────────────────────────────────────────────── */
const ProductCard = ({
  control,
  errors,
  sectionIndex,
  productIndex,
  onRemove,
}) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const productName = useWatch({
    control,
    name: `sections.${sectionIndex}.products.${productIndex}.productName`,
  });

  const multiPrice = useWatch({
    control,
    name: `sections.${sectionIndex}.products.${productIndex}.multiPrice`,
  });

  // Scoped errors for this product
  const productErrors =
    errors?.sections?.[sectionIndex]?.products?.[productIndex] ?? {};

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      {/* ── Card header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Product {productIndex + 1}
          </span>
          {productName && (
            <span className="text-xs text-slate-500 font-medium truncate max-w-[140px]">
              — {productName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            {collapsed ? (
              <FiChevronDown size={15} />
            ) : (
              <FiChevronUp size={15} />
            )}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>

      {/* ── Card body ── */}
      {!collapsed && (
        <div className="p-4 space-y-4">
          {/* Product image — uses your ImageField component */}
          {/* <ImageField
            control={control}
            errors={productErrors}
            name={`sections.${sectionIndex}.products.${productIndex}.image`}
            maxFiles={1}
            label="Product Image"
            defaultValue={[]}
          /> */}

          {/* Product Name + Translated Name */}
          <div className="grid grid-cols-2 gap-3">
            <InputField
              control={control}
              errors={productErrors}
              name={`sections.${sectionIndex}.products.${productIndex}.productName`}
              label="Product Name"
              type="text"
            />
            <InputField
              control={control}
              errors={productErrors}
              name={`sections.${sectionIndex}.products.${productIndex}.productTranslatedName`}
              label="Translated Name"
              type="text"
            />
          </div>

          {/* Description */}
          <InputField
            control={control}
            errors={productErrors}
            name={`sections.${sectionIndex}.products.${productIndex}.productDescription`}
            label="Description"
            type="text"
          />

          {/* ── Pricing section ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              {/* Ant Design Switch — same pattern as your snippet */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-black font-semibold">
                  Multiple prices
                </span>
                <Controller
                  control={control}
                  name={`sections.${sectionIndex}.products.${productIndex}.multiPrice`}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                      checkedChildren="On"
                      unCheckedChildren="Off"
                    />
                  )}
                />
              </div>
            </div>

            {multiPrice ? (
              /* Multi-price: dynamic size+price rows */
              <PriceRows
                control={control}
                errors={errors}
                sectionIndex={sectionIndex}
                productIndex={productIndex}
              />
            ) : (
              /* Single price */
              <InputField
                control={control}
                errors={productErrors}
                name={`sections.${sectionIndex}.products.${productIndex}.singlePrice`}
                label="Price"
                type="number"
              />
            )}
          </div>

          {/* ── Allergens ── */}
          <div className="border-t border-slate-100 pt-4">
            <AllergenPicker
              control={control}
              name={`sections.${sectionIndex}.products.${productIndex}.allergies`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCTS LIST  (nested useFieldArray inside a section)
───────────────────────────────────────────────────────────────────────────── */
const ProductsList = ({ control, errors, sectionIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.products`,
  });

  return (
    <div className="space-y-3">
      {fields.map((product, productIndex) => (
        <ProductCard
          key={product.id}
          control={control}
          errors={errors}
          sectionIndex={sectionIndex}
          productIndex={productIndex}
          onRemove={() => remove(productIndex)}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            image: [],
            productName: "",
            productTranslatedName: "",
            productDescription: "",
            multiPrice: false,
            singlePrice: "",
            prices: [],
            allergies: [],
          })
        }
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-blue-200 text-blue-500 text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition"
      >
        <FiPlus size={16} /> Add Product
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION CARD
   Fields: sectionName InputField · sectionDescription InputField · ProductsList
───────────────────────────────────────────────────────────────────────────── */
const SectionCard = ({ control, errors, sectionIndex, onRemove }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const sectionName = useWatch({
    control,
    name: `sections.${sectionIndex}.sectionName`,
  });

  // Scoped errors for this section's own top-level fields
  const sectionErrors = errors?.sections?.[sectionIndex] ?? {};

  return (
    <div className="border border-slate-200 rounded-lg shadow-sm bg-white overflow-hidden">
      {/* ── Section header ── */}
      <div className="flex items-center justify-between p-3 bg-blue-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-black text-sm">
            {sectionName || `Section ${sectionIndex + 1}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition"
          >
            {collapsed ? (
              <FiChevronDown size={16} />
            ) : (
              <FiChevronUp size={16} />
            )}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* ── Section body ── */}
      {!collapsed && (
        <div className="p-3 space-y-5">
          {/* Section Name + Description */}
          <div className="grid grid-cols-2 gap-3">
            <InputField
              control={control}
              errors={sectionErrors}
              name={`sections.${sectionIndex}.sectionName`}
              label="Section Name"
              type="text"
            />
            <InputField
              control={control}
              errors={sectionErrors}
              name={`sections.${sectionIndex}.sectionDescription`}
              label="Description"
              type="text"
            />
          </div>

          {/* Products */}
          <div className="space-y-2">
            <p className="text-base font-semibold text-black">Products</p>
            <ProductsList
              control={control}
              errors={errors}
              sectionIndex={sectionIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT — MenuInfo
   Exposes onChange(values) for parent form consumption
───────────────────────────────────────────────────────────────────────────── */
const MenuInfo = ({ control, errors, onChange = () => {} }) => {
  // const {
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: { sections: [] },
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const values = useWatch({ control });

  React.useEffect(() => {
    onChange(values);
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=" mx-auto space-y-4 font-sans">
      <div className="border p-4 space-y-3 rounded-lg">
        <InputField
          control={control}
          errors={errors}
          name="nameOfEstablishment"
          label="Name of establishment"
          type="text"
        />
        <InputField
          control={control}
          errors={errors}
          name="description"
          label="Description"
          type="text"
        />

        <InputField
          control={control}
          errors={errors}
          name="menuTitle"
          label="Menu Title"
          type="text"
        />
      </div>

      {/* Empty state */}
      {fields.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
          <FiPlus size={28} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm font-medium">No sections yet</p>
          <p className="text-xs mt-1">Click "Add Section" to get started</p>
        </div>
      )}

      {/* Section cards */}
      {fields.map((section, sectionIndex) => (
        <SectionCard
          key={section.id}
          control={control}
          errors={errors}
          sectionIndex={sectionIndex}
          onRemove={() => remove(sectionIndex)}
        />
      ))}

      {/* Add section */}
      <button
        type="button"
        onClick={() =>
          append({ sectionName: "", sectionDescription: "", products: [] })
        }
        className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100"
      >
        <FiPlus size={16} /> Add Section
      </button>

      <div className="border p-4 space-y-3 rounded-lg">
        <ImageField
          control={control}
          errors={errors}
          name="companyLogo"
          maxFiles={1}
          label="Company Logo"
        />
        <ImageField
          control={control}
          errors={errors}
          name="coverLogo"
          maxFiles={1}
          label="Cover Image"
        />
      </div>
    </div>
  );
};

export default MenuInfo;
