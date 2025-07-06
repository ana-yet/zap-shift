import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import { RiRadioButtonFill } from "react-icons/ri";
import { FaBox, FaWarehouse } from "react-icons/fa";
import {
  MdOutlineMail,
  MdLocationOn,
  MdNotes,
  MdErrorOutline,
} from "react-icons/md";
import useAuth from "../../hook/useAuth";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useSecureAxios from "../../hook/useSecureAxios";

// --- Reusable Helper Components ---
const FormSection = ({ title, children }) => (
  <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-800 mb-6">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

const InputField = ({
  name,
  label,
  register,
  errors,
  placeholder,
  Icon,
  type = "text",
  disabled = false,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className="mb-2 font-medium text-gray-700 flex items-center"
    >
      {Icon && <Icon className="mr-2 text-gray-500 h-5 w-5" />}
      {label}
    </label>
    <input
      id={name}
      type={type}
      {...register}
      className={`px-4 py-3 rounded-lg border bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 ${
        errors[name] ? "border-red-500 focus:ring-red-400" : "border-gray-300"
      }`}
      placeholder={placeholder}
      disabled={disabled}
      step="any"
    />
    {errors[name] && (
      <span className="text-red-600 mt-1 text-sm flex items-center">
        <MdErrorOutline className="mr-1 h-4 w-4" />
        {errors[name].message}
      </span>
    )}
  </div>
);

const SelectField = ({
  name,
  label,
  control,
  errors,
  options,
  placeholder,
  Icon,
  disabled = false,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className="mb-2 font-medium text-gray-700 flex items-center"
    >
      {Icon && <Icon className="mr-2 text-gray-500 h-5 w-5" />}
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({ field }) => (
        <select
          {...field}
          id={name}
          disabled={disabled}
          className={`px-4 py-3 rounded-lg border bg-gray-50 appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 ${
            disabled
              ? "bg-gray-100 cursor-not-allowed text-gray-400"
              : "focus:ring-teal-400"
          } ${
            errors[name]
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300"
          } `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    />
    {errors[name] && (
      <span className="text-red-600 mt-1 text-sm flex items-center">
        <MdErrorOutline className="mr-1 h-4 w-4" />
        {errors[name].message}
      </span>
    )}
  </div>
);

const TextareaField = ({
  name,
  label,
  register,
  errors,
  placeholder,
  Icon,
}) => (
  <div className="flex flex-col md:col-span-2">
    <label
      htmlFor={name}
      className="mb-2 font-medium text-gray-700 flex items-center"
    >
      {Icon && <Icon className="mr-2 text-gray-500 h-5 w-5" />}
      {label}
    </label>
    <textarea
      id={name}
      {...register}
      rows="3"
      className={`px-4 py-3 rounded-lg border bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none ${
        errors[name] ? "border-red-500 focus:ring-red-400" : "border-gray-300"
      }`}
      placeholder={placeholder}
    ></textarea>
    {errors[name] && (
      <span className="text-red-600 mt-1 text-sm flex items-center">
        <MdErrorOutline className="mr-1 h-4 w-4" />
        {errors[name].message}
      </span>
    )}
  </div>
);

const SendParcel = () => {
  const { user } = useAuth();
  const districtData = useLoaderData();
  const secureAxios = useSecureAxios();

  // console.log(user.email);
  // console.log(districtData);

  // const districtNames = districtData.map((d) => d.district);
  const regionNames = [...new Set(districtData.map((d) => d.region))];

  const validationSchema = {
    senderEmail: {
      required: "Sender's email is required",
      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
    },
    senderAddress: {
      required: "Sender's address is required",
      minLength: {
        value: 10,
        message: "Address must be at least 10 characters",
      },
    },
    receiverEmail: {
      required: "Receiver's email is required",
      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
    },
    receiverAddress: {
      required: "Receiver's address is required",
      minLength: {
        value: 10,
        message: "Address must be at least 10 characters",
      },
    },
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "Document",
      senderEmail: user.email,
      receiverEmail: "",
      senderWarehouse: "",
      senderRegion: "",
      senderAddress: "",
      senderInstruction: "",
      receiverWarehouse: "",
      receiverRegion: "",
      receiverAddress: "",
      receiverInstruction: "",
      weight: "",
    },
    mode: "onChange",
  });

  const [senderDistricts, setSenderDistricts] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);

  const parcelType = watch("parcelType");
  const selectedSenderRegion = watch("senderRegion");
  const selectedReceiverRegion = watch("receiverRegion");

  // set the districts for the sender
  useEffect(() => {
    if (selectedSenderRegion) {
      const filtered = districtData
        .filter((d) => d.region === selectedSenderRegion)
        .map((d) => d.district);
      setSenderDistricts(filtered);
    } else {
      setSenderDistricts([]);
    }
    setValue("senderDistrict", "");
  }, [selectedSenderRegion, districtData, setValue]);

  // set the districts for the receiver
  useEffect(() => {
    if (selectedReceiverRegion) {
      const filtered = districtData
        .filter((d) => d.region === selectedReceiverRegion)
        .map((d) => d.district);
      setReceiverDistricts(filtered);
    } else {
      setReceiverDistricts([]);
    }
    setValue("receiverDistrict", "");
  }, [selectedReceiverRegion, districtData, setValue]);

  const weightValidation =
    parcelType === "Non-Document"
      ? {
          required: "Weight is required",
          valueAsNumber: true,
          min: { value: 0.1, message: "Weight must be a positive number" },
          pattern: { value: /^[0-9]*\.?[0-9]+$/, message: "Invalid weight" },
        }
      : {};

  const calculateCost = (data) => {
    const isWithinCity = data.senderRegion === data.receiverRegion;
    let cost = 0;
    if (data.parcelType === "Document") {
      cost = isWithinCity ? 60 : 80;
    } else {
      const weight = parseFloat(data.weight) || 0;
      if (weight <= 3) {
        cost = isWithinCity ? 110 : 150;
      } else {
        const baseCost = isWithinCity ? 110 : 150;
        cost = baseCost + Math.ceil(weight - 3) * 40 + 40;
      }
    }
    return cost;
  };

  const onSubmit = async (data) => {
    const cost = calculateCost(data);
    const isWithinCity = data.senderRegion === data.receiverRegion;
    const weight = parseFloat(data.weight) || 0;

    let breakdown = "";

    if (data.parcelType === "Document") {
      breakdown = `
        <strong>📦 Parcel Type:</strong> Document<br/>
        <strong>📍 Delivery:</strong> ${
          isWithinCity ? "Within Same Region" : "Outside Region"
        }<br/>
        <strong>💵 Cost:</strong> ৳${cost}
      `;
    } else {
      if (weight <= 3) {
        breakdown = `
          <strong>📦 Parcel Type:</strong> Non-Document<br/>
          <strong>⚖️ Weight:</strong> ${weight} kg (Up to 3kg)<br/>
          <strong>📍 Delivery:</strong> ${
            isWithinCity ? "Within Same Region" : "Outside Region"
          }<br/>
          <strong>💵 Cost:</strong> ৳${cost}
        `;
      } else {
        const extraWeight = Math.ceil(weight - 3);
        const baseCost = isWithinCity ? 110 : 150;
        const perKgCharge = extraWeight * 40;
        const extraFixed = 40;

        breakdown = `
          <strong>📦 Parcel Type:</strong> Non-Document<br/>
          <strong>⚖️ Weight:</strong> ${weight} kg (> 3kg)<br/>
          <strong>📍 Delivery:</strong> ${
            isWithinCity ? "Within Same Region" : "Outside Region"
          }<br/>
          <strong>💵 Base Cost (up to 3kg):</strong> ৳${baseCost}<br/>
          <strong>➕ Extra (${extraWeight}kg × ৳40):</strong> ৳${perKgCharge}<br/>
          <strong>➕ Fixed Extra:</strong> ৳${extraFixed}<br/>
          <hr/>
          <strong>🧾 Total:</strong> ৳${cost}
        `;
      }
    }

    const result = await Swal.fire({
      title: "Confirm Delivery",
      html: breakdown,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Send",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      confirmSubmission(data, cost);
    }
  };

  const confirmSubmission = async (data, cost) => {
    const submissionData = {
      ...data,
      cost,
      creation_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    // console.log("Parcel Data Submitted:", submissionData);

    // post data in database
    try {
      const response = await secureAxios.post("/parcel", submissionData);
      // console.log("Parcel posted:", response.data);

      toast.success(
        <div>
          <strong>Parcel successfully added!</strong>
          <br />
          <span className="text-gray-600">Your parcel is on its way.</span>
        </div>
      );
    } catch (error) {
      console.error("Error posting parcel:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-700">Add Parcel</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Enter your parcel details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parcel Info */}
          <FormSection title="Parcel Info">
            <div className="md:col-span-2">
              <label className="mb-2 font-medium text-gray-700 block">
                Parcel Type
              </label>
              <div className="flex items-center space-x-6 mt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register("parcelType")}
                    value="Document"
                    className="hidden"
                  />
                  <RiRadioButtonFill
                    className={`w-5 h-5 mr-2 transition-colors ${
                      parcelType === "Document"
                        ? "text-teal-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                  <span className="font-medium text-gray-700">Document</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    {...register("parcelType")}
                    value="Non-Document"
                    className="hidden"
                  />
                  <RiRadioButtonFill
                    className={`w-5 h-5 mr-2 transition-colors ${
                      parcelType === "Non-Document"
                        ? "text-teal-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                  <span className="font-medium text-gray-700">
                    Non-Document
                  </span>
                </label>
              </div>
            </div>
            {parcelType === "Non-Document" && (
              <InputField
                name="weight"
                label="Weight (kg)"
                register={register("weight", weightValidation)}
                errors={errors}
                placeholder="e.g., 2.5"
                Icon={FaBox}
                type="number"
              />
            )}
          </FormSection>

          {/* Sender & Receiver Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FormSection title="Sender Details">
              <InputField
                name="senderEmail"
                label="Email"
                register={register("senderEmail", validationSchema.senderEmail)}
                errors={errors}
                placeholder="your.email@example.com"
                Icon={MdOutlineMail}
                disabled
              />
              <SelectField
                name="senderWarehouse"
                label="Pickup Warehouse"
                control={control}
                errors={errors}
                options={senderDistricts}
                placeholder="Select a district"
                Icon={FaWarehouse}
                disabled={!selectedSenderRegion}
              />
              <SelectField
                name="senderRegion"
                label="Your Region"
                control={control}
                errors={errors}
                options={regionNames}
                placeholder="Select your region"
                Icon={MdLocationOn}
              />
              <TextareaField
                name="senderAddress"
                label="Full Address"
                register={register(
                  "senderAddress",
                  validationSchema.senderAddress
                )}
                errors={errors}
                placeholder="Enter your full pickup address"
                Icon={MdLocationOn}
              />
              <TextareaField
                name="senderInstruction"
                label="Pickup Instruction"
                register={register("senderInstruction")}
                errors={errors}
                placeholder="e.g., Call upon arrival"
                Icon={MdNotes}
              />
            </FormSection>

            <FormSection title="Receiver Details">
              <InputField
                name="receiverEmail"
                label="Email"
                register={register(
                  "receiverEmail",
                  validationSchema.receiverEmail
                )}
                errors={errors}
                placeholder="receiver.email@example.com"
                Icon={MdOutlineMail}
              />
              <SelectField
                name="receiverWarehouse"
                label="Delivery Warehouse"
                control={control}
                errors={errors}
                options={receiverDistricts}
                placeholder="Select district"
                Icon={FaWarehouse}
                disabled={!selectedReceiverRegion}
              />
              <SelectField
                name="receiverRegion"
                label="Receiver Region"
                control={control}
                errors={errors}
                options={regionNames}
                placeholder="Select receiver's region"
                Icon={MdLocationOn}
              />
              <TextareaField
                name="receiverAddress"
                label="Full Address"
                register={register(
                  "receiverAddress",
                  validationSchema.receiverAddress
                )}
                errors={errors}
                placeholder="Enter receiver's full delivery address"
                Icon={MdLocationOn}
              />
              <TextareaField
                name="receiverInstruction"
                label="Delivery Instruction"
                register={register("receiverInstruction")}
                errors={errors}
                placeholder="e.g., Leave at reception"
                Icon={MdNotes}
              />
            </FormSection>
          </div>

          <div className="text-center text-gray-500 text-sm">
            * PickUp Time 4pm–7pm Approx.
          </div>
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-teal-500 text-white font-bold py-3 px-12 rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SendParcel;
