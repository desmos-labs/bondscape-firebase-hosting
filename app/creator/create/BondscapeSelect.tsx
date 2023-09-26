"use client";
import React, { useState } from "react";
import "react-datetime/css/react-datetime.css";
import AsyncSelect from "react-select/async";
import useCustomLazyQuery from "@/hooks/graphql/useCustomLazyQuery";
import GetCategories from "@/services/graphql/queries/bondscape/GetCategories";
import { EventCategory, GQLEventCategoriesResult } from "@/types/event";

interface Props {
  readonly required: boolean;
  readonly onChange: () => void;
}

const colourOptions = [
  { id: 1, value: "red", label: "Red" },
  { id: 2, value: "blue", label: "Blue" },
];

const BondscapeSelect = ({ required, onChange }: Props) => {
  const [category, setCategory] = useState<{
    id: number;
    value: string;
    label: string;
  }>();

  const [getLazyData] = useCustomLazyQuery<GQLEventCategoriesResult>(
    GetCategories,
    {
      fetchPolicy: "network-only",
    },
  );

  const loadCategories = async (inputValue: string) => {
    const data = await getLazyData();
    return data?.event_categories.map((category: EventCategory) => ({
      id: category.category.id,
      value: category.category.name,
      label: category.category.name,
    }));
  };

  return (
    <div className="flex flex-col bg-bondscape-text_neutral_100 gap-[0.75rem] rounded-[16px] p-[1rem]">
      <div className="flex flex-row items-center gap-2">
        <div className="flex gap-1">
          <label className="text-[16px] text-bondscape-text_neutral_900">
            {"Category"}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1">
          <AsyncSelect
            cacheOptions
            loadOptions={loadCategories}
            placeholder={"Select a category"}
            styles={{
              input: (baseStyles) => ({
                ...baseStyles,
                color: "transparent",
              }),
            }}
            className="w-full rounded-[16px] bg-bondscape-text_neutral_200 p-[0.75rem] font-[Poppins]"
            classNames={{
              menu: () => {
                return "rounded-[16px] bg-bondscape-text_neutral_200 p-[1rem]";
              },
              option: (props) => {
                return props.isSelected
                  ? "text-[16px] bg-bondscape-text_neutral_300 text-bondscape-text_neutral_900 p-[1rem] rounded-[16px]"
                  : "text-[16px] text-bondscape-text_neutral_900 p-[1rem]";
              },
              control: (props) => {
                return props.hasValue
                  ? "text-bondscape-text_neutral_900"
                  : "text-bondscape-text_neutral_600";
              },
            }}
            unstyled
          />
        </div>
      </div>
    </div>
  );
};

export default BondscapeSelect;
