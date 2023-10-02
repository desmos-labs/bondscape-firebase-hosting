import React, { useEffect } from "react";
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

interface Props {
  readonly defaultValue?: string;
  readonly title: string;
  readonly required: boolean;
  readonly onChange: (placeId: string) => void;
}

const LocationInput = ({ defaultValue, title, required, onChange }: Props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "getPlaces",
    debounce: 300,
  });

  useEffect(() => {
    if (defaultValue) {
      getDetails({
        placeId: defaultValue,
      }).then((result) => {
        if (typeof result !== "string") {
          if (result?.formatted_address != null) {
            setValue(result?.formatted_address, false);
          }
        }
      });
    }
  }, [defaultValue]);

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = (suggestion: any) => () => {
    // When the user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(suggestion.description, false);
    onChange(suggestion.place_id);
    clearSuggestions();
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="hover:text-bondscape-primary hover:cursor-pointer"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <div
      className="flex flex-1 flex-col bg-bondscape-text_neutral_100 px-[1rem] rounded-[16px]"
      ref={ref}
    >
      <div className="flex flex-1 flex-row items-center gap-2">
        <div className="flex w-[110px]">
          <label className="text-[16px] text-bondscape-text_neutral_900">
            {title}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1 flex-col">
          <input
            className={`flex flex-1 bg-bondscape-text_neutral_200 rounded-[8px] p-[0.75rem] text-[14px] text-bondscape-text_neutral_900 placeholder:text-bondscape-text_neutral_600 placeholder:text-[14px] placeholder:font-normal focus:outline-none`}
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Add location"
          />
        </div>
      </div>
      {status === "OK" && (
        <ul className="bg-bondscape-text_neutral_200 p-[1rem] mt-2 rounded-[8px]">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
