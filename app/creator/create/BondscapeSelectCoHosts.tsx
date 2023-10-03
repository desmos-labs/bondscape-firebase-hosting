"use client";
import React, { useCallback, useId, useState } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import useCustomLazyQuery from "@/hooks/graphql/useCustomLazyQuery";
import { GQLProfileResult } from "@/types/desmos";
import Image from "next/image";
import { Organizer } from "@/types/event";
import GetProfile from "@/services/graphql/queries/desmos/GetProfile";

interface Props {
  readonly initialCoHosts?: Organizer[];
  readonly required: boolean;
  readonly onChange: (coHosts: Organizer[]) => void;
}

const BondscapeSelectCoHosts = ({
  initialCoHosts,
  required,
  onChange,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const [getLazyData] = useCustomLazyQuery<GQLProfileResult>(GetProfile, {
    fetchPolicy: "network-only",
  });

  const loadOptions = useCallback(
    async (input: string) => {
      setLoading(true);
      const data = await getLazyData({
        variables: {
          search: `%${input}%`,
        },
      });
      setLoading(false);
      if (!data) return [];
      return data.profiles.map((profile) => {
        return {
          organizer: profile,
          organizerAddress: profile.address,
          label: profile.address,
          value: profile.address,
        };
      });
    },
    [getLazyData],
  );

  return (
    <div className="flex flex-col bg-bondscape-text_neutral_100 gap-[0.75rem] rounded-[16px] px-[1rem]">
      <div className="flex flex-row items-center gap-2">
        <div className="flex gap-1 w-[110px]">
          <label className="text-[16px] text-bondscape-text_neutral_900">
            {"Co-Hosts"}
          </label>
          {required && <span className="text-[#FF8686]">*</span>}
        </div>
        <div className="flex flex-1">
          <AsyncSelect
            value={initialCoHosts?.map((coHost) => {
              return {
                organizer: coHost.organizer,
                organizerAddress: coHost.organizerAddress,
                label: coHost.organizerAddress,
                value: coHost.organizerAddress,
              };
            })}
            instanceId={useId()}
            isMulti={true}
            isSearchable={true}
            loadingMessage={() => "Loading..."}
            isLoading={loading}
            loadOptions={loadOptions}
            defaultOptions={true}
            backspaceRemovesValue={true}
            noOptionsMessage={() => "No profiles found"}
            onChange={(organizers) => {
              if (organizers) {
                onChange(organizers.map((organizer) => organizer));
              } else {
                onChange([]);
              }
            }}
            placeholder={"Add a dtag or a nickname"}
            components={{
              MultiValueContainer: (props) => (
                <div className="flex justify-center my-1 mr-0.5">
                  <components.MultiValueContainer {...props}>
                    {props.children}
                  </components.MultiValueContainer>
                </div>
              ),
              MultiValueLabel: (props) => {
                return (
                  <components.MultiValueLabel {...props}>
                    <div className="flex flex-row relative gap-2 text-[14px] font-[Poppins] mr-1 bg-[#353343] px-[0.5rem] py-[0.25rem] rounded-[1rem]">
                      <div className="relative w-[20px] h-[20px]">
                        <Image
                          src={
                            props.data.organizer?.profilePicture ||
                            "/defaultProfilePicture.png"
                          }
                          alt={"Profile pic"}
                          fill
                          className="object-cover rounded-[10px]"
                        />
                      </div>
                      @{props.data.organizer?.dTag}
                    </div>
                  </components.MultiValueLabel>
                );
              },

              MultiValueRemove: (props) => (
                <components.MultiValueRemove {...props}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 11.75C2 6.36522 6.36522 2 11.75 2C17.1348 2 21.5 6.36522 21.5 11.75C21.5 17.1348 17.1348 21.5 11.75 21.5C6.36522 21.5 2 17.1348 2 11.75ZM11.75 3.5C7.19365 3.5 3.5 7.19365 3.5 11.75C3.5 16.3063 7.19365 20 11.75 20C16.3063 20 20 16.3063 20 11.75C20 7.19365 16.3063 3.5 11.75 3.5Z"
                      fill="#A579FF"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.21967 8.21967C8.51256 7.92678 8.98744 7.92678 9.28033 8.21967L11.75 10.6893L14.2197 8.21967C14.5126 7.92678 14.9874 7.92678 15.2803 8.21967C15.5732 8.51256 15.5732 8.98744 15.2803 9.28033L12.8107 11.75L15.2803 14.2197C15.5732 14.5126 15.5732 14.9874 15.2803 15.2803C14.9874 15.5732 14.5126 15.5732 14.2197 15.2803L11.75 12.8107L9.28033 15.2803C8.98744 15.5732 8.51256 15.5732 8.21967 15.2803C7.92678 14.9874 7.92678 14.5126 8.21967 14.2197L10.6893 11.75L8.21967 9.28033C7.92678 8.98744 7.92678 8.51256 8.21967 8.21967Z"
                      fill="#A579FF"
                    />
                  </svg>
                </components.MultiValueRemove>
              ),
              Option: (props) => (
                <components.Option {...props}>
                  <div className="flex flex-row p-[0.5rem] bg-bondscape-text_neutral_300 my-2 rounded-[16px] gap-2">
                    <div className="relative w-[40px] h-[40px]">
                      <Image
                        src={
                          props.data.organizer?.profilePicture ||
                          "/defaultProfilePicture.png"
                        }
                        alt={"Profile pic"}
                        fill
                        className="object-cover rounded-[20px]"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-[16px] font-semibold text-bondscape-text_neutral_900">
                        {props.data.organizer?.nickname || ""}
                      </div>
                      <div className="text-[14px] text-bondscape-text_neutral_800">
                        @{props.data.organizer?.dTag}
                      </div>
                    </div>
                  </div>
                </components.Option>
              ),
            }}
            styles={{
              input: (baseStyles) => ({
                ...baseStyles,
                color: "white",
                cursor: "text",
              }),
              menuList: (base) => ({
                ...base,
                "::-webkit-scrollbar": {
                  width: "8px",
                },
                "::-webkit-scrollbar-track": {
                  background: "#4B4A58",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "#73708A",
                  borderRadius: "20px",
                },
              }),
            }}
            className="w-full rounded-[8px] bg-bondscape-text_neutral_200 px-[0.75rem] font-[Poppins] leading-[1.3rem]"
            classNames={{
              menu: () => {
                return "rounded-[16px] bg-bondscape-text_neutral_200 mt-2 p-[1rem]";
              },
              control: (props) => {
                return props.hasValue
                  ? "flex flex-1 items-center justify-center text-[14px] text-bondscape-text_neutral_900 py-[0.75rem]"
                  : "flex flex-1 items-center justify-center text-[14px] text-bondscape-text_neutral_600 py-[0.75rem]";
              },
            }}
            unstyled
          />
        </div>
      </div>
    </div>
  );
};

export default BondscapeSelectCoHosts;
