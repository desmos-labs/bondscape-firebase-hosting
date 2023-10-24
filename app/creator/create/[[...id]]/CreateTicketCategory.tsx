import BondscapeButton from "@/components/BondscapeButton";
import BigTextInput from "@/creator/create/BigTextInput";
import BondscapeDateTimePicker from "@/creator/create/BondscapeDateTimePicker/BondscapeDateTimePicker";
import BondscapeSelectValidators from "@/creator/create/BondscapeSelectValidators";
import CoverPicDropZone from "@/creator/create/CoverPicDropZone";
import SmallTextInput from "@/creator/create/SmallTextInput";
import useUser from "@/hooks/user/useUser";
import {
  CreateEventValues,
  TicketCategoryValues,
  Validator,
} from "@/types/event";
import { ErrorMessage, Form, Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

interface CreateTicketCategoryProps {
  readonly selectedCategoryIndex?: number;
  readonly formikProps: FormikProps<CreateEventValues>;
  readonly onHide: () => void;
}

const CreateTicketCategory = ({
  selectedCategoryIndex,
  formikProps: globalFormikProps,
  onHide,
}: CreateTicketCategoryProps) => {
  const { user } = useUser();
  const [initialValues, setInitialValues] = useState<TicketCategoryValues>({
    description: "",
    category: "",
    maxQuantityPerPerson: 1,
    maxQuantityPerCategory: 1,
    availableFrom: undefined,
    availableUntil: undefined,
    coverPicUrl: "",
    coverPic: undefined,
    validators: [],
  });

  const { values: globalValues, setFieldValue: setGlobalFieldValue } =
    globalFormikProps;

  useEffect(() => {
    if (selectedCategoryIndex !== undefined && globalValues.ticketsCategories) {
      setInitialValues({
        ...globalValues.ticketsCategories[selectedCategoryIndex],
      });
    }
  }, [globalValues.ticketsCategories, selectedCategoryIndex]);

  // Form validation
  const validateSchema = Yup.object().shape({
    category: Yup.string().required("The ticket category name is required."),
    maxQuantityPerPerson: Yup.string().required(
      "The max quantity per person is required.",
    ),
    maxQuantityPerCategory: Yup.string().required(
      "The max quantity per category is required.",
    ),
  });

  const onSubmit = async (values: TicketCategoryValues) => {
    if (selectedCategoryIndex === undefined) {
      await setGlobalFieldValue("ticketsCategories", [
        ...(globalValues.ticketsCategories || []),
        values,
      ]);
    } else {
      const newTicketCategories = globalValues.ticketsCategories?.map(
        (ticketCategory, index) => {
          if (index === selectedCategoryIndex) {
            return values;
          }
          return ticketCategory;
        },
      );
      await setGlobalFieldValue("ticketsCategories", newTicketCategories);
    }
    onHide();
  };

  return (
    <div className="max-w-[63.25rem]">
      <div className="relative flex flex-col">
        <div className="flex flex-1 flex-col bg-bondscape-surface rounded-[24px] p-x-6 p-y-10">
          <Formik
            enableReinitialize={true}
            validationSchema={validateSchema}
            validateOnChange={true}
            validateOnMount={false}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              const { values, setFieldValue } = formikProps;
              const requiredValuesSet =
                values.category !== "" &&
                values.maxQuantityPerPerson !== undefined &&
                values.maxQuantityPerCategory !== undefined;

              return (
                <Form className="flex flex-col">
                  <div className="flex flex-1 flex-row gap-6">
                    <div className="flex flex-col w-[31.25rem] gap-[1rem]">
                      <CoverPicDropZone
                        fileToUpload={values.coverPic}
                        coverPicUrl={values.coverPicUrl}
                        setCoverPic={(coverPic) =>
                          setFieldValue("coverPic", coverPic)
                        }
                      />
                      <BigTextInput
                        title={"Description"}
                        inputName={"ticketDescription"}
                        placeholder={
                          "Add an optional description of the advantages granted by your NFT ticket, if any."
                        }
                        required={false}
                        rows={3}
                        onChange={(text) => setFieldValue("description", text)}
                      />
                    </div>
                    <div className="flex flex-col w-[31.25rem] gap-[1rem]">
                      <ErrorMessage name={"category"}>
                        {(msg) => (
                          <div className="text-feedback-error text-[14px] font-normal">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                      <div className="flex flex-col bg-bondscape-text_neutral_100 rounded-[16px] gap-[0.75rem] py-[16px]">
                        <SmallTextInput
                          inputName={"category"}
                          title={"Category"}
                          placeholder={"Category name"}
                          required={true}
                          onChange={(text) => setFieldValue("category", text)}
                        />
                      </div>
                      <ErrorMessage name={"maxQuantityPerPerson"}>
                        {(msg) => (
                          <div className="text-feedback-error text-[14px] font-normal">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                      <ErrorMessage name={"maxQuantityPerCategory"}>
                        {(msg) => (
                          <div className="text-feedback-error text-[14px] font-normal">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                      <div className="flex flex-col bg-bondscape-text_neutral_100 rounded-[16px] gap-[0.75rem] py-[16px]">
                        <SmallTextInput
                          inputName={"maxQuantityPerPerson"}
                          title={"Per Person"}
                          placeholder={"Max quantity per person"}
                          required={true}
                          onChange={(text) =>
                            setFieldValue(
                              "maxQuantityPerPerson",
                              parseInt(text, 10),
                            )
                          }
                          type={"number"}
                          min={1}
                        />
                        <SmallTextInput
                          inputName={"maxQuantityPerCategory"}
                          title={"Per Category"}
                          placeholder={"Max quantity per category"}
                          required={true}
                          onChange={(text) =>
                            setFieldValue(
                              "maxQuantityPerCategory",
                              parseInt(text, 10),
                            )
                          }
                          type={"number"}
                          min={1}
                        />
                      </div>
                      <BondscapeDateTimePicker
                        startLabel={"Available From"}
                        endLabel={"Available Until"}
                        initialStartValue={values.availableFrom}
                        initialEndValue={values.availableUntil}
                        required={false}
                        onChangeStart={(value) =>
                          setFieldValue("availableFrom", value)
                        }
                        onChangeEnd={(value) =>
                          setFieldValue("availableUntil", value)
                        }
                      />
                      <div className="flex flex-col bg-bondscape-text_neutral_100 rounded-[16px] gap-[0.75rem] py-[16px]">
                        <BondscapeSelectValidators
                          label={"Verifiers"}
                          placeholder={
                            "dTags or Nicknames of the users who can validate attendees tickets"
                          }
                          initialValidators={values.validators.filter(
                            (validator: Validator) =>
                              validator.validatorAddress !==
                              user?.profile?.address,
                          )}
                          required={false}
                          onChange={(validators) =>
                            setFieldValue("validators", validators)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 justify-center gap-[40px] mt-20">
                    <BondscapeButton
                      outlined
                      className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
                      textClassName="text-base font-semibold"
                      text={"Cancel"}
                      onClick={onHide}
                    />
                    <BondscapeButton
                      type={"submit"}
                      disabled={!requiredValuesSet}
                      className="w-[256px] h-[44px] rounded-[8px] px-[24px] py-[12px]"
                      textClassName="text-base font-semibold"
                      text={"Save"}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketCategory;
