import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import {
  GetOneProfileAPI,
  UpdateOneProfileAPI,
} from "@/api-site/profile";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "../ui";
import { ButtonInput } from "../ui/button-input";
import { ProfileFormModel, arrayColors } from "@/types/profile.type";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";

const { Option } = Select;

type Props = {
  profileId: string;
  user: any;
};

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const UpdateFormProfile: React.FC<Props> = ({ profileId, user }) => {
  const [colors] = useState(arrayColors);
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { data: profile, status } = GetOneProfileAPI({ profileId })

  if (status === "pending") {
    <strong>Loading...</strong>
  }

  useEffect(() => {
    if (profile) {
      const fields = [
        "phone",
        "color",
        "fullName",
        "firstName",
        "lastName",
        "secondAddress",
        "firstAddress",
      ];
      fields?.forEach((field: any) => setValue(field, profile[field]));
    }
  }, [profile, profileId, setValue]);

  const saveMutation = UpdateOneProfileAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ProfileFormModel> = async (
    payload: ProfileFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation.mutateAsync({
        ...payload,
        profileId: profileId,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Information save successfully`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "bottom",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden bg-white border border-gray-200">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold text-gray-900"> Profile </h2>


            <div className="grid grid-cols-1 mt-2 sm:grid-cols-3 gap-y-5 gap-x-6">
              <div className="mt-2">
                <TextInput
                  label="First name"
                  control={control}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  errors={errors}
                />
              </div>

              <div className="mt-2">
                <TextInput
                  label="Last name"
                  control={control}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  errors={errors}
                />
              </div>

              <div className="mt-2">
                <TextInput
                  label="Phone"
                  control={control}
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  errors={errors}
                />
              </div>
            </div>



            <div className="grid grid-cols-1 mt-2 sm:grid-cols-3 gap-y-5 gap-x-6">
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Color
                </label>
                <Controller
                  name={"color"}
                  control={control}
                  render={({ field }) => (
                    <Select
                      showSearch
                      size="large"
                      style={{ width: "100%" }}
                      id={"color"}
                      placeholder={"Color"}
                      status={errors?.color?.message ? "error" : ""}
                      filterOption={(input, option) =>
                        (option?.name ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      {...field}
                    >
                      <>
                        {colors?.length > 0
                          ? colors?.map((item: any, index: number) => (
                            <Option
                              key={index}
                              value={item?.name}
                              name={item?.name}
                            >
                              <Space>
                                <span
                                  className={`text-xs font-semibold text-${item?.name}-600 bg-${item?.name}-50 border border-${item?.name}-600 rounded-md inline-flex items-center px-2.5 py-1`}
                                >
                                  {item?.name}
                                </span>
                              </Space>
                            </Option>
                          ))
                          : null}
                      </>
                    </Select>
                  )}
                />
              </div>
              <div className="mt-2">
                <TextInput
                  label="First address"
                  control={control}
                  type="text"
                  name="firstAddress"
                  placeholder="First address"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TextInput
                  label="Second address"
                  control={control}
                  type="text"
                  name="secondAddress"
                  placeholder="Second address"
                  errors={errors}
                />
              </div>
            </div>

            <div className="sm:flex flex-col sm:items-end sm:justify-between">
              <div className="mt-4">
                <ButtonInput
                  shape="default"
                  type="submit"
                  size="large"
                  loading={loading}
                  color={user?.profile?.color}
                >
                  Save changes
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateFormProfile };
